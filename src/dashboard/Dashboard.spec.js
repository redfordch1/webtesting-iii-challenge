// Test away

import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

test('dashboard shows the controls, and the diplay', () => {
	const { getByText } = render(<Dashboard />);
	getByText(/unlocked/i);
	const display = getByText(/open/i);
	const controls = getByText(/close gate/i);
	expect(display).toBeDefined;
	expect(controls).toBeDefined;
});
