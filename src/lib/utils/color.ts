/**
 * Calculates the contrast ratio between two hex colors.
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 */
function getContrastRatio(hex1: string, hex2: string) {
	const lum1 = getLuminance(hex1);
	const lum2 = getLuminance(hex2);

	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);

	return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Calculates the relative luminance of a single hex color.
 */
function getLuminance(hex: string) {
	// Convert hex to RGB
	const rgb = hexToRgb(hex)!;

	// Normalize and apply gamma correction
	const a = [rgb.r, rgb.g, rgb.b].map((v) => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});

	// Linearize using WCAG coefficients
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Helper to convert Hex to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null;
}

export function getContrastColor(hex: string) {
	const whiteContrast = getContrastRatio(hex, '#FFFFFF');
	const blackContrast = getContrastRatio(hex, '#000000');

	return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
}
