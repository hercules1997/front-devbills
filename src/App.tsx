import { AppProvider } from './hooks'
import { Home } from './screens/Home'
import Global from './styles/global'

export function App() {
  return (
    <AppProvider>
      <Global />
      <Home />
    </AppProvider>
  )
}
