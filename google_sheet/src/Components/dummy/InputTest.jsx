
import React, {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Platform,TouchableOpacity, Text } from "react-native";
InputTest = () => {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState("");


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={"Enter Name"}
      />
      <TextInput
        style={styles.input}
        onSubmitEditing={(event) => onChangeNumber(event.nativeEvent.text)}
        value={number}
        onChangeText={onChangeNumber}
        placeholder="Enter Age"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => alert(`${text} - ${number} `)} style={styles.button}>
        <Text style={styles.btnText}>SUBMIT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    marginTop: Platform.OS === "android" ? 24 : 0,
    marginHorizontal:10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button:{
    backgroundColor:'red',
    marginHorizontal:10,
    borderRadius:5,
    padding:5,
    alignItems:'center'
  },
  btnText:{
    color:'#FFF'
  }
});

export default InputTest;