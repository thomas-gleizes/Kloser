class StorageService {
  constructor() {}

  async init<T>(key: string, initialValue: T): Promise<void> {
    this.get<T>(key).then(
      (urls) =>
        typeof urls === "undefined" && void this.set<T>(key, initialValue)
    )
  }

  async get<T = any>(key: string): Promise<T> {
    return chrome.storage.sync.get(key).then((item) => item[key])
  }

  async append<T = any>(key: string, item: T): Promise<void> {
    const oldItem = await this.get<T | Array<T>>(key)

    if (Array.isArray(oldItem))
      return chrome.storage.sync.set({ [key]: [...oldItem, item] })

    return chrome.storage.sync.set({ [key]: { ...oldItem, item } })
  }

  async set<T>(key: string, item: T): Promise<void> {
    return chrome.storage.sync.set({ [key]: item })
  }
}

export default new StorageService()
