import React from "react";

export interface Mouse {
	X: number;

	Y: number;

	XPrevious: number;

	YPrevious: number;

	Velocity: number;

	Last: number;

	Active: boolean;
}

export interface MovementDimensional {
	X: number;

	Y: number;

	Rotation: number;

	Scale: number;
}

// Matrix type: Record of character keys to 2D arrays of numbers
export type MatrixType = Record<string, number[][]>;

// Pixel component type
export type PixelComponent = React.ComponentType<PixelProps>;

export interface PixelProps {
	Font: number;

	Character: number;

	Index: number;

	Show: number;

	Text: number;

	// For React, Mouse is the actual object (not an accessor)
	Mouse: Mouse;

	Container: DOMRect;

	// For React, CurrentTime is the actual number (not an accessor)
	CurrentTime: number;

	Row: number;

	Column: number;
}
