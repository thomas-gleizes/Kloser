export const getItem = async <T>(key: string): Promise<T> => {
  try {
    const storage = (await chrome.storage.local.get(key)) as T

    console.log("Storage", storage)

    return storage
  } catch (err) {
    return null
  }
}
