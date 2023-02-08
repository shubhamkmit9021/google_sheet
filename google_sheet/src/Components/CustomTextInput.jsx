import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// { value, rowIndex, colIndex, isSelected, setSelectedCell }
const CustomTextInput = ({value, key, rowIndex, colIndex, isSelected, isFirstRowOrColumn, setSelectedCell}) => {
    const [bgColor, setBgColor] = useState(false)
    
  return (
    <View>
        <TextInput 
          value={value} 
          style={[Styles.inputStyle, {fontSize: isFirstRowOrColumn ? 20 : 14}, {borderColor: isSelected ? "red" : "black",} ]}
          onClick={() => setSelectedCell([rowIndex, colIndex])}
          />
    </View>
  )
}

export default CustomTextInput;

const Styles = StyleSheet.create ({
    inputStyle : {
        // width:'auto',
        borderWidth:1,
        // borderRadius:5,
        padding:2,
        // borderColor:'rgba(20,20,20,0.2)',
        textAlign:'center',
        cursor: "pointer",
        // fontSize:18,
        
    }
})
