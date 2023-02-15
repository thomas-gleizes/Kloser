import React, { useMemo } from "react"
import { FaBan, FaCheck } from "react-icons/all"

import { useAppContext } from "../contexts/app.context"

const ListScreen: React.FC = () => {
  const { bannedURLs, unbanURL, banSite } = useAppContext()

  const pageBannedUrls = useMemo<BannedURL[]>(
    () => bannedURLs.filter((item) => item.type === "page"),
    [bannedURLs]
  )

  const siteBannedURLs = useMemo<BannedURL[]>(
    () => bannedURLs.filter((item) => item.type === "site"),
    [bannedURLs]
  )


  return (
    <div className="flex flex-col space-y-3">
      <div>
        <h3 className="text-lg text-center font-semibold mb-2">Site bloqué</h3>
        <div className="flex flex-col">
          {siteBannedURLs.length ? (
            siteBannedURLs.map((bannedUrl, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-2 border-b py-1 border-gray-200"
              >
                <div className="max-w-[75%]">
                  <p className="text-xs">{new URL(bannedUrl.url).host}</p>
                </div>
                <div>
                  <i
                    onClick={() => unbanURL(bannedUrl)}
                    className="text-green-500 text-lg cursor-pointer"
                  >
                    <FaCheck />
                  </i>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4">
              <p className="text-center italic text-blue-800">
                Pas de page bloqué
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg text-center font-semibold">Page bloqué</h3>
        <div className="flex flex-col">
          {pageBannedUrls.length ? (
            pageBannedUrls.map((bannedUrl, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-2 border-b py-1 border-gray-200"
              >
                <div className="max-w-[75%]">
                  <p className="text-sm text-ellipsis overflow-hidden w-auto whitespace-nowrap">
                    {`${new URL(bannedUrl.url).host}${
                      new URL(bannedUrl.url).pathname
                    }`}
                  </p>
                </div>
                <div className="max-w-[25%] flex space-x-3">
                  <i
                    onClick={() => unbanURL(bannedUrl)}
                    className="text-green-500 text-lg cursor-pointer"
                  >
                    <FaCheck />
                  </i>
                  <i
                    onClick={() => banSite(bannedUrl)}
                    className="text-red-500 text-lg cursor-pointer"
                  >
                    <FaBan />
                  </i>
                </div>
              </div>
            ))
          ) : (
            <div className="my-4">
              <p className="text-center italic text-blue-800">
                Pas de page bloqué
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListScreen
