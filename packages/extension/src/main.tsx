import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

import "simplebar-react/dist/simplebar.min.css"
import "./styles.css"

const rootElement = document.getElementById("root") as Element

createRoot(rootElement).render(<App />)
