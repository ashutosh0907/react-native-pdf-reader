import React, * as react from 'react';
import { useEffect, useState } from 'react';
import Navigation from './src/navigation/Navigation';
import { Platform, PermissionsAndroid } from 'react-native'
import { request, PERMISSIONS } from 'react-native-permissions';
export default App = () => {
  const [camerapermissionResult, setCameraPermissionResult] = useState('');
  const [locationpermissionResult, setLocationPermissionResult] = useState('');

  const requestCameraPermission = () => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
      setCameraPermissionResult(result)
      console.log(result);
    });
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === 'granted') {
        console.log('granted');
      } else {
        console.log('Not granted');
      }
    } catch (err) {
      console.log("Exception raised")
    }
  };
  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission();
  }, [])
  return <Navigation />
}