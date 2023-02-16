import React, { forwardRef, useImperativeHandle } from "react"
import { FaMinus, FaPlus } from "react-icons/all"
import { Transition } from "@headlessui/react"
import { useToggle } from "../../hooks"

interface Props {
  title: React.ReactNode | string
  children: React.ReactNode
  defaultOpen?: boolean
}

const Card: React.FC<Props> = forwardRef(
  ({ title, children, defaultOpen = true }, ref) => {
    const [open, toggle] = useToggle(defaultOpen)

    useImperativeHandle(ref, () => ({
      open,
      toggle,
    }))

    return (
      <div data-open={open} className="border mb-2 rounded-lg shadow-md">
        <div className="px-2 py-1 flex justify-between">
          <h2 className="text-lg">{title}</h2>
          <button
            onClick={toggle}
            className="transition transform hover:text-blue-700 hover:scale-105 duration-150 p-1.5"
          >
            {open ? <FaMinus /> : <FaPlus />}
          </button>
        </div>
        <Transition
          show={open}
          enter="transition transform duration-1000"
          enterFrom="opacity-0 -translate-y-10"
          enterTo="opacity-100 translate-y-0"
          leave="transition-opacity duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="border-t bg-white mb-1">{children}</div>
        </Transition>
      </div>
    )
  }
)

export default Card
