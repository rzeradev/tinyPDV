export const maskCPF = (digits: string) => {
	// Remove any non-digit characters from the input
	digits = digits.replace(/\D/g, "");

	// Mask pattern
	const maskPattern = "###.###.###-##";
	const length = 11;
	return applyMask(digits, maskPattern, length);
};

export const maskCNPJ = (digits: string) => {
	// Mask pattern
	const maskPattern = "##.###.###/####-##";
	const length = 14;

	return applyMask(digits, maskPattern, length);
};

// maskCellphone "(##) ########"
export const maskCellphone = (digits: string) => {
	// Mask pattern
	const maskPattern = "(##) #####-####";
	const length = 11;

	return applyMask(digits, maskPattern, length);
};

// maskZipcode #####-###
export const maskZipcode = (digits: string) => {
	// Mask pattern
	const maskPattern = "#####-###";
	const length = 8;

	return applyMask(digits, maskPattern, length);
};

const applyMask = (digits: string, maskPattern: string, length: number) => {
	digits = digits.replace(/\D/g, "");
	let maskedValue = "";
	let digitIndex = 0;

	if (digits.length > length) {
		digits = digits.slice(0, -1);
	}

	// Loop through the mask pattern
	for (let i = 0; i < maskPattern.length; i++) {
		if (maskPattern[i] === "#") {
			if (digitIndex < digits.length) {
				// Replace '#' with a digit from the user input
				maskedValue += digits.charAt(digitIndex);
				digitIndex++;
			} else {
				// No more digits left, just add '#' to the masked value
				maskedValue += maskPattern[i];
			}
		} else {
			// Add the current non-digit character from the mask pattern
			maskedValue += maskPattern[i];
		}
	}

	// Update the input field with the masked value, remove any #
	return maskedValue.replace(/#/g, "");
};
