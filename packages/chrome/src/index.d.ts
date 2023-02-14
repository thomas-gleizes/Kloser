declare type Message = {
  type: string
  data: any
}

declare type BannedUrl = {
  url: string
  type: "site" | "page"
}

declare type ScreenR = {
  component: React.FC
  label: string
}
