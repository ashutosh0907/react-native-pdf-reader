import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Pdf from 'react-native-pdf';
import { HEIGHT, WIDTH } from '../constants/config';
const Pdfreader = () => {
    const [view, setView] = useState(false)
    const source = { uri: 'file:///storage/emulated/0/Download/downloaded.pdf' };
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 25
        }}>
            <View style={{
                width: WIDTH,
                height: HEIGHT * 0.08,
                backgroundColor: 'white',
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexDirection: 'row'
            }}>
                <View style={{
                    width: WIDTH * 0.7,
                    height: HEIGHT * 0.08,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                        paddingLeft: 10
                    }}>Pdf Reader</Text>
                </View>
                <View style={{
                    width: WIDTH * 0.3,
                    height: HEIGHT * 0.08,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setView(!view)
                        }}
                        style={{
                            width: WIDTH * 0.2,
                            height: HEIGHT * 0.05,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'gray',
                            marginRight: 10,
                            borderRadius: 5
                        }}>
                        <View>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>Change</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            <Pdf
                trustAllCerts={false}
                source={source}
                horizontal={view}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
export default Pdfreader