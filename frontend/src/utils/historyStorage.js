const STORAGE_KEY = 'crop_health_scan_history'

export const getScanHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEY)
    return history ? JSON.parse(history) : []
  } catch (err) {
    console.error('Error reading scan history:', err)
    return []
  }
}

export const saveScanToHistory = (scanResult, imagePreviewUrl) => {
  try {
    const existing = getScanHistory()
    const newEntry = {
      id: `scan_${Date.now()}`,
      timestamp: new Date().toISOString(),
      imageUrl: imagePreviewUrl,
      ...scanResult,
    }
    const updated = [newEntry, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch (err) {
    console.error('Error saving to scan history:', err)
    return []
  }
}

export const clearScanHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Error clearing history:', err)
  }
}