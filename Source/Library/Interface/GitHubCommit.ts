export default interface GitHubCommit {
	sha: string;
	commit: {
		author: {
			name: string;
			email: string;
			date: string;
		};
		message: string;
		url: string;
	};
	author?: {
		login: string;
		id: number;
		avatar_url: string;
		url: string;
	};
	url: string;
}
