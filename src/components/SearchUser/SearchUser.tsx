import React, { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import UserDetails from '../UserDetails/UserDetails'
import UserLoading from '../UserLoading/UserLoading'
import { fetchUserData } from '../../apis/githubAPI'

interface User {
	avatar_url: string
	login: string
	name: string
	bio: string | null
	created_at: string
	public_repos: number
	followers: number
	following: number
	location?: string
	blog?: string
	twitter_username?: string
	company?: string
}

const SearchUser: React.FC = () => {
	const [userData, setUserData] = useState<User | null>(null)
	const [error, setError] = useState<string>('')
	const [loading, setLoading] = useState(false)

	const handleSearch = async (username: string) => {
		setLoading(true)
		try {
			const data = await fetchUserData(username)
			setUserData(data)
			setError('')
		} catch (error: any) {
			setError(error.message)
			setUserData(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const defaultUsername = 'octocat'
		handleSearch(defaultUsername)
	}, [])

	return (
		<div>
			<SearchForm onSearch={handleSearch} />
			{loading ? <UserLoading /> : <UserDetails userData={userData} error={error} />}
		</div>
	)
}

export default SearchUser
