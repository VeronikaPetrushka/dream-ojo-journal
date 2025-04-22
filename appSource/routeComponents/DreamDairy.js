import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const DreamDairy = () => {
    const navigation = useNavigation();
    const [dreams, setDreams] = useState([]);

    const loadDreams = async () => {
        try {
            const storedDreams = await AsyncStorage.getItem('dreams');
            if (storedDreams) {
                setDreams(JSON.parse(storedDreams));
            }
        } catch (error) {
            console.error('Error loading dreams:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadDreams();
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>

            <Text style={styles.title}>Dream OJO Diary</Text>

            <ScrollView style={{width: '100%'}}>
                {
                    dreams.length > 0 ? (
                        <>
                            {
                                dreams.map((dream, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dreamCard}
                                        onPress={() => navigation.navigate('DairyDetailsRoute', { item: dream })}
                                    >
                                        <Text style={styles.dreamName}>{dream.name}</Text>
                                        <Text style={styles.dreamDate}>{dream.date}</Text>
                                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
                                            {
                                                dream.tags.length > 0 && dream.tags.map((tag, idx) => (
                                                    <View style={styles.dreamTagBox} key={idx}>
                                                        <Text style={styles.dreamTag}>{tag}</Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddDairyRoute')}>
                                <Text style={styles.addBtnText}>Add</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={styles.nothingContainer}>
                            <Text style={styles.nothingTitle}>You don't have a dream record yet</Text>
                            <Image source={require('../appAssets/decor/nothing.png')} style={styles.nothingImage} />
                            <Text style={styles.nothingText}>Click on the “Add” button to add a new sleep record</Text>
                            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddDairyRoute')}>
                                <Text style={styles.addBtnText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                <View style={{height: 120}} />
            </ScrollView>

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
        marginBottom: 16
    },

    nothingText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        color: '#6c41df',
        marginBottom: 16,
        textAlign: 'center'
    },

    addBtn: {
        width: '100%',
        borderRadius: 12,
        padding: 15,
        backgroundColor: '#e349ff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    addBtnText: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '800',
        color: '#fff',
    },

    dreamCard: {
        width: width - 40,
        backgroundColor: '#4f2bb0',
        borderRadius: 15,
        padding: 10,
        marginBottom: 5
    },

    dreamName: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '900',
        color: '#fff', 
        marginBottom: 5
    },

    dreamDate: {
        fontSize: 12,
        lineHeight: 22,
        fontWeight: '300',
        color: '#fff', 
        marginBottom: 5
    },

    dreamTagBox: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 9,
        marginRight: 5,
        marginBottom: 5
    },

    dreamTag: {
        fontSize: 13,
        lineHeight: 22,
        fontWeight: '400',
        color: '#fff', 
    }

});

export default DreamDairy;