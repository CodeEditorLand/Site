import React from "react";

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<footer className="Footer flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<ul className="IconList flex shrink flex-col justify-start">
				<li>
					<a
						href="https://github.com/CodeEditorLand/Land"
						target="_blank"
						rel="noopener noreferrer"
						className="Icon flex">
						<picture>
							<img
								alt="GitHub"
								src="/Image/GitHub.svg"
								width="24"
								height="24"
							/>
						</picture>
					</a>
				</li>
			</ul>

			<div className="flex flex-col items-center gap-2 py-4 text-xs text-muted-foreground sm:flex-row sm:gap-4">
				<span className="hidden sm:inline" aria-hidden="true">
					&middot;
				</span>
				<a
					href="https://editor.land"
					className="transition-colors hover:text-foreground">
					CodeEditorLand
				</a>
				<span className="hidden sm:inline" aria-hidden="true">
					&middot;
				</span>
				<a
					href="https://PlayForm.Cloud"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-foreground">
					PlayForm
				</a>
			</div>

			{children}

			<ul className="IconList flex shrink flex-col justify-start gap-2">
				<li>
					<a
						href="https://Tauri.App/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex">
						<picture>
							<img
								alt="Made With Tauri"
								src="https://PlayForm.Cloud/Image/GitHub/Made/Tauri.svg"
								width="160"
								height="32"
							/>
						</picture>
					</a>
				</li>
				<li className="flex items-center gap-2">
					<a href="https://editor.land" className="flex items-center">
						<picture>
							<img
								alt="Land"
								src="/Asset/Logo/Glyph/Land.svg"
								width="24"
								height="24"
							/>
						</picture>
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
