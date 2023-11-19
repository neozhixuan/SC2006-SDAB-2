import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import ViewSuggestionsUI from "../components/ViewSuggestionsUI"

test('Password Error if any input is blank', async () => {
    // Render the InventoryFormUI component
    const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}];
    const mockSetPage = jest.fn();
    const { getAllByText, getByText, queryByText } = render(<ViewSuggestionsUI setPage={mockSetPage}/>);

    // Use act to wrap the interactions
    await act(async () => {
        // Simulate a button press without filling any inputs
        fireEvent.press(getAllByText('Post on Marketplace')[0]); // Select the first element
        // Wait for the state change to complete
        await waitFor(() => {
            // Your condition to wait for, e.g., the presence of the Submit button
            expect(getByText('Submit')).toBeTruthy();
        });
        // Simulate another button press (e.g., Submit)
        fireEvent.press(getByText('Submit'));
    });

    // Assert that the page did not change
    expect(getByText('View Suggestions')).toBeTruthy();

    // Check for the error message (assuming it's not present initially)
    expect(queryByText('Price is required')).toBeTruthy();
    expect(queryByText('Description is required')).toBeTruthy();
});