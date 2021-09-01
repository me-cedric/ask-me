export interface Question {
  uid: string
  title: string
  text: string
  answers: string[]
  sources: Source[]
}

export interface Source {
  shortExplaining: string
  url: string
}
