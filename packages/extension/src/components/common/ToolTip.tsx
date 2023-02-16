import React, { useEffect, useState } from "react"
import { useToggle } from "../../hooks"
import classnames from "classnames"

interface Props {
  target: string
  children: React.ReactNode | string
}

const ToolTip: React.FC<Props> = ({ target, children }) => {
  const [isVisible, toggleVisible] = useToggle(false)

  useEffect(() => {
    const targetElement = document.querySelector(target)

    if (!targetElement) return undefined

    const onMouseEnter = () => toggleVisible()
    const onMouseLeave = () => toggleVisible()

    targetElement.addEventListener("mouseenter", onMouseEnter)
    targetElement.addEventListener("mouseleave", onMouseLeave)

    return () => {
      targetElement.removeEventListener("mouseenter", onMouseEnter)
      targetElement.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <div
      role="tooltip"
      className={classnames(
        isVisible ? "opacity-100" : "opacity-0",
        "absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm"
      )}
    >
      {children}
    </div>
  )
}

export default ToolTip
