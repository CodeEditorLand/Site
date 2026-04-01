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
							<img alt="GitHub" src="/Image/GitHub.svg" width="24" height="24" />
						</picture>
					</a>
				</li>
			</ul>

			{children}

			<ul className="IconList flex shrink flex-col justify-start">
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
			</ul>
		</footer>
	);
};

export default Footer;
