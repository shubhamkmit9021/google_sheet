import React, {useState} from 'react'
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native'

const Navbar = ({cell}) => {

    const [isPress, setIsPress] = useState(false);
    const [savedData, setSavedData] = useState(false)


     const convertToExcelFile = async () => {
        const rows = cell.map(row => row.join(',')).join('\n');
        console.log(rows);
        const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/data${Math.floor(Math.random() * 16) + 5}.csv`;
        await RNFetchBlob.fs.writeFile(filePath, rows, 'utf8');
        if(filePath){
         Alert.alert(`File Path ${filePath}`)
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
            setSavedData(true)
          } else {
            console.log('Storage permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };


  return (
   <View>
     <View style={Styles.navStyle}>
        <TouchableOpacity 
          style={[Styles.btnStyle, {backgroundColor: isPress ? 'red' : 'green'}]}
          activeOpacity={0.5}
          onPress={()=>{savedData?convertToExcelFile():requestToStoragePermission()}}
    
        > 
            <View>
                <Text style={Styles.textStyle}>Download an excel file</Text>
            </View>
        </TouchableOpacity>
     </View> 
     
   </View>
  )
}

export default Navbar

const Styles = StyleSheet.create({
    navStyle : {
        backgroundColor: '#ddd',
        borderWidth: 1,
        borderRadius:4,
        padding:10,
        height:'auto',
        // marginTop:1,
        marginBottom:10
    },
    btnStyle: {
        borderRadius:6,
        width:'auto',
        paddingHorizontal:18,
        paddingVertical:4,
        alignSelf:'center',

    },
    textStyle : {
        fontSize:24,
        alignSelf:'center',
        color:'#fff'  
    },
  })
