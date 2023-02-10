import React, {useState} from 'react'
import { Text, View, StyleSheet, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import RNFetchBlob from "rn-fetch-blob";

const Navbar = ({cell}) => {

  
    const [savedData, setSavedData] = useState(false)


    const convertToExcelFile = async () => {
      const content = cell.map(row => row.join(',')).join('\n');
      console.log(content);
      const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/data${Math.floor(Math.random() * 100) + 1}.csv`;
      await RNFetchBlob.fs.writeFile(filePath, content, 'utf8');
      if(filePath){
        Alert.alert(
          "File is Downloaded",
          `File Path ${filePath}`,
        );
      }
      console.log(`Excel sheet generated at ${filePath}`);

    };

    const requestToStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'App Storage Permission ',
              message:
                'Needs to access your Storage ' +
                'for download .',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            convertToExcelFile();
            setSavedData(true);
          } else {
            console.log('Storage permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

  return (

  <View style={styles.navStyle}>

    <TouchableOpacity 
      style={[styles.btnStyle, {width:140} ]}
      activeOpacity={0.5}
      onPress={() => Alert.alert("This page is created by Shubham")}
    > 
    <View>
        <Text style={styles.textStyle}>Shubham</Text>
    </View>

    </TouchableOpacity>

    <TouchableOpacity 
      style={[styles.btnStyle,]}
      activeOpacity={0.5}
      onPress={()=>{savedData?convertToExcelFile():requestToStoragePermission()}}
    > 
    <View>
        <Text style={styles.textStyle}>Download an excel file</Text>
    </View>

    </TouchableOpacity>

    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navStyle : {
      backgroundColor: '#ddd',
      borderWidth: 1,
      borderRadius:4,
      padding:10,
      marginBottom:10,
      flexDirection:'row', 
      justifyContent:'center'
    },
    btnStyle: {
      width:220,
      borderRadius:6,
      borderWidth:1,
      marginHorizontal:4,
      backgroundColor:'green',
      paddingVertical:4,
      alignSelf:'center',
    },
    textStyle : {
      fontSize:18,
      alignSelf:'center',
      color:'#fff',
  },
  })
