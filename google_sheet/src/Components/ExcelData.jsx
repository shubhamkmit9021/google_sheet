import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, RefreshControl, TouchableOpacity, ScrollView, PermissionsAndroid  } from 'react-native';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

      const [selectedCell, setSelectedCell] = useState({row:"", col:""});
      const [refreshing, setRefreshing] = React.useState(false);
      const defaultValue = [  [ null, 'A', 'B', 'C', 'D', 'E'],
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
                          ]

      useEffect( () => {
        getData();
      },[]);

      const onRefresh = () => { 
        setRefreshing(true) ;
        setCell(prev => [...prev]);
        setRefreshing(false);
      }
                        
      const getData = async () => {
          try {
              let value = JSON.parse( await AsyncStorage.getItem('mySavedData'));
              if(value !== null) {
                  console.log("Successfully get data from async storage", );
                  setCell(value)
                  return value;
              }
          } catch(error) {
              console.error(error);
              console.log("Error generating when we get the data from locally");
          }
      }
                    
      const storeData = async (data) => {
          try {
            await AsyncStorage.setItem('mySavedData', JSON.stringify(data));
            console.log("Successfully stored data to async storage", );
          } catch (error) {
            console.error(error);
            console.log("Error generating when we store the data locally");
          }
        };
                    
        const clearStorage = async () => {
          try {
            await AsyncStorage.clear();
              setCell(defaultValue); // for set value of initial time
              Alert.alert('Storage successfully cleared!');
          } catch (e) {
              Alert.alert('Failed to clear the async storage.');
          }
          
        };
                         
        const handleInput = (rowIndex, colIndex, text) => {
              const updatedData = [...cell];
              updatedData[rowIndex][colIndex] = text;
              setCell(updatedData);
              storeData(updatedData);
        }
                    
        const inputStore = (rowIndex, colIndex) => {
          return (
              <TextInput
                onFocus={ () => setSelectedCell({row:rowIndex, col:colIndex}) }
                onBlur={ () => setSelectedCell({row:-1, col:-1}) }
                style={[styles.inputStyle, {
                  fontSize : rowIndex === 0 || colIndex === 0 ? 20 : 16, 
                  color : rowIndex === 0 || colIndex === 0 ? 'red' : 'green',
                  borderColor: selectedCell.row === rowIndex && selectedCell.col === colIndex  ? "blue" : "rgba(20,20,20,0.2)"
                }]} 
                value={cell[rowIndex][colIndex]}
                editable={rowIndex === 0 || colIndex === 0 ? false : true}
                onChangeText = { text => handleInput(rowIndex, colIndex, text)}
              />
          )
        } 

        return (
          <ScrollView
            refreshControl = {
                <RefreshControl 
                  refreshing = {refreshing} 
                  onRefresh={onRefresh} 
                  colors={['red']} 
                  tintColor='green' 
                />}
          >
      
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
                      backgroundColor: rowIndex === 0 || colIndex === 0 ? "#ccc" : "#eee",
                      width:'16.6%'
                      }}>
      
                      {inputStore(rowIndex, colIndex)}
                      <View style={[ selectedCell.row === rowIndex && selectedCell.col === colIndex ? styles.blueDot : '']}></View>
      
                    </View> 
                  )
                }
              </View>
              )
            }
      
          </View>
      
          <Pressable onPress={clearStorage} style={styles.button}>
              <Text style={styles.buttonText}>Clear Storage</Text>
          </Pressable>
      
          </ScrollView>
        )
      
      }
      
      export default ExcelData;
      
      const styles = StyleSheet.create({
        Box: {
            marginVertical:8,
            marginHorizontal:3
        },
        inputStyle : {
            borderWidth:1,
            padding:2,
            textAlign:'center',
        },
        blueDot : {
            height:6,
            width:6,
            position:'absolute',
            right:0,
            top:28,
            borderRadius:30,
            backgroundColor:'blue'
        },
        button: {
            margin: 10,
            padding: 10,
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
          },
        buttonText: {
          fontSize: 18,
          color: '#444',
        },
        textStyle : {
            fontSize:18,
            alignSelf:'center',
            color:'#fff',
        },
    
          
      })