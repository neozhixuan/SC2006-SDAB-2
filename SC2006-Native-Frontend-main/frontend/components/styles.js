import { StyleSheet } from 'react-native';

export const COLORS = {
    light: '#FBF5E6',
    peach: '#C6847C',
    buttonColor: '#EBCABC'
}

export const styles = StyleSheet.create({
   // Standard styling
   mainBody: {
       height: '100%',
       flexDirection: 'column',
       padding: 30,
   },
   container: {
       flex: 1,
   },
   lightText:{
       color: COLORS.light
   },
   headerText:{
       fontSize: 30,
       fontWeight: "900"
   },
   normalText:{
       fontSize: 20,
       fontWeight: 'bold'
   },
   // List styles
   listStyle:{
       flex: 1,
       flexDirection: 'column',
       width: '100%',

   },
   listItem:{
        marginTop: 5,
       flexDirection: 'row',
       width: '100%',
       justifyContent: 'space-between',
   },
   // Input Styles
  inputItem:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
  },
   inputName: {
       height: 40,
       width: "80%",
       backgroundColor: COLORS.light,
       borderWidth: 2,        // Border width
       borderColor: 'black',  // Border color
       borderRadius: 8,       // Border radius (for rounded corners)
       padding: 5,
   },
   inputQty: {
     height: 40,
     width: "15%",
     backgroundColor: COLORS.light,
     borderWidth: 2,        // Border width
     borderColor: 'black',  // Border color
     borderRadius: 8,       // Border radius (for rounded corners)
     padding: 10,
   },
   normalInput: {
       height: 40,
       width: "100%",
       backgroundColor: COLORS.light,
       borderWidth: 2,        // Border width
       borderColor: 'black',  // Border color
       borderRadius: 8,       // Border radius (for rounded corners)
       padding: 10,
   },
   // Button styles
    buttonStyle: {
      marginTop: 40,
      marginLeft: 20,
      height: 60,
      width: "30%",
    },
    mainButton:{
     width: '100%',
     backgroundColor: COLORS.buttonColor,
     borderWidth: 2,        // Border width
     borderColor: 'black',  // Border color
     borderRadius: 8,       // Border radius (for rounded corners)
     padding: 7,
    },
    buttonText:{
     textAlign: 'center'
    },
    buttonSection:{
     flexDirection: 'column',
     gap: 3
    },
   // Customisable margin sizes
   marginSmaller:{
       marginTop: 20,
   },
   marginLarger:{
       marginTop: 40,
   },
   marginSpecial: {
       marginTop: 70,
   },
   // Dropdown Style
   picker:{
       height: 40,
   },
   pickerStyle:{
       width: "70%",
       backgroundColor: COLORS.light,
       borderWidth: 2,        // Border width
       borderColor: 'black',  // Border color
       borderRadius: 8,       // Border radius (for rounded corners)
       padding: 0,
   },
    suggestionItem: {
        marginTop: 10,
        backgroundColor: COLORS.light,
        borderColor: 'black',  // Border color
        borderRadius: 8,
        borderWidth: 2,
        padding: 10
    }
});