import { useAppContext } from "../contexts/app.context"

const HomeScreen: React.FC = () => {
  const { url } = useAppContext()

  const handleClick = async () => {
    const banned = (await chrome.storage.local.get("banned_urls")) as []
    const token = await chrome.storage.local.get("token")

    console.log("Banned", banned)
    console.log("token", token)

    await chrome.storage.local.set({ banned_urls: [...banned] })
  }

  return (
    <div>
      <div>target: {url?.href}</div>
      <div className="flex space-x-3">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white text-lg px-3 py-1 rounded shadow hover:shadow-lg transition"
        >
          Bloquer
        </button>
      </div>
    </div>
  )
}

export default HomeScreen
