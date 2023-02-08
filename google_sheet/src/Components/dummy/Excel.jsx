import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, RefreshControl, FlatList } from 'react-native';
import CustomDemo from './CustomDemo';

const Excel = () => {
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

    // const [myData, setMyData] = useState(['sk', 'pk', 'dk', 'mk']);
    // const [bgColor, setBgColor] = useState(false)
    
    


  return (
    <View style={styles.Box}>
        {
            cell.map( (rowData, rowIndex) =>
                <View key={rowIndex} style={{flexDirection:'row'}}>
                {
                    // (rowIndex === 0) && setBgColor(true)
                    rowData.map( (colData, colIndex) => 
                        <View 
                          key={colIndex} 
                          style={{  
                            flex:1, 
                            // backgroundColor: rowIndex === 0 || colIndex === 0 ? "#aaa" : "#ddd",
                            
                            }}>
                                
                            <CustomDemo 
                               value={colData} 
                            //    isFirstRowOrColumn={rowIndex === 0 || colIndex === 0} 
                               
                               />
                        </View>
                    )
                }
                </View>
            )
        }
     
    </View>
  )
}

export default Excel;

const styles = StyleSheet.create({
    Box: {
        marginVertical:14,
        marginHorizontal:6
    },
    textStyle : {
        fontSize:24,
        alignSelf:'center',
        color:'black'  
    },

    
})


    // const convertToExcel = async () => {
    //     const rows = data.map(row => row.join(',')).join('\n');
    //     console.log(rows);
    //     const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/data${Math.floor(Math.random() * 16) + 5}.csv`;
    //     await RNFetchBlob.fs.writeFile(filePath, rows, 'utf8');
    //     if(filePath){
    //      Alert.alert(`File Path ${filePath}`)
    //     }
    //     console.log(`Excel sheet generated at ${filePath}`);
    
    //   };

    // const requestStoragePermission = async () => {h
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //           title: 'Downloader App Storage Permission',
    //           message:
    //             'Downloader App needs access to your Storage ' +
    //             'so you can download .',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //          convertToExcel();
    //          setStore(true)
    //       } else {
    //         console.log('Storage permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   };

    // <Button onPress={()=>{store?convertToExcel():requestStoragePermission()}}    title="Generate Excel"/>

