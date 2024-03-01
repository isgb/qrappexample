
import React, { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Linking,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  // AsyncStorage.clear();

  const [currentLocation, setCurrentLocation] = useState(null)
  const inputRef = useRef(null);

  const guardarStorage = async (data) => {
    try {
        await AsyncStorage.setItem('data', JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
  }

  const obtenerStorage = async () => {
    try {
      const dataStorage = await AsyncStorage.getItem('data');
      return dataStorage;
    } catch (error) {
        console.log(error)
        return false
    }
  }

  onSuccess = async (e) => {
    // const check = e.data.substring(0, 4);
    // console.log('scanned data ' + e.data);

    // alert(e.data);

    const info = e.data
    // console.log(info);
    
    // if(!stateReactivate){
    getCurrenLocation(info,inputRef.current);
    // }

    // inputRef.current.reactivate()
    
    // try {
    //   const obtener = await obtenerStorage()
    //   // console.log(obtener)

    //   if(obtener == null){

    //     console.log('null',obtener);

    //     getCurrenLocation(info);
    //     // if(!stateReactivate && obtener != info){
    //     //   getCurrenLocation(info);
    //     // }
    //   }else{

    //     if(obtener.replace(/['"]+/g, '') !== info){
    //       // console.log(info);
    //       // console.log(obtener.replace(/['"]+/g, ''));
    //       getCurrenLocation(info);
    //     }

    //   }
    // } catch (error) {
    //   console.log(error)
    // }

    // this.setState({
    //     result: e,
    //     scan: false,
    //     ScanResult: true
    // })

    // if (check === 'http') {
    //     Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    // } else {
    //     this.setState({
    //         result: e,
    //         scan: false,
    //         ScanResult: true
    //     })
    // }

  }

  // useEffect(() =>{
  //   if(!stateReactivate){
  //     setStateReactivate(true)
  //   }else{
  //     setStateReactivate(false)
  //   }
  // },[])

  const getCurrenLocation = (info,refer) => {

    Geolocation.getCurrentPosition(

      position => {

        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude })
        // console.log(latitude, longitude)

        if (latitude, longitude) {
          // const url = `https://www.google.com.mx/maps/search/?api=1&query=${latitude},${longitude}`
          // Linking.openURL(url)
          console.log("ACTIVO")

          refer.reactivate()
          console.log("SCANN ON",latitude, longitude);
          // guardarStorage(info)
        }
        else {
          alert('Localizacion no disponible.')
        }
        
      },
      error => {alert('Error Localizacion', error.message); refer.reactivate();},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )

  }

  const openMaps = () => {
    const { latitude, longitude } = currentLocation
    if (latitude, longitude) {
      const url = `https://www.google.com.mx/maps/search/?api=1&query=${latitude},${longitude}`
      Linking.openURL(url)
    }
    else {
      alert('location not available')
    }
  }

  return (
    <SafeAreaView>

      <ScrollView>

        <View>

          <QRCodeScanner

            // onRead={({data}) => alert(data)}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            // topContent={
            //   <Text style={styles.centerText}>
            //     Go to{' '}
            //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            //     your computer and scan the QR code.
            //   </Text>
            // }
            
            onRead={this.onSuccess}
            reactivate={false}
            reactivateTimeout={500} //500
            showMarker={true}
            // ref={(node) => { this.scanner = node }}
            ref={(node) => { inputRef.current = node }}
            
          // bottomContent={
          //   <TouchableOpacity 
          //     style={styles.buttonTouchable}
          //     onPress={() => this.scanner.reactivate()}
          //   >
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
          // }

          />

        </View>

      </ScrollView>

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default App;
