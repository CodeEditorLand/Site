export interface BlogPost {
	Slug: string;
	Title: string;
	Summary: string;
	PublishedAt: string;
	Tags: string[];
	Author: string;
	ReadTime: number;
}

export default interface BlogPageContent {
	Title: string;
	Subtitle: string;
	Posts: BlogPost[];
}
