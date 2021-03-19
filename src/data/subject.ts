import { Question } from './question'

export interface Subject {
  id: string
  name: string
  image: string
  questions: Question[]
}
