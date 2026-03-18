import React from 'react'

export type ThemeValue = {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeValue>({
  theme: 'dark',
  toggleTheme: () => {},
})

