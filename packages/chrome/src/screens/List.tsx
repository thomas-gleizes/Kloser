import React, { useMemo } from "react"
import { useAppContext } from "../contexts/app.context"

const ListScreen: React.FC = () => {
  const { bannedUrls } = useAppContext()

  const pageBannedUrls = useMemo<URL[]>(
    () =>
      bannedUrls
        .filter((item) => item.type === "page")
        .map((item) => new URL(item.url)),
    [bannedUrls]
  )

  const siteBannedUrls = useMemo<URL[]>(
    () =>
      bannedUrls
        .filter((item) => item.type === "page")
        .map((item) => new URL(item.url)),
    [bannedUrls]
  )

  return (
    <div>
      <div className="flex flex-col">
        {pageBannedUrls.map((bannedUrl, index) => (
          <div key={index} className="border-bottom border-gray-200">
            <div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListScreen
