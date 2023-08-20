import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import QueryTextBox from './QueryTextBox.svelte';

describe('Test QueryTextBox.svelte', () => {
  it('Initial text value', () => {
    const result = render(QueryTextBox);

    expect(() => result.getByRole('textbox')).not.toThrow();
  });
});