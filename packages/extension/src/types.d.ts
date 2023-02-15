declare type Message = {
  type: string
  data: any
}

declare type TypeURL = "page" | "site"

declare type BannedURL = {
  url: string
  type: TypeURL
}

declare type ScreenR = {
  component: React.FC
  label: string
}
