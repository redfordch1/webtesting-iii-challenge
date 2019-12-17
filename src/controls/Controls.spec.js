// Test away!

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Controls from '../controls/Controls';

test('cant be opened or closed when locked', () => {
	const toggle = jest.fn();
	const { getByText } = render(<Controls locked={true} closed={true} toggle={toggle} />);
	const openGate = getByText(/open gate/i);
	fireEvent.click(openGate);
	expect(toggle).not.toHaveBeenCalled();
});

test('buttons text changes when clicked', () => {
	const mockState = {
		locked : false,
		closed : false
	};

	const toggleLocked = jest.fn();
	const toggleClosed = jest.fn();
	const { getAllByText } = render(
		<Controls
			locked={mockState.locked}
			toggleLocked={toggleLocked}
			closed={mockState.closed}
			toggleClosed={toggleClosed}
		/>
	);
	const [ toggleLock, toggleClose ] = getAllByText(/gate/i);
	fireEvent.click(toggleClose);
	expect(toggleClosed).toHaveBeenCalled();
	expect(toggleClose.textContent).toBe('Close Gate');
	expect(toggleLock.textContent).toBe('Lock Gate');
});

test('the closed toggle button is disabled if the gate is locked', () => {
	const toggleClosed = jest.fn();
	const { getByText } = render(<Controls locked={true} toggleClosed={toggleClosed} />);
	const closedBtn = getByText(/close gate/i);
	fireEvent.click(closedBtn);
	expect(toggleClosed).not.toHaveBeenCalled();
});

test('the locked toggle button is disabled if the gate is open', () => {
	const toggleLocked = jest.fn();
	const { getByText } = render(<Controls closed={false} toggleLocked={toggleLocked} />);
	const lockBtn = getByText(/lock gate/i);
	fireEvent.click(lockBtn);
	expect(toggleLocked).not.toHaveBeenCalled();
});
