import React, { useMemo } from "react"
import classnames from "classnames"

import Spinner from "./Spinner"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

const Button: React.FC<Props> = ({ loading, children, ...rest }) => {
  const className = useMemo(() => {
    if (loading) return `bg-gradient-to-bl from-gray-300 to-gray-400 shadow`
    else
      return `bg-gradient-to-bl from-blue-600 to-blue-900 shadow hover:shadow-xl transform transition duration-75 hover:scale-105`
  }, [loading])

  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={classnames(
        "rounded text-white text-center text-lg w-full py-1",
        className
      )}
    >
      {loading ? (
        <span className="flex justify-center w-full">
          Chargement
          <i className="my-auto ml-3">
            <Spinner size={20} />
          </i>
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export default Button
