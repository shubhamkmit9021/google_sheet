import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
import Navbar from './Navbar';
// import CustomTextInput from './CustomTextInput';


const ExcelData = () => {
    const [cell, setCell] = useState([ [ null, 'A', 'B', 'C', 'D', 'E'],
                                       ['1', null, null, null, null, null ],
                                       ['2', null, null, null, null, null ],
                                       ['3', null, null, null, null, null ], 
                                       ['4', null, null, null, null, null ],
                                       ['5', null, null, null, null, null ],
                                       ['6', null, null, null, null, null ],
                                       ['7', null, null, null, null, null ],
                                       ['8', null, null, null, null, null ],
                                       ['9', null, null, null, null, null ],
                                       ['10', null, null, null, null, null ],
                                    ])

    const [selectedCell, setSelectedCell] = useState([-1, -1]);

    useEffect( () => {
        getData();
    },[]);

    
    const storeData = async (value) => {
    try {
        let stringifyKey = JSON.stringify(value);
        await AsyncStorage.setItem('matrixData', stringifyKey);
        console.log("Successfully stored data to async storage", );
      } catch (e) {
        // saving error
        console.log("Error generating when we store the data locally");
      }
    };

    const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('matrixData');
      if(value !== null) {
            let parsedValue = JSON.parse(value);
          setCell(parsedValue)
          return parsedValue;
      }
    } catch(e) {
      // error reading value
      console.log("Error generating when we get the data from locally");
    //   return null;
    }
  }

    const handleInput = (rowIndex, colIndex, value ) => {
        setCell( prev => {
            let matrix = [...prev];
            matrix[rowIndex][colIndex] = value;
            storeData(matrix);   // storedata function call for locally save
            return matrix;       // update the value using setCell state
        })
    }

    const inputStore = (colData, rowIndex, colIndex) => {
        return (

            <CustomTextInput 
                value={colData}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isSelected={selectedCell[0] === rowIndex && selectedCell[1] === colIndex}
                isFirstRowOrColumn={rowIndex === 0 || colIndex === 0} 
                setSelectedCell={setSelectedCell}
 
            />
        )
    }


    


const CustomTextInput  = ({value, rowIndex, colIndex, isSelected, isFirstRowOrColumn, setSelectedCell}) => {
    return (
        <View>
            <TextInput
              style={[ 
                styles.inputStyle,
                {fontSize: isFirstRowOrColumn ? 20 : 18}, 
                {borderColor: isSelected ? "blue" : "rgba(20,20,20,0.2)",}  
              ]}
              editable={rowIndex === 0 || colIndex === 0 ? false : true}
              value={cell[rowIndex][colIndex]} 
              
              onFocus={() => setSelectedCell([rowIndex, colIndex])}
              onChangeText={ value => handleInput(rowIndex, colIndex, value) } 
              />
              
        </View>
      )
}

  return (
    <>
    <Navbar cell={cell} />
    <View style={styles.Box}>

{
    cell.map( (rowData, rowIndex) =>
        <View key={rowIndex} style={{flexDirection:'row'}}>
        {
            rowData.map( (colData, colIndex) => 
                <View 
                  key={colIndex} 
                  style={{  
                    // flex:1, 
                    backgroundColor: rowIndex === 0 || colIndex === 0 ? "#ccc" : "#eee",
                    width:'16%'
                    }}>

                    {inputStore(colData, rowIndex, colIndex)}
                        

                    {/* <View><Text>hii</Text></View> */}

                </View>
            )
        }
        </View>
    )
}

</View>
    </>
  )
}


export default ExcelData;

const styles = StyleSheet.create({
    Box: {
        marginVertical:8,
        marginHorizontal:3
    },
    textStyle : {
        fontSize:24,
        alignSelf:'center',
        color:'black'  
    },
    inputStyle : {
        borderWidth:2,
        padding:2,
        textAlign:'center',
        borderBottomEndRadius:10
    
    }

    
})
