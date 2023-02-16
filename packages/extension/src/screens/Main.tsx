import React from "react"

import { useAppContext } from "../contexts/app.context"
import storage from "../services/storges"
import { STORAGE_KEY } from "../utils/constans"
import Card from "../components/common/Card"
import Button from "../components/common/Button"

const HomeScreen: React.FC = () => {
  const { activeURL, closeActiveTab } = useAppContext()

  if (!activeURL)
    return (
      <div className="my-10 text-center">
        <p>Pas d'URL valide trouvée</p>
      </div>
    )

  const handleBlockPage = async (url: URL) => {
    await storage.append<BannedURL>(STORAGE_KEY.URLS, {
      type: "page",
      url: `https://${url.host}${url.pathname}`,
    })

    closeActiveTab()
  }

  const handleBlockSite = async (url: URL) => {
    await storage.append<BannedURL>(STORAGE_KEY.URLS, {
      type: "site",
      url: `https://${url.host}`,
    })

    closeActiveTab()
  }

  return (
    <div className="flex flex-col space-y-4">
      <Card title="Bloquer la page" defaultOpen={true}>
        <div className="p-2">
          <div>
            URL: {activeURL.host}
            {activeURL.pathname}
          </div>
          <div className="flex flex-col space-y-2 mt-3 px-5">
            <Button onClick={() => handleBlockPage(activeURL)}>
              Bloquer cette page
            </Button>
            <Button onClick={() => handleBlockSite(activeURL)}>
              Bloquer ce site
            </Button>
          </div>
        </div>
      </Card>
      <Card title="Bloquer une URL donnée" defaultOpen={true}>
        <form className="p-2">
          <div className="flex flex-col">
            <label>URL : </label>
            <input
              type="url"
              className="px-2 py-0.5 text-sm rounded-lg border-2 border-gray-200 focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-3 px-5">
            <Button
              type="submit"
              onClick={() =>
                handleBlockSite(new URL("https://localhost:3222/test"))
              }
            >
              Bloquer le site
            </Button>
            <Button
              type="submit"
              onClick={() =>
                handleBlockSite(new URL("https://localhost:3222/test"))
              }
            >
              Bloquer la page
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default HomeScreen
