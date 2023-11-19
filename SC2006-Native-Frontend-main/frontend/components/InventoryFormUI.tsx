import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
  Platform,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles, COLORS } from "./styles";
import { useForm, Controller } from 'react-hook-form';

type InventoryProps = {
    setPage: ()=>void;
    onFormSubmit: () => void;

}

const emptyItem = {
	"name": "",
	"qty": null,
};

const InventoryFormUI = (props: InventoryProps) => {
    // Dropdown Values
    const [itemNames, setItemNames] = useState([{label: "Test", value:"Test"}]);
    // List of Items inputted in form
    const [items, setItems] = useState([{"name": "", "qty": null}])
    // Date Time Picker formatting
    const [expiryDate, setExpiryDate] = useState("")
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const [error, setError] = useState("");

    // Date Time Picker logic
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangePicker = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker();
                setExpiryDate(currentDate.toDateString());
            }
        }
        else {
            toggleDatePicker();
        }
    };

    // Item List Handler
	const handleAddItem = useCallback(() => {
		const a = [...items, emptyItem];
		setItems(a);
	}, [items, setItems]);

    const handleUpdateItem = useCallback(
        (type, index, value) => {
            const _items = [...items];
            const _item = { ..._items[index] };
            _item[type] = value;
            _items[index] = _item;
            setItems(_items);
        },
        [items, setItems],
    );

	const handleRemoveItem = useCallback((index) => {
        const _items = [...items];
        _items.splice(index, 1);
        setItems(_items);
    }, [items, setItems]);

    // Fetching list of names for dropdown, from backend
    const fetchItemNames = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/fn/getItemNames');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setItemNames(json);
        console.log(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    // Render on component mount
    useEffect(()=>{
        fetchItemNames();
    }, [])

    const validatePassword = (value) => {
        if (value !== '1234567890') {
          return 'Password is incorrect.';
        }
        return true;
    };

    // Submit Form Logic
    const onSubmitForm = async (formData) => {
        try {
            for (const item of items) {
                if (item.name === "" || item.qty === null) {
                    setError("Fill in all rows");
                    return;
                }else if (item.qty < 0){
                    setError("Enter a positive number");
                    return;
                }

                const postData = {
                    "item_name": item.name,
                    "flow_rate": 1,
                    "expiry_date": new Date(expiryDate).toISOString(),
                    "quantity": item.qty,
                    "entry_date": new Date(),
                };

                console.log(postData);

                const response = await fetch('http://10.0.2.2:8000/fn/createInventory/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers as needed
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(`${item.name} submitted to backend`, data);
            }

            // Reset error state
            setError("");
            // Trigger the parent callback to refresh data
            props.handleFormSubmit();
            // Navigate to another page or perform other actions
            props.setPage(0);
        } catch (error) {
            console.error('Error sending POST request:', error);
            // Handle errors here if needed
        }
    };

    return(
        <ScrollView style={styles.mainBody}>
            <View style={{...styles.container, height: "80%"}}>
                <Text style={[styles.lightText, styles.headerText]}>Inventory Form (New Shipment)</Text>
                {/*Shipping Details*/}
                <Text style={[styles.lightText, styles.normalText]}>Enter shipment details*:</Text>
                {error !== "" && <Text>{error}</Text>}

                <View style={{flexDirection:"column"}}>
                    {items.map((item, idx) => {
                      return(<View style={{flexDirection: "row"}} key={idx}>
                        <View style={styles.pickerStyle}>
                          <Picker
//                               style={styles.picker}
                              selectedValue={item.name}
                              onValueChange={(itemValue, itemIndex) => {
                                handleUpdateItem("name", idx, itemValue)
                              }}
                          >
                            <Picker.Item label="Select an option..." value={null} />
                            {itemNames.map((item, index) => (
                                <Picker.Item label={item.label} value={item.value} key={index} />
                            ))}
                          </Picker>
                        </View>
                        <TextInput
                          style={{...styles.inputQty, height:60, width: 50}}
                          placeholder="Qty"
                          keyboardType="numeric"
                          onChangeText={(text) => handleUpdateItem("qty", idx, text)}
                        />
                        {idx === 0 ? (
                        <Pressable style={{...styles.inputQty, height:60,  width: 50}} onPress={handleAddItem}>
                          <Text style={{fontSize: 25, textAlign: "center"}}>+</Text>
                        </Pressable>) : (
                        <Pressable style={{...styles.inputQty, height:60,  width: 50}} onPress={() => handleRemoveItem(idx)}>
                          <Text style={{fontSize: 25, textAlign: "center"}}>-</Text>
                        </Pressable>)}
                      </View>)
                    })}
                </View>
                {/*Expiry Date and Time*/}
                <View>
                    <Text style={[styles.lightText, styles.normalText, styles.marginSmaller]}>Enter expiry date and time:</Text>
                    <View>
                        <View style={styles.inputItem}>
                            {showPicker && (
                                <DateTimePicker
                                    mode= "date"
                                    display= "spinner"
                                    placeholderTextColor="#11182744"
                                    value= {date}
                                    onChange= {onChangePicker}
                                    minimumDate={new Date()}
                                />
                            )}
                            {!showPicker && (
                                <Pressable
                                    onPress= {toggleDatePicker}
                                    style={{width: "100%"}}
                                >
                                    <TextInput
                                        style={styles.normalInput}
                                        placeholder="Sat Nov 11 2023"
                                        placeholderTextColor="#11182744"
                                        value={expiryDate}
                                        onChangeText= {setExpiryDate}
                                        editable= {false}
                                        color="black"
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>
                    {errors["ExpiryDate"] && <Text style={[styles.marginSmaller]}>{errors["ExpiryDate"].message}</Text>}
                </View>
                {/*Password*/}
                <Controller
                    key={"Password"}
                    control={control}
                    render={({ field }) => (
                        <View>
                            <Text style={[styles.lightText, styles.normalText, styles.marginSmaller]}>Enter password:</Text>
                            <View style={styles.listStyle}>
                                <View style={styles.inputItem}>
                                    <TextInput
                                        style={styles.normalInput}
                                        placeholder="Item"
                                        keyboardType="numeric"
                                        placeholderTextColor="#11182744"
                                        secureTextEntry={true}
                                        value={field.value}
                                        onChangeText={(text)=>field.onChange(text)}
                                    />
                                </View>
                            </View>
                            {errors["Password"] && <Text style={[styles.marginSmaller]}>{errors["Password"].message}</Text>}
                        </View>
                    )}
                    name={"Password"}
                    rules={{ required: `Password is required`, validate: validatePassword, }}
                />
                {/* Rows of buttons */}
                <View style={styles.marginLarger}>
                   <Pressable style={styles.mainButton} onPress={handleSubmit((formData) => onSubmitForm(formData))}>
                        <Text style={[styles.buttonText, styles.normalText]}>Submit</Text>
                    </Pressable>
                   <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
                        <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default InventoryFormUI;