import axios from 'axios'

export const fetchUserData = async (username: string) => {
	try {
		const response = await axios.get(`https://api.github.com/users/${username}`)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw new Error('User not found. Try again ...')
			} else {
				throw new Error('Oops! Something went wrong. Please try again later.')
			}
		}
	}
}
