<script lang="ts">
	import { lexer } from '../query.parser';

	export let columns: string[] = [];
	export let className = '';
	export let themeColor = '#333';
	export let highlightTextColor = '#fff';
	export let selectedValue = '';

	interface Token {
		value: string;
		start: number;
		end: number;
		index: number;
	};

	let tokens: Token[] = [];

	const splitQueryInputToTokens = (selectedValue: string): Token[] => {
		let result: Token[] = [];
		let startIndex = -1;
		let endIndex = -1;
		let tokenIndex = 0;

		for (let index = 0; index < selectedValue.length; index++) {
			if (selectedValue[index] === ' ') {
				if (startIndex > -1) {
					result.push({
						value: selectedValue.substring(startIndex, endIndex),
						start: startIndex,
						end: endIndex,
						index: tokenIndex++
					});
				}

				startIndex = -1;
				endIndex = -1;
			} else {
				if (startIndex === -1) {
					startIndex = index;
				}

				endIndex = index + 1;
			}
		}

		if (startIndex > -1) {
			result.push({
				value: selectedValue.substring(startIndex, endIndex),
				start: startIndex,
				end: endIndex,
				index: tokenIndex++
			});
		}

		return result;
	}

	let input: HTMLInputElement;
	let modifierLabelWidth: number;
	let showAutocompleteResults = false;
	let highlightIndex = 0;
	let matches: string[] = [];

	const findEditedToken = (cursorIndex: number): Token => {
		return tokens.find(token => token.start <= cursorIndex && token.end >= cursorIndex)!;
	}

	const findMatches = (options: string[]) => {
		const cursorIndex = input?.selectionEnd!;
		const indexSpaceBefore = selectedValue.substring(0, cursorIndex).lastIndexOf(' ') + 1;
		const indexSpaceAfter = selectedValue.indexOf(' ', cursorIndex);
		const searchTerm = selectedValue.substring(
			indexSpaceBefore,
			indexSpaceAfter > 0 ? indexSpaceAfter : undefined
		);

		return options.filter((option) => {
			const foundIndex = option.toLowerCase().indexOf(searchTerm.toLowerCase());

			return foundIndex > -1;
		});
	};

	const spanWrapSearchTerm = (option: string, foundIndex: number, searchTermLength: number) => {
		const searchTerm = option.slice(foundIndex, foundIndex + searchTermLength);

		return `<span>${searchTerm}</span>`;
	};

	const boldSearchTerm = (option: string, searchTerm: string) => {
		const lowercaseOption = option.toLowerCase();
		const lowercaseSearchTerm = searchTerm.toLowerCase();
		let foundIndex = lowercaseOption.indexOf(lowercaseSearchTerm);
		let html = '';

		if (!searchTerm) {
			return option;
		}

		while (foundIndex !== -1) {
			const previousIndex = foundIndex;
			const searchTermLength = searchTerm.length;

			if (!html) {
				html = option.slice(0, foundIndex);
			}

			html += spanWrapSearchTerm(option, foundIndex, searchTermLength);

			// check for another match
			foundIndex = lowercaseOption.indexOf(lowercaseSearchTerm, foundIndex + 1);

			if (foundIndex !== -1) {
				// second match: add raw string before next section of html
				html += option.slice(previousIndex + searchTermLength, foundIndex);
			} else {
				// single match, finish the string
				html += option.slice(previousIndex + searchTermLength);
			}
		}

		return html || option;
	};

	const showResults = (): void => {
		highlightIndex = 0;
		showAutocompleteResults = true;
	};

	const hideResults = (): void => {
		showAutocompleteResults = false;
	};

	const handleInput = (event: InputEventInit): void => {
		tokens = splitQueryInputToTokens(selectedValue);
		const token = findEditedToken(input?.selectionEnd!);

		if (event.data !== '') {
			matches = findMatches(columns);
			showResults();
		}
	};

	const handleKeyDown = (event: KeyboardEvent): void => {
		const highlightedOption = matches[highlightIndex];
		const value = highlightedOption || selectedValue;

		switch (event.key) {
			case 'Escape':
				hideResults();
				break;

			case 'ArrowUp':
				if (showAutocompleteResults && highlightIndex === 0) {
					highlightIndex = matches.length - 1;
				} else {
					highlightIndex -= 1;
				}
				break;

			case 'ArrowDown':
				if (!selectedValue && !showAutocompleteResults) {
					showResults();
					break;
				}

				if (showAutocompleteResults && highlightIndex === matches.length - 1) {
					highlightIndex = 0;
				} else {
					highlightIndex += 1;
				}
				break;

			case 'Tab':
			case 'Enter':
				if (showAutocompleteResults) {
					handleSubmit(value);
					event?.preventDefault();
				}
				break;

			default:
				return;
		}
	};

	const replaceChoiceBySelection = (value: string): string => {
		const cursorIndex = input?.selectionEnd!;

		const spacesIndexes: number[] = [];
		const indexSpaceBefore = selectedValue.substring(0, cursorIndex).lastIndexOf(' ') + 1;
		const indexSpaceAfter = selectedValue.indexOf(' ', cursorIndex);

		const beforePart = selectedValue.substring(0, indexSpaceBefore);
		const afterPart = indexSpaceAfter > -1 ? selectedValue.substring(indexSpaceAfter) : '';

		return beforePart + value + ' ' + afterPart;
	};

	const handleSubmit = (value: string) => {
		if (!value) {
			return;
		}

		selectedValue = lexer(replaceChoiceBySelection(value)).join(' ');
		hideResults();

		input.focus();
	};
