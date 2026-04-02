export interface DocSection {
	Id: string;
	Label: string;
	Children?: { Id: string; Label: string }[];
}

export default interface DocPageContent {
	Title: string;
	Sections: DocSection[];
}
