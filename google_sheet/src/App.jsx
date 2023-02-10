
import React from "react";
import { View } from "react-native";
import { StatusBar } from "react-native";
import ExcelData from "./Components/ExcelData";




const App = () => {
  return (
    <View>
      <StatusBar style="light" hidden={false} backgroundColor='red'  />
      <ExcelData />
    </View>
  )
}

export default App;



