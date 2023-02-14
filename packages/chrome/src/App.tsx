import React, { createContext, useContext, useEffect, useState } from "react"
import HomeScreen from "./screens/Home"

const AppContext = createContext<{ url: URL }>(null)

export const useAppContext = () => {
  return useContext(AppContext)
}
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [url, setUrl] = useState<URL>()

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      switch (message.type) {
        case "RESP_URL":
          setUrl(new URL(message.data.url))
      }
    })
  }, [])

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "ASK_URL" }, (message) =>
      console.log("message", message)
    )

    chrome.storage.local
      .set({ token: "private_token" })
      .then((data) => console.log("token set", data))
  }, [])

  console.log("Url", url)

  return <AppContext.Provider value={{ url }}>{children}</AppContext.Provider>
}

const App = () => {
  return (
    <AppContextProvider>
      <section className="w-[500px] h-[150px] bg-white">
        <HomeScreen />
      </section>
    </AppContextProvider>
  )
}

export default App
