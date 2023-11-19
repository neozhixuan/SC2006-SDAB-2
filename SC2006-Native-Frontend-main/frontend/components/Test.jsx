import {View, Text, Pressable, Alert} from 'react-native';

const Test = () => {
    return(
        <View>
            <Text>Hi</Text>
            <Pressable onPress={() => Alert.alert('Simple Button pressed')}>
                <Text> button </Text>
            </Pressable>
        </View>
    )
}

export default Test;