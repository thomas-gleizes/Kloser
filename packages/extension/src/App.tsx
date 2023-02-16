import React, { useState } from "react"
import SimpleBar from "simplebar-react"
import classnames from "classnames"

import AppContextProvider from "./contexts/app.context"
import { SCREEN } from "./utils/constans"

const App = () => {
  const [screen, setScreen] = useState<ScreenR>(SCREEN.main)

  return (
    <AppContextProvider>
      <div className="max-h-[850px] bg-white border-2 border-gray-900">
        <header className="px-3 py-2 rounded-b-lg bg-gray-200 shadow">
          <div className="flex justify-between">
            <h1 className="text-md text-xl text-blue-700 font-bold">Kloser</h1>
            <div className="text-xs opacity-60 text-opacity-70 mt-2">
              v1.0.0-beta
            </div>
          </div>
        </header>
        <main className="pl-2 pr-1">
          <SimpleBar style={{ maxHeight: 350 }}>
            <div className="mr-2 py-2">
              <screen.component />
            </div>
          </SimpleBar>
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
      </div>
    </AppContextProvider>
  )
}

export default App
