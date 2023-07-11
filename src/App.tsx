import React, { useContext, useEffect } from 'react'
import SearchUser from './components/SearchUser'
import Header from './components/Header'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
	return (
		<div className=''>
			<ThemeProvider>
				<Header />
				<SearchUser />
			</ThemeProvider>
		</div>
	)
}

export default App
