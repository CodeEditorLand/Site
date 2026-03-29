import { useEffect, useState } from "react";

// Simplex-inspired noise function
function simplexNoise2D(x: number, y: number): number {
	const t = x + y;
	const x0 = Math.floor(x);
	const y0 = Math.floor(y);
	const x1 = x0 + 1;
	const y1 = y0 + 1;

	const sx = x - x0;
	const sy = y - y0;

	// Smooth interpolation
	const u = sx * sx * (3 - 2 * sx);
	const v = sy * sy * (3 - 2 * sy);

	// Hash function for pseudo-random values
	const hash = (a: number, b: number) => {
		return (Math.sin(a * 12.9898 + b * 78.233) * 43758.5453) % 1;
	};

	const n00 = hash(x0, y0);
	const n10 = hash(x1, y0);
	const n01 = hash(x0, y1);
	const n11 = hash(x1, y1);

	const nx0 = n00 * (1 - u) + n10 * u;
	const nx1 = n01 * (1 - u) + n11 * u;

	return nx0 * (1 - v) + nx1 * v;
}

interface SimplexColorInterpolatorProps {
	children: React.ReactNode;
	className?: string;
	speed?: number;
	intensity?: number;
}

export function SimplexColorInterpolator({
	children,
	className = "",
	speed = 1,
	intensity = 0.3,
}: SimplexColorInterpolatorProps) {
	const [time, setTime] = useState(0);

	useEffect(() => {
		let animationId: number;
		let lastTime = Date.now();

		const animate = () => {
			const now = Date.now();
			const deltaTime = (now - lastTime) / 1000;
			lastTime = now;

			setTime((t) => t + deltaTime * speed);
			animationId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [speed]);

	// Calculate color values using simplex noise
	const hue = simplexNoise2D(time * 0.5, 0) * 60; // Range: 0-60 degrees
	const saturation = 5 + simplexNoise2D(time * 0.3, 100) * 15; // Range: 5-20%
	const lightness = 40 + simplexNoise2D(time * 0.4, 200) * 15; // Range: 40-55%

	return (
		<div
			className={className}
			style={{
				filter: `hue-rotate(${hue}deg) saturate(${1 + saturation / 100}) brightness(${1 + (lightness - 45) / 100})`,
				transition: "filter 0.5s ease-in-out",
			}}>
			{children}
		</div>
	);
}
