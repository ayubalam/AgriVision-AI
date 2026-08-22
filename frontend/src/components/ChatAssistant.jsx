import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const formatTableToMarkdown = (text) => {
  if (!text) return '';
  const lines = text.split('\n');
  const formatted = [];
  let inTable = false;

  for (let line of lines) {
    if (line.trim().startsWith('|')) {
      const cells = line.split('|').map((c) => c.trim()).filter((c) => c.length > 0);
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        inTable = true;
        continue;
      }
      if (inTable) {
        formatted.push(`* **${cells[0] || 'Option'}**: ${cells.slice(1).join(' — ')}`);
      }
    } else {
      inTable = false;
      formatted.push(line);
    }
  }
  return formatted.join('\n');
};

const ChatAssistant = ({ crop, disease }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessage('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:8000/api/chat',
        { crop, disease, message: userMsg },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChatHistory((prev) => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error getting response. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-2xl bg-white shadow-sm border-slate-200/80">
      <h3 className="text-lg font-semibold mb-3 text-slate-900">Ask AgriVision AI</h3>
      <div className="h-80 overflow-y-auto mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col gap-3">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-[90%] text-sm ${
              msg.sender === 'user'
                ? 'bg-emerald-600 text-white self-end'
                : 'bg-white border border-slate-200 text-slate-800 self-start shadow-xs'
            }`}
          >
            {msg.sender === 'user' ? (
              msg.text
            ) : (
              <div className="prose prose-sm max-w-none text-slate-800 space-y-1">
                <ReactMarkdown>{formatTableToMarkdown(msg.text)}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
        {loading && <div className="text-sm text-slate-500 italic">Thinking...</div>}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Ask a question about treatment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2.5 text-sm font-semibold rounded-xl hover:bg-emerald-700 transition cursor-pointer"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatAssistant;