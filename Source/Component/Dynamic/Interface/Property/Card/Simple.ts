export default interface Interface {
	title?: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}
