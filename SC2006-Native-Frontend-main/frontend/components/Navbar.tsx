import { View, Image, Text, StyleSheet } from 'react-native';

const Navbar = () => {
    return(
        <View style={styles.navbar}>
            <Image style={styles.logo} source={require('../assets/images/pantreelogo.png')}/>
            <Image style={styles.avatar} source={require('../assets/images/avatargeneric.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FBF5E6',
    padding: 30,
  },
  logo: {
    width: 200,
    height: 50
  },
  avatar: {
    width: 50,
    height: 50
  }
});

export default Navbar;