import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import Navigation from './src/navigation/Navigation';
import { Platform, PermissionsAndroid, AppState } from 'react-native'
import { request, PERMISSIONS } from 'react-native-permissions';

class App extends Component {
  constructor() {
    super();
  }
  async handleAppStateChange(nextAppState) {
    if (nextAppState === 'inactive') {
      console.log("inactive -------------->")
    }
    if (nextAppState === 'background') {
      console.log("removed -------------->")
      fetch('https://dummyjson.com/products/1')
        .then(res => res.json())
        .then(json => console.log(json))
    }
    if (nextAppState === 'active') {
      console.log("active -------------->")
      fetch('https://dummyjson.com/products/1')
        .then(res => res.json())
        .then(json => console.log(json))
    }
  }

  componentDidMount() {
    this.appStateChangeSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange
    );
    // console.log("appStateChangeSubscription -------> ", this.appStateChangeSubscription);
  }

  componentWillUnmount() {
    if (this.appStateChangeSubscription) {
      this.appStateChangeSubscription.remove();
    }
  }
  render() {
    return <Navigation />
  }

}

export default App;














// export default App = () => {
//   const [camerapermissionResult, setCameraPermissionResult] = useState('');
//   const [locationpermissionResult, setLocationPermissionResult] = useState('');

const requestCameraPermission = () => {
  request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
    setCameraPermissionResult(result)
    console.log(result);
  });
}

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//       if (granted === 'granted') {
//         console.log('granted');
//       } else {
//         console.log('Not granted');
//       }
//     } catch (err) {
//       console.log("Exception raised")
//     }
//   };
//   useEffect(() => {
//     requestCameraPermission();
//     requestLocationPermission();
//   }, [])
//   return <Navigation />
// }