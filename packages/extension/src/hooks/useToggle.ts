import { useCallback, useState } from "react"

export function useToggle(init = false) {
  const [state, setState] = useState<boolean>(init)

  const toggle = useCallback(() => setState((state) => !state), [])

  return [state, toggle] as const
}
