import { DOUBLE_BRACKET_REGEX } from "./constants";
/**
 * Checks if the current position of the input cursor is surrounded by double brackets
 * @param inputValue the input value to check
 * @param selectionStart the current position of the cursor
 * @example
 * isSurroundedByDoubleBrackets("[[filename]]", 4) // true
 */
export const isSurroundedByDoubleBrackets = (
	inputValue: string,
	selectionStart: number
) => {
	let match;

	const regex = structuredClone(DOUBLE_BRACKET_REGEX);
	//We create a copy because exec stores state in the regex
	while ((match = regex.exec(inputValue)) !== null) {
		//The inner text of the double brackets
		const innerText = match[1];

		//Index of the inner text
		const startIndex = match.index + 2;

		//End index of the inner text
		const endIndex = startIndex + innerText.length - 1;

		//The character index of the cursor
		//The cursor is to the right of a character
		const index = selectionStart - 1;

		//Handle empty brackets case [[]]
		//The cursor will be to the right of the first left bracket
		if (innerText === "" && index === startIndex - 1) return true;

		//Handle non-empty brackets case [[filename]]
		//The cursor will be inbetween start and end brackets
		if (index >= startIndex && index <= endIndex) return true;
	}
	return false;
};

export const doubleBracketsInnerReplace = (
	inputValue: string,
	selectionStart: number,
	replacement: string
) => {
	let match;
	//We create a copy because exec stores state in the regex
	const regex = structuredClone(DOUBLE_BRACKET_REGEX);
	while ((match = regex.exec(inputValue)) !== null) {
		//The inner text of the double brackets
		const innerText = match[1];

		//The inner text of the double brackets
		const startIndex = match.index + 2;

		//End index of the inner text
		const endIndex = startIndex + innerText.length - 1;

		//The character index of the cursor
		//The cursor is to the right of a character
		const index = selectionStart - 1;

		//Handle empty brackets case [[]]
		//The cursor will be to the right of the first left bracket
		if (innerText === "" && index === startIndex - 1) {
			return (
				inputValue.slice(0, startIndex) +
				replacement +
				inputValue.slice(endIndex + 1)
			);
		}

		//Handle non-empty brackets case [[filename]]
		//The cursor will be inbetween start and end brackets
		if (index >= startIndex && index <= endIndex) {
			return (
				inputValue.slice(0, startIndex) +
				replacement +
				inputValue.slice(endIndex + 1)
			);
		}
	}
	return inputValue;
};

/**
 * If the current cursor position is in double brackets, it gets the inner text
 * @param inputValue the input value to check
 * @param selectionStart the current position of the cursor
 * @example
 * getFileValue("[[filename]]", 4) // filename
 */
export const getFilterValue = (inputValue: string, selectionStart: number) => {
	let match;

	const regex = structuredClone(DOUBLE_BRACKET_REGEX);
	//We create a copy because exec stores state in the regex
	while ((match = regex.exec(inputValue)) !== null) {
		//The inner text of the double brackets
		const innerText = match[1];

		//Index of the inner text
		const startIndex = match.index + 2;

		//End index of the inner text
		const endIndex = startIndex + innerText.length - 1;

		//The character index of the cursor
		//The cursor is to the right of a character
		const index = selectionStart - 1;

		//Handle empty brackets case [[]]
		//The cursor will be to the right of the first left bracket
		if (innerText === "" && index === startIndex - 1) {
			return innerText;
		}

		//Handle non-empty brackets case [[filename]]
		//The cursor will be inbetween start and end brackets
		if (index >= startIndex && index <= endIndex) {
			return innerText;
		}
	}
	return null;
};

/**
 * Adds a closing bracket when the user types an opening bracket
 * @param value the new input value
 * @param selectionStart the current position of the cursor
 */
export const addClosingBracket = (value: string, selectionStart: number) => {
	const char = value[selectionStart - 1];
	if (char === "[") value = value + "]";
	return value;
};

/**
 * Removes the closing bracket when the user deletes the opening bracket
 * @param previousValue the previous input value
 * @param value the new input value
 * @param selectionStart the current position of the cursor
 */
export const removeClosingBracket = (
	previousValue: string,
	value: string,
	selectionStart: number
) => {
	// If the user is deleting a bracket, delete the closing bracket
	const previousChar = previousValue[selectionStart];
	const nextChar = value[selectionStart];
	if (previousChar === "[" && nextChar === "]") {
		const updatedValue =
			value.slice(0, selectionStart) + value.slice(selectionStart + 1);
		value = updatedValue;
	}

	return value;
};

export const filterUniqueStrings = (arr: string[]) => {
	const frequencyMap = new Map<string, number>();
	arr.forEach((string) => {
		frequencyMap.set(string, (frequencyMap.get(string) || 0) + 1);
	});

	const uniqueStrings = [];
	for (const string of frequencyMap.keys()) {
		if (frequencyMap.get(string) === 1) {
			uniqueStrings.push(string);
		}
	}

	return uniqueStrings;
};

export const stripDoubleBrackets = (value: string) => {
	return value.slice(2, value.length - 2);
};

export const stripAlias = (value: string) => {
	const index = value.lastIndexOf("|");
	if (index === -1) return value;
	return value.slice(0, index);
};
