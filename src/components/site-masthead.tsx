import { Link } from '@tanstack/react-router'
import { Moon, Sun } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'

export function SiteMasthead({ home = false }: { home?: boolean }) {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="site-masthead">
      <Link to="/" aria-label="Home" className="site-mark">
        ad<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label="Main navigation" className="site-nav">
        {home ? <a href="#crafts">Crafts</a> : <Link to="/projects">Projects</Link>}
        <Link to="/blog">Writing</Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>
    </header>
  )
}
