export interface Group {
  id: string
  name: string
  description: string
}

export interface Code {
  id: string
  code: string
  globalPercentage: number
  clientPercentage: number
}

export interface User {
  id: string
  name: string
  email: string
  percentage: number
}