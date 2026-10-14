export default interface GitHubActionRun {
	id: number;

	name: string;

	status: string;

	conclusion?: string;

	created_at: string;

	updated_at: string;

	html_url: string;

	actor: {
		login: string;

		id: number;

		avatar_url: string;
	};

	repository: {
		name: string;

		full_name: string;

		html_url: string;
	};

	workflow_id: number;

	head_branch: string;

	head_sha: string;
}
