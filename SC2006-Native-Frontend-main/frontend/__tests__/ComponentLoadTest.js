import React from 'react';
import { render } from '@testing-library/react-native';
import ViewInventoryUI from "../components/ViewInventoryUI"
import InventoryFormUI from "../components/InventoryFormUI"
import ViewPredictionsUI from "../components/ViewPredictionsUI"
import ViewSuggestionsUI from "../components/ViewSuggestionsUI"
import NotificationAlert from "../components/NotificationAlert"

test('ViewInventoryUI renders with JSON props', () => {
     const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}]
     const mockSetPage = jest.fn();
     const { getByText } = render(<ViewInventoryUI orders={jsonData} setPage={mockSetPage}/>);
     expect(getByText('View Daily Suggestions')).toBeTruthy();
});

test('InventoryFormUI renders with JSON props', () => {
     const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}]
     const mockSetPage = jest.fn();
     const { getByText } = render(<InventoryFormUI orders={jsonData} onFormSubmit={mockSetPage}/>);
     expect(getByText('Inventory Form (New Shipment)')).toBeTruthy();
});

test('ViewPredictionsUI renders with JSON props', () => {
     const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}]
     const mockSetPage = jest.fn();
     const { getByText } = render(<ViewPredictionsUI orders={jsonData} setPage={mockSetPage}/>);
     expect(getByText('Data over 1 month')).toBeTruthy();
});

test('ViewSuggestionsUI renders with JSON props', () => {
     const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}]
     const mockSetPage = jest.fn();
     const { getByText } = render(<ViewSuggestionsUI setPage={mockSetPage}/>);
     expect(getByText('View Suggestions')).toBeTruthy();
});

//test('NotificationAlert renders with JSON props', () => {
//     const jsonData = [{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}]
//     const mockSetPage = jest.fn();
//     const { getByText } = render(<ViewInventoryUI orders={jsonData} setPage={mockSetPage}/>);
//     expect(getByText('View Daily Suggestions')).toBeTruthy();
//});