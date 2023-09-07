export const lexer = (value: string):string[] => value.split(' ').map((t: string) => t.trim()).filter(t => t !== '');

class Token {
}

class Operator extends Token {
}

class Value extends Token {
	constructor(value: string) {
		super();
	}
}

class Column extends Token {
	constructor(value: string) {
		super();
	}
}

const OPERATORS: { [id: string]: Operator } = {
	'OR': new Operator(),
	'AND': new Operator()
}

export function translateTokens(tokens: string[], columns: string[]): Token[] {
	return tokens.map((token: string) => {
		if (token in OPERATORS) {
			return OPERATORS[token];
		} else if (token in columns) {
			return new Column(token)
		}

		return new Value(token);
	});
};