</script>

<svelte:document on:click={hideResults} />
<div
	class="svelte-autocomplete {className}"
	style="--theme: {themeColor};
				 --highlightTextColor: {highlightTextColor};
				 --modifier-label-width: {modifierLabelWidth + 8}px;"
>
	<input
		bind:this={input}
		bind:value={selectedValue}
		on:keydown={handleKeyDown}
		on:input={handleInput}
		autocomplete="off"
	/>

	<div
		class:showAutocompleteResults
		class="svelte-autocomplete-results-container"
		aria-hidden={showAutocompleteResults}
		autocapitalize="none"
		aria-autocomplete="list"
		aria-expanded={showAutocompleteResults}
	>
		<ul class="results-list" class:border-none={!matches.length}>
			{#each matches as match, index (match)}
				<li
					on:click={() => handleSubmit(match)}
					class:highlight={index === highlightIndex}
					aria-selected={index === highlightIndex}
					aria-label={match}
					role="option"
				>
					{@html boldSearchTerm(match, selectedValue)}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.svelte-autocomplete {
		display: inline-block;
		position: relative;
	}

	input {
		height: 2.25rem;
		min-width: 200px;
		padding: 0.25rem 0.5rem;
		font-size: 1rem;
		color: #333;
		border-radius: 0.25rem;
		box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
	}

	input.modified-search {
		padding: 0.25rem 2rem 0.25rem var(--modifier-label-width);
	}

	input,
	.results-list {
		border: 1px solid #dbdbdb;
	}

	.search-modifier {
		display: block;
		position: absolute;
		left: 0.25rem;
		top: 0.25rem;
		height: calc(100% - 0.5rem);
		display: flex;
		align-items: center;
		padding: 0.25rem;
		border-radius: 3px;
		background-color: var(--theme);
		color: var(--highlightTextColor);
		font-size: 14px;
	}

	.svelte-autocomplete-results-container {
		display: none;
	}

	.svelte-autocomplete-results-container.showAutocompleteResults {
		display: block;
	}

	.results-list {
		width: calc(100% - 2px);
		position: absolute;
		left: 1px;
		top: 35px;
		list-style-type: none;
		background-color: #fff;
		color: #595959;
		border-radius: 0 0 2px 2px;
		padding-left: 0;
		margin: 0;
		z-index: 10;
		text-align: left;
	}

	.results-list.border-none {
		border: none;
	}

	.results-list li {
		padding: 0.5rem;
		user-select: none;
	}

	:global(.results-list li span) {
		font-weight: bold;
		color: #111;
	}

	.modifier {
		display: flex;
		align-items: center;
		border-top: 1px solid #dbdbdb;
	}

	.search-label {
		border: 1px solid var(--theme);
		background-color: var(--theme);
		border-radius: 0.25rem;
		padding: 0.25rem;
		margin-right: 0.25rem;
		color: var(--highlightTextColor);
		font-size: 0.5rem;
		font-weight: 500;
	}

	.highlight .search-label {
		border: 1px solid var(--highlightTextColor);
	}

	.highlight,
	.results-list li:hover,
	:global(.results-list li:hover span),
	:global(.results-list .highlight span) {
		background: var(--theme);
		color: var(--highlightTextColor);
		font-weight: normal;
	}

	:global(.svelte-autocomplete svg) {
		width: 1.5rem;
		position: absolute;
		top: 0.25rem;
		right: 0.35rem;
		fill: var(--theme);
	}
</style>
