import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function UseIsMobile() {
	const [IsMobile, SetIsMobile] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const CheckMobile = () => {
			SetIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		const MediaQueryList = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
		);

		MediaQueryList.addEventListener("change", CheckMobile);

		CheckMobile();

		return () => {
			MediaQueryList.removeEventListener("change", CheckMobile);
		};
	}, []);

	return !!IsMobile;
}
