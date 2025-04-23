import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const DairyDetails = ({ item }) => {
    const navigation = useNavigation();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const deleteDream = async () => {
        try {
            const storedDreams = await AsyncStorage.getItem('dreams');
            const dreams = storedDreams ? JSON.parse(storedDreams) : [];

            const updatedDreams = dreams.filter((dream) => dream.id !== item.id);

            await AsyncStorage.setItem('dreams', JSON.stringify(updatedDreams));
            navigation.goBack();
        } catch (error) {
            alert('Error deleting the dream');
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../appAssets/icons/back.png')} style={{width: 42, height: 42}} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddDairyRoute', {item})}>
                        <Image source={require('../appAssets/icons/edit.png')} style={{width: 42, height: 42, marginRight: 10}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDeleteModalOpen(true)}>
                        <Image source={require('../appAssets/icons/delete.png')} style={{width: 42, height: 42}} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image
                source={require('../appAssets/decor/dreamDetails.png')}
                style={{ width: '100%', height: height * 0.24, resizeMode: 'contain', marginBottom: 14 }}
            />

            <ScrollView style={{ width: '100%' }}>

                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.label}>Date</Text>
                <Text style={styles.text}>{item.date}</Text>

                <Text style={styles.label}>Description</Text>
                <Text style={styles.text}>{item.description}</Text>

                <Text style={styles.label}>Sleep mood</Text>
                <View style={styles.box}>
                    <Text style={styles.tag}>{item.mood}</Text>
                </View>

                {
                    item.tags.length > 0 && (
                        <>
                            <Text style={styles.label}>Tags</Text>
                            <View style={[styles.row, {marginBottom: 0, justifyContent: 'flex-start'}]}>
                                {
                                    item.tags.map((tag, idx) => (
                                        <View key={idx} style={styles.box}>
                                            <Text style={styles.tag}>{tag}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </>
                    )
                }

            </ScrollView>

            <Modal
                animationType="fade"
                transparent
                visible={deleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
            >
                <View style={styles.modalLayout}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Are you sure?</Text>
                        <Text style={styles.modalText}>Are you sure you want to go out and delete it?</Text>
                        <View style={[styles.row, {marginBottom: 0}]}>
                            <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#fff'}]} onPress={() => setDeleteModalOpen(false)}>
                                <Text style={[styles.modalBtnText, {color: '#000'}]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#ff0000'}]} onPress={deleteDream}>
                                <Text style={[styles.modalBtnText, {color: '#fff'}]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
};

const styles = StyleSheet.create({

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 21,
        flexWrap: 'wrap'
    },

    name: {
        fontSize: 25,
        lineHeight: 28,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 16
    },

    label: {
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 2
    },

    text: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12
    },

    box: {
        paddingVertical: 6.5,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#4f2bb0',
        marginRight: 5,
        marginBottom: 5
    },

    tag: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '400',
        color: '#fff',
    },

    modalLayout: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalContainer: {
        width: '85%',
        borderRadius: 12,
        backgroundColor: '#4f2bb0',
        padding: 20
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12
    },

    modalText: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 20
    },

    modalBtn: {
        width: '47%',
        borderRadius: 7,
        padding: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalBtnText: {
        fontSize: 15,
        fontWeight: '700',
    }

});

export default DairyDetails;