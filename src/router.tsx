import { createBrowserHistory, createMemoryHistory, type RouterHistory } from '@tanstack/history'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createAppRouter(options?: { history?: RouterHistory }) {
  const history = options?.history ?? createBrowserHistory()

  return createRouter({
    routeTree,
    history,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })
}

export type AppRouter = ReturnType<typeof createAppRouter>

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter
  }
}

export function createServerRouter(url: string) {
  return createAppRouter({
    history: createMemoryHistory({
      initialEntries: [url],
    }),
  })
}
