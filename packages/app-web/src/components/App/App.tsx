import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RelayEnvironmentProvider } from 'react-relay'
import { Grommet, grommet, Main } from 'grommet'
import { RelayEnv } from '../../RelayEnv'
import { Spinner } from '../Spinner'
import { AppRoutes } from './AppRoutes'
import { AppHeader } from './AppHeader'
import { ErrorBoundary } from '../ErrorBoundary'
import { ErrorMessage } from '../ErrorMessage'

export function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnv}>
      <BrowserRouter>
        <Grommet full theme={grommet} themeMode='dark'>
          <div style={{ width: '48rem', margin: '0 auto' }}>
            <ErrorBoundary fallback={<ErrorMessage />}>
              <AppHeader
                links={[
                  { label: 'Organization', href: '/organization' },
                  { label: 'User', href: '/user' }
                ]}
              />

              <Main pad='large'>
                <Suspense fallback={<Spinner />}>
                  <AppRoutes />
                </Suspense>
              </Main>
            </ErrorBoundary>
          </div>
        </Grommet>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  )
}
