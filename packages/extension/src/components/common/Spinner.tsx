import React from "react"
import { FaSpinner } from "react-icons/all"
import classnames from "classnames"

interface Props {
  size: number
  className?: string
}

const Spinner: React.FC<Props> = ({ size, className }) => {
  return (
    <FaSpinner
      size={size}
      className={classnames("animate-spin mx-auto", className)}
    />
  )
}

export default Spinner
