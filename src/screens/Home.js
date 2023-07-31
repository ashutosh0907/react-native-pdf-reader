import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { BLACK, GRAY, GREEN, WHITE } from '../constants/color'
import { HEIGHT, MyStatusBar, WIDTH } from '../constants/config'
import { PROTIMELOGO, REUPLOAD, UPLOAD } from '../constants/imagepath'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import NetInfo from "@react-native-community/netinfo";


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [imageUri, setImageUri] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const data = [
        { id: '1', name: 'Apple' },
        { id: '2', name: 'Banana' },
        { id: '3', name: 'Cherry' },
        { id: '4', name: 'Date' },
        { id: '5', name: 'Ashu' },
        { id: '6', name: 'Ashut' },
        { id: '7', name: 'Ashutt' },
        { id: '8', name: 'Ashll' },
        { id: '9', name: 'Ashurr' },
    ];

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredItems = data.filter((item) =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredData(filteredItems);
    };

    // Function to handle item selection from the dropdown
    const handleSelectItem = (item) => {
        setSearchQuery(item.name);
        setFilteredData([]); // Hide the dropdown after selecting an item
    };

    // Function to render each item in the dropdown
    const renderDropdownItem = ({ item }) => (
        <View style={{
            backgroundColor: 'lightgrey',
            margin: 1,
            width: WIDTH * 0.9
        }}>
            <TouchableOpacity onPress={() => handleSelectItem(item)}>
                <Text style={{ padding: 10, color: 'black' }}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

    const captureImage = async () => {
        let options = {
            storageOption: {
                path: "images",
            },
            mediaType: "mixed",
            videoQuality: "medium",
            multiple: true, // Enable multiple image selection
        };
        launchCamera(options, async (response) => {
            console.log(response);
            if (response.didCancel) {
                // Handle cancelation
            } else {
                const selectedImages = response.assets.map((asset) => ({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName,
                    upload_status: false,
                }));
                setImageUri(selectedImages[0].uri);
            }
        }).catch((res) => { });
    };

    const uploadImage = (imageUri) => {
        const { Buffer } = require('buffer');
        const bufferObject = Buffer.from(imageUri);
        // const base64Image = bufferObject.toString('base64');
        console.log("----------Base64 Image : ", bufferObject, "-------------");
        getLatLong();
        internetTest();
        getCurrentDateTime();
    }

    const getLatLong = async () => {
        try {
            var latitude, longitude;
            // let permission = getObjByKey('permission');
            if (true) {
                Geolocation.getCurrentPosition(
                    position => {
                        if (position) {
                            latitude = position?.coords?.latitude;
                            longitude = position?.coords?.longitude;
                            setLatitude(latitude)
                            setLongitude(longitude)
                        }
                        console.log("latitude - > ", latitude, "longitude - > ", longitude);
                    },
                    (error) => {
                        Alert.alert("Turn on the Location");
                        console.log("Error in getting latitude longitude", error.code, "---", error.message)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        } catch (e) {
            Alert.alert('Turn on the Location');
            console.log(e);
        }
    }

    const internetTest = () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected !== true) {
                console.log("Connected : ", state.type);
            }
        });
    }

    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const date = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        console.log("Date : ", date, "Hours: ", hours, "Minutes: ", minutes, "Seconds: ", seconds);
    }



    return (
        <>
            <MyStatusBar backgroundColor='white' barStyle={'dark-content'} />
            <ScrollView contentContainerStyle={{ ...styles.mainView }}>
                <KeyboardAvoidingView>
                    <View style={{ ...styles.imageView }}>
                        <Image
                            style={{
                                width: WIDTH * 0.9,
                                height: HEIGHT * 0.12,
                            }}
                            resizeMode='center'
                            source={PROTIMELOGO} />
                    </View>
                    <View style={{
                        width: WIDTH * 0.9
                    }}>
                        <Text style={{ color: BLACK, fontSize: 20, fontWeight: '500' }}>
                            Due to connectivity issue
                        </Text>
                    </View>
                    <TouchableOpacity style={{
                        width: WIDTH * 0.9,
                        height: HEIGHT * 0.1,
                        backgroundColor: 'lightgrey',
                        marginVertical: HEIGHT * 0.01,
                        borderRadius: 6,
                        // justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                        }}>
                            <Image
                                tintColor={'#ba2525'}
                                style={{
                                    width: WIDTH * 0.3,
                                    height: HEIGHT * 0.1,
                                }}
                                resizeMode='center'
                                source={REUPLOAD} />
                        </View>
                        <View style={{
                            width: WIDTH * 0.6
                        }}>
                            <Text style={{ color: BLACK, fontSize: 17, fontWeight: '500' }}>
                                Click to Re-upload Image
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: WIDTH * 0.9, backgroundColor: WHITE, marginVertical: HEIGHT * 0.01 }}>
                        <Text style={{ color: BLACK, fontSize: 20, fontWeight: '500' }}>
                            Please upload image
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        captureImage();
                    }} style={{
                        width: WIDTH * 0.9,
                        height: HEIGHT * 0.2,
                        backgroundColor: 'lightgrey',
                        marginVertical: HEIGHT * 0.01,
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {
                            imageUri ? <Image
                                style={{
                                    width: WIDTH * 0.9,
                                    height: HEIGHT * 0.2,
                                    borderRadius: 6
                                }}
                                resizeMode='cover'
                                source={{ uri: imageUri }}

                            /> : <Image
                                style={{
                                    width: WIDTH * 0.6,
                                    height: HEIGHT * 0.16,
                                }}
                                resizeMode='contain'
                                source={UPLOAD}
                            />
                        }
                    </TouchableOpacity>
                    <View style={{ width: WIDTH * 0.9, backgroundColor: WHITE, marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => {
                            uploadImage(imageUri);
                        }} style={{
                            flexDirection: 'row',
                            backgroundColor: 'lightgrey',
                            width: WIDTH * 0.4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 6,
                            padding: 5,
                            alignSelf: 'flex-end'
                        }}>
                            <View style={{
                                width: WIDTH * 0.24,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}>
                                <Text style={{ color: BLACK, fontSize: 20, fontWeight: '500' }}>
                                    Upload
                                </Text>
                            </View>
                            <Image
                                style={{
                                    width: WIDTH * 0.15,
                                    height: HEIGHT * 0.05,
                                }}
                                resizeMode='contain'
                                source={UPLOAD} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: WIDTH * 0.9, backgroundColor: WHITE, }}>
                        <View style={{ width: WIDTH * 0.9, backgroundColor: WHITE, marginVertical: 10 }}>
                            <Text style={{ color: BLACK, fontSize: 20, fontWeight: '500' }}>
                                Search by name?
                            </Text>
                        </View>
                        <TextInput
                            style={{
                                borderColor: 'gray',
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                color: 'black',
                                marginBottom: 5,
                                backgroundColor: WHITE
                            }}
                            onChangeText={handleSearch}
                            value={searchQuery}
                            placeholder="Search"
                            placeholderTextColor={"black"}
                        />
                        {searchQuery.length > 0 && (
                            <View style={{
                                alignSelf: 'center',
                            }}>
                                <FlatList
                                    data={filteredData}
                                    renderItem={renderDropdownItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
}



const styles = StyleSheet.create({
    mainView: {
        // flex: 1,
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: WHITE,
        alignItems: 'center',
    },
    imageView: {
        backgroundColor: WHITE,
        width: WIDTH * 0.9,
        height: HEIGHT * 0.12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropdownView: {

    }
})

export default Home