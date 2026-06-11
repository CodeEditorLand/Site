export default interface GitHubIssue {
	id: number;

	number: number;

	title: string;

	state: "open" | "closed";

	user: {
		login: string;

		id: number;

		avatar_url: string;

		url: string;
	};

	created_at: string;

	updated_at: string;

	html_url: string;

	body?: string;

	comments: number;

	labels: Array<{
		id: number;

		name: string;

		color: string;
	}>;
}
