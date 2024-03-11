export const maskCPF = (e: KeyboardEvent) => {
	if (e.target instanceof HTMLInputElement) {
		// Remove any non-digit characters from the input
		let digits = e.target.value.replace(/\D/g, "");

		// Mask pattern
		const maskPattern = "###.###.###-##";
		let maskedValue = "";
		let digitIndex = 0;

		if (digits.length > 11) {
			return;
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
		e.target.value = maskedValue.replace(/#/g, "");
	}
};

export const maskCNPJ = (e: KeyboardEvent) => {
	if (e.target instanceof HTMLInputElement) {
		// Remove any non-digit characters from the input
		let digits = e.target.value.replace(/\D/g, "");

		// Mask pattern
		const maskPattern = "##.###.###/####-##";
		let maskedValue = "";
		let digitIndex = 0;

		if (digits.length > 14) {
			return;
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
		e.target.value = maskedValue.replace(/#/g, "");
	}
};

// maskCellphone "(##) ########"
export const maskCellphone = (e: KeyboardEvent) => {
	if (e.target instanceof HTMLInputElement) {
		// Remove any non-digit characters from the input
		let digits = e.target.value.replace(/\D/g, "");

		// Mask pattern
		const maskPattern = "(##) #########";
		let maskedValue = "";
		let digitIndex = 0;

		if (digits.length > 11) {
			return;
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
		e.target.value = maskedValue.replace(/#/g, "");
	}
};

// maskZipcode #####-###
export const maskZipcode = (e: KeyboardEvent) => {
	if (e.target instanceof HTMLInputElement) {
		// Remove any non-digit characters from the input
		let digits = e.target.value.replace(/\D/g, "");

		// Mask pattern
		const maskPattern = "#####-###";
		let maskedValue = "";
		let digitIndex = 0;

		if (digits.length > 8) {
			return;
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
		e.target.value = maskedValue.replace(/#/g, "");
	}
};
