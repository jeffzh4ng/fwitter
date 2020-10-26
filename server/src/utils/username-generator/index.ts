import { adjectives } from './adjectives'
import { animals } from './animals'

export const generateUsername = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]

  return `${adjective}${animal}`
}
