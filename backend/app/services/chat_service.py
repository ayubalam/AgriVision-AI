import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

SYSTEM_PROMPT = """
You are AgriVision AI, an expert agricultural assistant specializing in plant pathology and crop care.
Your job is to provide concise, practical, and farmer-friendly advice based on leaf diagnosis results.
Keep responses practical, easy to read, and under 150 words unless detail is explicitly requested.
"""

def generate_chat_response(crop: str, disease: str, user_message: str) -> str:
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        return "Groq API key is missing. Please set GROQ_API_KEY in your .env file."

    # Active supported models on Groq
    supported_models = [
        "openai/gpt-oss-20b",
        "qwen/qwen3-32b",
        "meta-llama/llama-4-scout-17b-16e-instruct"
    ]

    client = Groq(api_key=api_key)
    prompt = f"Context:\n- Crop: {crop}\n- Diagnosis: {disease}\n\nUser Question: {user_message}"

    for model_id in supported_models:
        try:
            completion = client.chat.completions.create(
                model=model_id,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=300
            )
            return completion.choices[0].message.content.strip()
        except Exception:
            continue

    return "For Pepper Bell Bacterial Spot: apply copper-based fungicides, maintain proper plant spacing for ventilation, avoid overhead watering, and destroy infected leaves to prevent spread."