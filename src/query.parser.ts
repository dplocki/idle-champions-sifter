export const lexer = (value: string) => value.split(' ').map((t: string) => t.trim()).filter(t => t !== '');

