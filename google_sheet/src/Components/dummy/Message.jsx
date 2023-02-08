import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = () => {
  return (
    <View style={Styles.box}>
      <Text style={Styles.textStyle}> Hi Shubham</Text>
    </View>
  )
}

export default Message;

const Styles = StyleSheet.create({
    box : {
      marginTop: 20,
      justifyContent:"center"
    
    }, 
    textStyle : {
      fontSize:26,
      fontWeight:900,
      alignSelf:'center'
      
    }
  })
