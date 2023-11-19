import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import InventoryFormUI from "../components/InventoryFormUI";

test('Password Error if any input is blank', async () => {
    // Render the InventoryFormUI component
    const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}];
    const mockSetPage = jest.fn();
    const { getByText, queryByText } = render(<InventoryFormUI orders={jsonData} onFormSubmit={mockSetPage}/>);

    // Use act to wrap the interactions
    await act(async () => {
        // Simulate a button press without filling any inputs
        fireEvent.press(getByText('Submit'));
    });

    // Assert that the page did not change
    expect(getByText('Inventory Form (New Shipment)')).toBeTruthy();

    // Check for the error message (assuming it's not present initially)
    expect(queryByText('Password is required')).toBeTruthy();
});