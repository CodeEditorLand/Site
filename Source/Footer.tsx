import React from "react";

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<footer className="Footer flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<ul className="IconList flex shrink flex-col justify-start gap-2">
				<li>
					<a
						href="https://github.com/CodeEditorLand/Land"
						target="_blank"
						rel="noopener noreferrer"
						className="Icon flex items-center"
						aria-label="GitHub">
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
				<li>
					<a
						href="https://x.com/CodeEditorLand"
						target="_blank"
						rel="noopener noreferrer"
						className="Icon flex items-center"
						aria-label="X (Twitter)">
						<svg
							viewBox="0 0 24 24"
							fill="currentColor"
							width="24"
							height="24"
							aria-hidden="true">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
					</a>
				</li>
			</ul>

			<div className="flex flex-col items-center gap-2 py-4 text-muted-foreground sm:flex-row sm:gap-4">
				<span className="hidden sm:inline" aria-hidden="true">
					&#x2001;
				</span>
				<a
					href="https://land.playform.cloud"
					className="transition-colors hover:text-foreground">
					CodeEditorLand
				</a>
				<span className="hidden sm:inline" aria-hidden="true">
					&#x2001;
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
					<a
						href="https://land.playform.cloud"
						className="flex items-center">
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
