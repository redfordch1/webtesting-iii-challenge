// Test away!

import React from 'react';
import { render } from '@testing-library/react';
import Display from './Display';

test('defaults to unlocked and open', () => {
	const mockState = {
		closed : false,
		locked : false
	};
	const { getByText } = render(<Display closed={mockState.closed} locked={mockState.locked} />);
	expect(getByText(/unlocked/i)).toBeDefined();
	expect(getByText(/open/i)).toBeDefined();
});

test('displays if gate is open or closed and if it is locked or unlocked', () => {
	const mockState = {
		locked : true,
		closed : true
	};

	const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />);
	expect(getByText(mockState.locked ? /locked/i : /unlocked/i)).toBeDefined();
	expect(getByText(mockState.closed ? /closed/i : /open/i)).toBeDefined();
});

test('displays Closed if the closed prop is true and Open if not true', () => {
	const mockState = {
		closed : true
	};

	const { getByText } = render(<Display closed={mockState.closed} />);
	expect(getByText(mockState.closed ? /closed/i : /open/i)).toBeDefined();
});

test('displays Locked if the locked prop is true and Unlocked if not true', () => {
	const mockState = {
		locked : true
	};

	const { getByText } = render(<Display locked={mockState.locked} />);
	expect(getByText(mockState.locked ? /locked/i : /unlocked/i)).toBeDefined();
});

test('when locked or closed use the red led class', () => {
	const mockState = {
		locked : true,
		closed : true
	};
	const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />);
	const isLocked = getByText(/locked/i);
	const isClosed = getByText(/closed/i);
	expect(isLocked.classList.contains('red-led')).toBe(true);
	expect(isClosed.classList.contains('red-led')).toBe(true);
});

test('when locked or closed use the green led class', () => {
	const mockState = {
		locked : false,
		closed : false
	};
	const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />);
	const isLocked = getByText(/unlocked/i);
	const isClosed = getByText(/open/i);
	expect(isLocked.classList.contains('green-led')).toBe(true);
	expect(isClosed.classList.contains('green-led')).toBe(true);
});
