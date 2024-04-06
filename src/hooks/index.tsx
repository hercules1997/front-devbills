import { ReactNode } from 'react'
import { FetchAPIPovider } from './useFetchAPI'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return <FetchAPIPovider>{children}</FetchAPIPovider>
}
