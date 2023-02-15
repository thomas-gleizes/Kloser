import MainScreen from "../screens/Main"
import ListScreen from "../screens/List"
import AuthScreen from "../screens/Auth"

export const SCREEN: { [key: string]: ScreenR } = {
  main: { component: MainScreen, label: "Closer" },
  list: { component: ListScreen, label: "Liste" },
  auth: { component: AuthScreen, label: "Auth" },
}

export const MESSAGE_TYPE = {
  CLOSE_TAB: "close_tab",
  ASK_URL: "ask_url",
  RESP_URL: "resp_url",
}

export const STORAGE_KEY = {
  URLS: "banned_urls",
  TOKEN: "auth_token",
}

export const CONTEXTS_MENU_ID = {
  BLOCK_PAGE: "block_page",
  BLOCK_SITE: "block_site",
}
