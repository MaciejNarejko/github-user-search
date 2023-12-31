import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react'

interface ThemeContextType {
	darkMode: boolean
	toggleDarkMode: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [darkMode, setDarkMode] = useState<boolean>(false)

	const toggleDarkMode = useCallback(() => {
		setDarkMode(prevDarkMode => !prevDarkMode)
	}, [])

	useEffect(() => {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

		const handleDarkModeChange = (event: MediaQueryListEvent) => {
			setDarkMode(event.matches)
		}

		prefersDarkMode.addEventListener('change', handleDarkModeChange)
		setDarkMode(prefersDarkMode.matches)

		return () => {
			prefersDarkMode.removeEventListener('change', handleDarkModeChange)
		}
	}, [])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
	}, [darkMode])

	return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
}
