// NotificationAlert.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { styles, COLORS } from "./styles";
interface LowStockType {
  item_name: string;
  total_quantity: number;
}
interface SuppliersType {
  id: number;
  item_name: string;
  item_sold: string;
  phone_no: number
}

type NotificationType = {
    message: String;
    onClose: ()=>void;
    lowStock: LowStockType;
    suppliers: SuppliersType;
}

const NotificationAlert = ({ message, onClose, lowStock, suppliers }) => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View style={[notifStyles.notificationContainer, { transform: [{ translateY }] }]}>
      <Text style={styles.normalText}>You have items on low stock:</Text>
      <View style={styles.listStyle}>
          {lowStock.map((item) => {
//           console.log(suppliers)
//           console.log(item)
            const stockSupplier = suppliers.find((supplier) => supplier.item_sold === item.item_name)
            return( stockSupplier &&
                (<View key = {item.item_id} style={{flex: 1}}>
                  <View style={{...styles.listItem}}>
                    <View style={styles.inputName}><Text style={styles.normalText}>{item.item_name}</Text></View>
                    <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{item.total_quantity}</Text></View>
                  </View>
                  <Text>Contact <Text style={{color: "brown"}}>{stockSupplier.item_name}</Text> at <Text style={{color: "blue"}}>{stockSupplier.phone_no}</Text> to order.</Text>
                </View>)
            )
          })}
      </View>
      <TouchableOpacity onPress={onClose}>
        <Text style={notifStyles.closeButton}>Cancel</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const notifStyles = StyleSheet.create({
  notificationContainer: {
    borderRadius:8,
    position: 'absolute',
    width: "85%",
    marginLeft: "7.5%",
    zIndex:9999,
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: COLORS.light,
    padding: 20,
    borderColor: "black",
    borderWidth: 2,
    elevation: 5,
  },
  closeButton: {
    color: 'blue',
    marginTop: 10,
  },
});

export default NotificationAlert;
