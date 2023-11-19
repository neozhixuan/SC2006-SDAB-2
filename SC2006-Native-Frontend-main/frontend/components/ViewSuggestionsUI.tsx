import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import { styles, COLORS } from "./styles";
import { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';

type InventoryProps = {
    setPage: ()=>void;
}

const ViewSuggestionsUI = (props: InventoryProps) => {
    const [suggestions, setSuggestions] = useState([
       {
           "id": 1,
           "item_name": "Grilled Chicken Sandwich",
           "ingredients": [
               {"ingredient": "Chicken Breast", "quantity": 1},
               {"ingredient": "Mixed Greens", "quantity": 1}
           ]
       }
    ]);
    const [marketplace, setMarketplace] = useState([
        {
            "item_id": 435,
            "item_name": "Grilled Chicken Sandwich",
            "price": "100.00",
            "description": "Interesting exotic food."
        },
    ])
    const [weather, setWeather] = useState([
        {
            "forecast": "thundery showers"
        },
        {
            "humidity_low": "60"
        },
        {
            "humidity_high": "95"
        }
    ])
    const [openTab, setOpenTab] = useState(-1);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          'http://10.0.2.2:8000/fn/suggestedMenu',
        );
        const json = await response.json();
        setSuggestions(json.slice(0,-3));
        let weatherSlice = json.slice(-3);
        weatherSlice[0].forecast = weatherSlice[0].forecast.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        setWeather(weatherSlice);
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMarketplace = async () => {
      try {
        const response = await fetch(
          'http://10.0.2.2:8000/api/marketplace',
        );
        const json = await response.json();
        setMarketplace(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = async(formData, itemName) => {
        postData = {"item_name": itemName, "price": formData.Price, "description": formData.Description};
        console.log(`Attempting to submit ${itemName} to marketplace with price of ${formData.Price} and description: ${formData.Description}`);

        try {
            // Make a POST request to add the item to the marketplace
            await fetch('http://10.0.2.2:8000/fn/createMarketplace/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData),
            });

            // Wait for the state to update before fetching the marketplace data again
            await fetchMarketplace();

            console.log(`${itemName} submitted to the marketplace with price of ${formData.Price} and description: ${formData.Description}`);
          } catch (error) {
            console.error('Error submitting to the marketplace:', error);
          }
    };

    useEffect(()=>{
        fetchSuggestions();
        fetchMarketplace();
    }, [])

    const changeTab = (id) => {
        setValue("Price", "");
        setValue("Description", "");
        setOpenTab(id);
    }

    const validatePositiveNumber = (value) => {
        if (parseFloat(value) < 1) {
          return 'Please enter a price above 0';
        }
        return true;
    };

    return(
            <ScrollView style={styles.mainBody}>
               <View style={styles.container}>
                  <Text style={[styles.lightText, styles.headerText]}>View Suggestions</Text>
                  <View style={{backgroundColor: COLORS.light, width: "100%", height: "fit-content", padding: 10, borderRadius: 8, borderColor: "black", borderWidth: 2}}>
                      <Text><Text style={{...styles.normalText, textDecorationLine: "underline"}}>Weather Data</Text> powered by data.gov.sg API</Text>
                      <Text style={styles.normalText}>Weather: {weather[0].forecast}</Text>
                      <Text style={styles.normalText}>Humidity Low: {weather[1].humidity_low}</Text>
                      <Text style={styles.normalText}>Humidity High: {weather[2].humidity_high}</Text>
                  </View>
                  <View>
                     <View style={styles.listStyle}>
                     {suggestions.map((item)=>{
                        const marketplaceItems = marketplace.map((item)=>(item.item_name));
                        if (marketplaceItems.includes(item.item_name)){
                            return;
                        }
                        return(<View style={styles.suggestionItem} key={item.id}>
                            <Text style={{...styles.normalText, fontWeight:"900", marginBottom: 10}}>{item.item_name}</Text>
                            <View style={styles.listStyle}>
                            {item.ingredients.map((ingredient, idx)=>{
                                return(<View key={idx} style={styles.listItem}>
                                           <View style={styles.inputName}><Text style={styles.normalText}>{ingredient.ingredient}</Text></View>
                                           <View style={styles.inputQty}><Text style={{textAlign: "center", fontWeight: "600"}}>{ingredient.quantity}</Text></View>
                                         </View>)
                            })}
                            {item.message && <Text style={{marginBottom: 5, marginTop: 5}}>Suggested by our algorithm when the weather is {weather[0].forecast} with high humidity of {weather[2].humidity_high}.</Text>}
                            {openTab !== item.id && <Pressable style={[styles.mainButton]} onPress={() => changeTab(item.id)}>
                                <Text style={[styles.buttonText, styles.normalText]}>Post on Marketplace</Text>
                            </Pressable>}
                            {/* Price */}
                            {openTab === item.id && (
                            <View>
                                <Controller
                                    key={"Price"}
                                    control={control}
                                    render={({ field }) => (
                                    <View>
                                        <Text style={[styles.normalText]}>Enter price of item:</Text>
                                        <View style={styles.inputItem}>
                                           <TextInput
                                              placeholderTextColor="#11182744"
                                              style={styles.normalInput}
                                              placeholder="Price"
                                              keyboardType="numeric"
                                              value={field.value}
                                              onChangeText={(text)=>field.onChange(text)}
                                          />
                                      </View>
                                      {errors["Price"] && <Text>{errors["Price"].message}</Text>}
                                 </View>
                              )}
                                name={"Price"}
                                rules={{ required: `Price is required`, validate: validatePositiveNumber, }}
                              />

                              {/* Description */}
                              <Controller
                                key={"Description"}
                                control={control}
                                render={({ field }) => (
                                    <View>
                                        <Text style={[styles.normalText]}>Description:</Text>
                                        <View style={styles.inputItem}>
                                            <TextInput
                                                placeholderTextColor="#11182744"
                                                style={styles.normalInput}
                                                placeholder="Description"
                                                keyboardType="default"
                                                value={field.value}
                                                onChangeText={(text)=>field.onChange(text)}
                                            />
                                        </View>
                                        {errors["Description"] && <Text>{errors["Description"].message}</Text>}
                                    </View>
                                )}
                                name={"Description"}
                                rules={{ required: `Description is required` }}
                              />
                               <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={handleSubmit((formData) => onSubmit(formData, item.item_name))}>
                                    <Text style={[styles.buttonText, styles.normalText]}>Submit</Text>
                                </Pressable></View>)}
                            </View>
                        </View>)
                    })}
                  </View>
                  <Pressable style={[styles.mainButton, styles.marginSmaller]} onPress={() => props.setPage(0)}>
                      <Text style={[styles.buttonText, styles.normalText]}>Return</Text>
                  </Pressable>
              </View>
           </View>

       </ScrollView>)
}

export default ViewSuggestionsUI;