import type { SavingsData } from '../../utils/types.js';

export async function fetchDashboardData(): Promise<SavingsData> {
	try {
		const myHeaders = new Headers();
		myHeaders.append('Authorization', import.meta.env.VITE_API_KEY);

		const response = await fetch('/api', {
			method: 'GET',
			headers: myHeaders,
			mode: 'cors',
			credentials: 'include',
			redirect: 'follow'
		});

		const data = await response.json();

		return data;
	} catch (err) {
		console.error('Failed to fetch dashboard data:', err);
		throw err;
	}
}
