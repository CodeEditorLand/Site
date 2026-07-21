export interface DocLeaf {
	Id: string;

	Label: string;
}

export interface DocGroup {
	Id: string;

	Label: string;

	Children: DocLeaf[];
}

export type DocItem = DocLeaf | DocGroup;

export interface DocSection {
	Id: string;

	Label: string;

	Children?: DocItem[];
}

export default interface DocPageContent {
	Title: string;

	Sections: DocSection[];
}
