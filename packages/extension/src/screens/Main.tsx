import React from "react"

import { useAppContext } from "../contexts/app.context"
import storage from "../services/storges"
import { STORAGE_KEY } from "../utils/constans"

const HomeScreen: React.FC = () => {
  const { activeURL, closeActiveTab } = useAppContext()

  if (!activeURL)
    return (
      <div className="my-10 text-center">
        <p>Pas d'URL valide trouvée</p>
      </div>
    )

  const handleBlockPage = async () => {
    await storage.append<BannedURL>(STORAGE_KEY.URLS, {
      type: "page",
      url: `https://${activeURL.host}${activeURL.pathname}`,
    })

    closeActiveTab()
  }

  const handleBlockSite = async () => {
    await storage.append<BannedURL>(STORAGE_KEY.URLS, {
      type: "site",
      url: `https://${activeURL.host}`,
    })

    closeActiveTab()
  }

  return (
    <div>
      <div>
        target: {activeURL.host}
        {activeURL.pathname}
      </div>
      <div className="flex space-x-3 mt-3">
        <button
          onClick={handleBlockPage}
          className="bg-blue-500 text-white text-md px-2 py-1 rounded shadow hover:shadow-lg transition"
        >
          Bloquer cette page
        </button>
        <button
          onClick={handleBlockSite}
          className="bg-blue-500 text-white text-md px-2 py-1 rounded shadow hover:shadow-lg transition"
        >
          Bloquer ce site
        </button>
      </div>
    </div>
  )
}

export default HomeScreen
