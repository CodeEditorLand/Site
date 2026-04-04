export default interface Interface {
	Title?: string;
	Description?: string;
	Children: React.ReactNode;
	ClassName?: string;
	OnClick?: () => void;
}
