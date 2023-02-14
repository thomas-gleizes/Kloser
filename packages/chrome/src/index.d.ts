interface Message {
  type: string
  data: any
}

interface BannedUrl {
  url: string
  type: "site" | "page"
}
