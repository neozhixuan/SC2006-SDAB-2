import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Pressable,
  Alert
} from 'react-native';

import { useState, useEffect } from 'react';

import Navbar from "./components/Navbar"
import Test from "./components/Test"
import ViewInventoryUI from "./components/ViewInventoryUI"
import InventoryFormUI from "./components/InventoryFormUI"
import ViewPredictionsUI from "./components/ViewPredictionsUI"
import ViewSuggestionsUI from "./components/ViewSuggestionsUI"
import NotificationAlert from "./components/NotificationAlert"
export interface ItemType {
  id: number;
  item_name: string;
  quantity: number;
  expiry_date: string;
  flow_rate: number;
}

function App(): JSX.Element {
  const [orders, setOrders] = useState([{id: 0, item_name: "Burger Bun", quantity: 50, expiry_date: "10 March", flow_rate: 0}, {id: 1, item_name: "Burger Bun", quantity: 20, expiry_date: "12 March", flow_rate: 0}, {id: 2, item_name: "Fish Patty", quantity: 5, expiry_date: "10 March", flow_rate: 0}, {id: 3, item_name: "Cheese Slice", quantity: 30, expiry_date: "10 March", flow_rate: 0},  {id: 4, item_name: "Egg", quantity: 120, expiry_date: "10 March", flow_rate: 0}, {id: 5, item_name: "Potato Fries", quantity: 150, expiry_date: "10 March", flow_rate: 0}])
  const [lowStock, setLowStock] = useState([{item_name: "Fish Patty", total_quantity: 5}]);
  const [suppliers, setSupplier] = useState([{id:0, item_name: "Sheng Siong", item_sold: "Fish Patty", phone_no: 81234567}])
  const [page, setPage] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [data, setData] = useState(null);

    const fetchSuppliers = async () => {
        try {
          const response = await fetch('http://10.0.2.2:8000/api/supplier/');
          const jsonData = await response.json();
          setSupplier(jsonData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const fetchLowStock = async () => {
        try {
          const response = await fetch('http://10.0.2.2:8000/fn/filterForLowStock');
          const jsonData = await response.json();
          setLowStock(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const updateLowStock  = async () => {
        try {
          const response = await fetch('http://10.0.2.2:8000/fn/filterForLowStock');
          const jsonData = await response.json();
          console.log(JSON.stringify(lowStock) === JSON.stringify(jsonData))
          if(JSON.stringify(lowStock) !== JSON.stringify(jsonData)){
            setLowStock(jsonData)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

//     useEffect(() => {
//         // Initial fetch
//         updateLowStock();
// //         fetchOrders();
//         // Polling every 3 seconds
//         const intervalId = setInterval(() => {
//           updateLowStock();
//          // fetchOrders();
//         }, 3000);
//
//         // Cleanup the interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []); // Empty dependency array to run only once on mount

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'http://10.0.2.2:8000/api/inventory/',
        );
        const json = await response.json();
        console.log(orders)
        if(json !== orders){
            setOrders(json);
        }
        return json;a
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
        fetchLowStock();
        fetchOrders();
        fetchSuppliers();
    }, [])

    const handleFormSubmit = async () => {
        // Refresh orders by calling fetchOrders
        await fetchOrders();
    };
  return (
    <SafeAreaView style={styles.backgroundStyle}>
        {(showNotification && lowStock.length > 0) &&  (
          <NotificationAlert
            lowStock={lowStock}
            suppliers={suppliers}
            message="This is a notification message."
            onClose={()=>setShowNotification(false)}
          />
        )}
        <Navbar/>
        {page === 0 && <ViewInventoryUI setPage={setPage} orders={orders}/>}
        {page === 1 && <InventoryFormUI setPage={setPage} handleFormSubmit={handleFormSubmit}/>}
        {page === 2 && <ViewPredictionsUI setPage={setPage}  orders={orders}/>}
        {page === 3 && <ViewSuggestionsUI setPage={setPage}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    backgroundStyle:{
        backgroundColor: '#C6847C',
        height: '100%'
    },
});

export default App;
