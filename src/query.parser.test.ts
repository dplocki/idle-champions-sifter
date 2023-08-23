import { describe, it, expect } from 'vitest';
import { lexer } from './query.parser';

describe('lexer', () => {
	it('should return empty array on empty input', () => {
		const result = lexer('');

		expect(result).toStrictEqual([]);
	});

	it('should return only tokens no mater on spaces in input', () => {
		const result = lexer('   a     b c          	      d          ');

		expect(result).toStrictEqual(['a', 'b', 'c', 'd']);
	});
});
