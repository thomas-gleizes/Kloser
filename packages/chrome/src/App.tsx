import classnames from "classnames"
import React, { useState } from "react"
import AppContextProvider from "./contexts/app.context"
import { SCREEN } from "./utils/constans"

const App = () => {
  const [screen, setScreen] = useState<ScreenR>(SCREEN.main)

  return (
    <AppContextProvider>
      <header className="bg-gray-300 shadow rounded-b-lg shadow">
        <div>
          <h1 className="text-center text-lg">{screen.label}</h1>
        </div>
      </header>
      <main className="w-[220px] max-h-[500px] bg-white py-4 px-3">
        <screen.component />
      </main>
      <footer className="bg-gradient-to-bl from-blue-700 to-gray-900 text-white py-2 rounded-t-md">
        <nav className="flex justify-evenly">
          {Object.values(SCREEN).map((s) => (
            <div
              className="group select-none cursor-pointer"
              onClick={() => setScreen(s)}
            >
              <a className="text-white text-[13px]">{s.label}</a>
              <div
                className={classnames(
                  "border border-white border-b w-full transition transform group-hover:scale-x-100",
                  s.label === screen.label ? "scale-x-100" : "scale-x-0"
                )}
              />
            </div>
          ))}
        </nav>
      </footer>
    </AppContextProvider>
  )
}

export default App
