import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';


const FlatlistPage = () => {

    const [selectedItems, setSelectedItems] = useState([]);


    const handleItemSelection = (itemId) => {
        // Check if the item is already selected
        const isSelected = selectedItems.includes(itemId);
        // If the item is selected, remove it from the selection
        if (isSelected) {
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((item) => item !== itemId)
            );
        } else {
            // If the item is not selected, add it to the selection
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
        }
    };


    // Custom renderItem function to render the flatlist items
    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item.id);
        return (
            <TouchableOpacity
                style={[styles.itemContainer, isSelected && styles.selectedItem]}
                onPress={() => handleItemSelection(item.id)}
            >
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    // Dummy data for the flatlist
    const data = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
        { id: '5', name: 'Item 5' },
        { id: '6', name: 'Item 6' },
        { id: '7', name: 'Item 7' },
        // Add more items as needed
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}

// Styles for the flatlist items
const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 1
    },
    selectedItem: {
        borderColor: 'green', // Change the border color for selected items
        borderWidth: 1,
        backgroundColor: 'lightgreen'
    },
    itemText: {
        fontSize: 16,
    },
});


export default FlatlistPage