import MainScreen from "../screens/Main"
import ListScreen from "../screens/List"
import AuthScreen from "../screens/Auth"

export const SCREEN: { [key: string]: ScreenR } = {
  main: { component: MainScreen, label: "Closer" },
  list: { component: ListScreen, label: "Liste" },
  auth: { component: AuthScreen, label: "Auth" },
}
