import type { ReactNode } from "react";

// Base content schema for all dynamic components
export interface ContentSchema {
	id?: string;
	className?: string;
	children?: ReactNode;
}

// Button content schema matching plan specification
export interface ButtonContent extends ContentSchema {
	text?: string;
	icon?: string; // Lucide icon name
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	fullWidth?: boolean;
	onClick?: () => void;
	href?: string; // for link rendering
}

// Card content schema
export interface CardContentItem {
	id?: string;
	title?: string;
	description?: string;
	content?: ReactNode;
	footer?: ReactNode;
	className?: string;
}

export interface CardSection {
	header?: CardContentItem;
	body?: CardContentItem;
	footer?: CardContentItem;
}

// Input content schema
export interface InputContent extends ContentSchema {
	label?: string;
	placeholder?: string;
	type?: "text" | "email" | "password" | "number" | "tel" | "url";
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	error?: string;
	disabled?: boolean;
	required?: boolean;
	helperText?: string;
}

// Label content schema
export interface LabelContent extends ContentSchema {
	text: string;
	htmlFor?: string;
	required?: boolean;
	disabled?: boolean;
}

// Badge content schema
export interface BadgeContent extends ContentSchema {
	text: string;
	variant?: "default" | "secondary" | "destructive" | "outline";
	// Note: shadcn Badge doesn't support size prop, will be ignored
	showDot?: boolean;
	dotColor?: "green" | "yellow" | "red" | "blue";
}

// Checkbox content schema
export interface CheckboxContent extends ContentSchema {
	label?: string;
	description?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	indeterminate?: boolean;
	onChange?: (checked: boolean) => void;
}

// Table content schema
export interface TableColumn<T = Record<string, unknown>> {
	key: keyof T;
	header: string;
	render?: (value: unknown, row: T) => ReactNode;
	className?: string;
}

export interface TableContent<
	T = Record<string, unknown>,
> extends ContentSchema {
	columns: TableColumn<T>[];
	data: T[];
	striped?: boolean;
	hoverable?: boolean;
	bordered?: boolean;
	compact?: boolean;
	onRowClick?: (row: T) => void;
}

// Form field wrapper schema
export interface FormFieldContent extends ContentSchema {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
	orientation?: "vertical" | "horizontal";
}

// Icon schema
export interface IconContent extends ContentSchema {
	name: string; // Lucide icon name
	size?: number;
	className?: string;
}

// ============================================
// ACCOUNT PAGE TYPES
// ============================================

// Sign In Form
export interface SignInContent {
	title: string;
	description: string;
	emailField: InputContent;
	passwordField: InputContent;
	submitButton: ButtonContent;
	oauthButton?: ButtonContent;
	showDivider?: boolean;
	footerLinks?: {
		signUp?: { label: string; href: string };
		forgotPassword?: { label: string; href: string };
	};
}

// Sign Up Form
export interface SignUpContent {
	title: string;
	description: string;
	emailField: InputContent;
	passwordField: InputContent;
	confirmPasswordField: InputContent;
	termsCheckbox: CheckboxContent;
	submitButton: ButtonContent;
	oauthButtons?: ButtonContent[];
	showDivider?: boolean;
	footerLinks?: {
		signIn?: { label: string; href: string };
	};
}

// Forgot Password Form
export interface ForgotPasswordContent {
	title: string;
	description: string;
	emailField: InputContent;
	submitButton: ButtonContent;
	resendButton?: ButtonContent;
	successMessage?: string;
}

// Reset Password Form
export interface ResetPasswordContent {
	title: string;
	description: string;
	passwordField: InputContent;
	confirmPasswordField: InputContent;
	submitButton: ButtonContent;
	successMessage?: string;
	invalidTokenMessage?: string;
	checkingMessage?: string;
}

// ============================================
// DOWNLOAD PAGE TYPES
// ============================================

// Platform Grid
export interface PlatformInfo {
	id: string;
	name: string;
	icon: "Apple" | "Monitor" | "Terminal";
	description: string;
	version: string;
	size: string;
	checksum?: string;
	signature?: string;
	requirements?: string[];
}

export interface PlatformGridContent {
	title?: string;
	subtitle?: string;
	platforms: PlatformInfo[];
	showVerification?: boolean;
	onDownload?: (platform: PlatformInfo) => void;
}

// System Requirements
export interface RequirementItem {
	id: string;
	label: string;
	value: string;
}

export interface SystemRequirementsContent {
	title: string;
	description?: string;
	requirements: {
		minimum: RequirementItem[];
		recommended: RequirementItem[];
	};
	os?: string[];
}

// Verification Info
export interface VerificationInfo {
	sha256?: string;
	pgpSignature?: string;
	signingKeyId?: string;
	verificationInstructions?: string;
}

export interface VerificationInfoContent {
	title: string;
	description?: string;
	downloadVerification: VerificationInfo;
	integrityVerification: VerificationInfo;
	downloadButton?: ButtonContent;
	verifyButton?: ButtonContent;
}

// Previous Releases
export interface ReleaseVersion {
	version: string;
	publishedAt: string;
	size: string;
	downloads: number;
	changelog?: string;
	assets: {
		platform: "macOS" | "Windows" | "Linux";
		url: string;
		sha256: string;
		signature?: string;
	}[];
}

export interface PreviousReleasesContent {
	title: string;
	description?: string;
	releases: ReleaseVersion[];
	showChangelog?: boolean;
	onDownload?: (version: string, platform: string) => void;
	onViewChangelog?: (version: string) => void;
}

// ============================================
// EMAIL VERIFICATION TYPES
// ============================================

export interface EmailVerificationContent {
	title: string;
	description: string;
	checkingMessage?: string;
	successMessage?: string;
	errorMessage?: string;
	buttonContent?: ButtonContent;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Helper to render Lucide icons dynamically
export function renderIcon(
	iconName: string,
	className?: string,
	size?: number,
): ReactNode {
	try {
		// Dynamic import would be ideal but we'll use a simple mapping
		const iconModule = require("lucide-react");
		const IconComponent = iconModule[iconName];
		if (IconComponent) {
			return <IconComponent className={className} size={size} />;
		}
		// Fallback: return null or a placeholder
		return null;
	} catch {
		return null;
	}
}
