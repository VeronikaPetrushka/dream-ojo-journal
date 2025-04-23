import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const DecipherSaved = () => {
    const navigation = useNavigation();
    const [savedDreams, setSavedDreams] = useState([]);
    const [selectedDream, setSelectedDream] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        loadDecipherSaved();
    }, []);

    const loadDecipherSaved = async () => {
        const stored = await AsyncStorage.getItem('savedDreams');
        stored && setSavedDreams(JSON.parse(stored));
    };

    const toggleSaveDream = async () => {
        if (!selectedDream || selectedDream.trim() === '') return;

        const updated = savedDreams.filter((item) => item !== selectedDream.trim());
        setSavedDreams(updated);
        await AsyncStorage.setItem('savedDreams', JSON.stringify(updated));
        setDeleteModalOpen(false);
        setSelectedDream(null);
    };


    return (
        <View style={{ flex: 1 }}>

            <Text style={styles.title}>OJO Night trail</Text>

            <TouchableOpacity style={{ position: 'absolute', top: -10, left: 0}} onPress={() => navigation.goBack('')}>
                <Image source={require('../appAssets/icons/back.png')} style={{width: 42, height: 42}} />
            </TouchableOpacity>

            {
                savedDreams.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        {
                            savedDreams.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dreamCard}
                                    onPress={() => { setSelectedDream(item); setDeleteModalOpen(true)}}
                                    >
                                    <Text style={styles.dreamCardText}>{item}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                ) : (
                        <View style={styles.nothingContainer}>
                            <Text style={styles.nothingTitle}>There's nothing here yet</Text>
                            <Image source={require('../appAssets/decor/nothing.png')} style={styles.nothingImage} />
                        </View>
                )
            }

            <Modal
                animationType="fade"
                transparent
                visible={deleteModalOpen}
                onRequestClose={() => {setSelectedDream(null); setDeleteModalOpen(false)}}
            >
                <View style={styles.modalLayout}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Are you sure?</Text>
                        <Text style={styles.modalText}>Are you sure you want to go out and delete it?</Text>
                        <View style={[styles.row, {marginBottom: 0}]}>
                            <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#fff'}]} onPress={() => {setSelectedDream(null); setDeleteModalOpen(false)}}>
                                <Text style={[styles.modalBtnText, {color: '#000'}]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#ff0000'}]} onPress={toggleSaveDream}>
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

    title: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 28,
        textAlign: 'center'
    },

    dreamCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10
    },

    dreamCardText: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '600',
        color: '#000',
    },

    nothingContainer: {
        width: '100%',
        backgroundColor: '#4f2bb0',
        borderRadius: 15,
        padding: 16,
        alignItems: 'center'
    },

    nothingTitle: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center'
    },

    nothingImage: {
        width: '100%',
        height: height * 0.19,
        resizeMode: 'contain',
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
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 21,
        flexWrap: 'wrap'
    },

});

export default DecipherSaved;