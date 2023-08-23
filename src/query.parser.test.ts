import { describe, it, expect } from 'vitest';
import { lexer } from './query.parser';

describe('lexer', () => {
	it('should return empty array on empty input', () => {
		const result = lexer('');

		expect(result).toStrictEqual([]);
	});
});
