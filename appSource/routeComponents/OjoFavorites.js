import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const OjoFavorites = () => {
    const navigation = useNavigation();
    const [ojoFavorites, setOjoFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const stored = await AsyncStorage.getItem('ojoFavorites');
        stored && setOjoFavorites(JSON.parse(stored));
    };

    const toggleOjoFavorites = async (card) => {
        const exists = ojoFavorites.some((item) => item.phrase === card.phrase);
        let updated;

        if (exists) {
        updated = ojoFavorites.filter((item) => item.phrase !== card.phrase);
        } else {
        updated = [...ojoFavorites, card];
        }

        setOjoFavorites(updated);
        await AsyncStorage.setItem('ojoFavorites', JSON.stringify(updated));
    };

    const isFavorite = (card) => {
        return ojoFavorites.some((item) => item.phrase === card.phrase);
    };

    return (
        <View style={{ flex: 1 }}>

            <Text style={styles.title}>OJO Favorites</Text>

            <TouchableOpacity style={{ position: 'absolute', top: -10, left: 0}} onPress={() => navigation.goBack('')}>
                <Image source={require('../appAssets/icons/back.png')} style={{width: 42, height: 42}} />
            </TouchableOpacity>

            <ScrollView style={{ width: '100%' }}>
                {
                    ojoFavorites.length > 0 ? (
                        <>
                            {
                                ojoFavorites.map((card, index) => (
                                        <View key={index} style={[styles.cardContainer, card.type !== 'big' && {padding: 10}]}>
                                            <TouchableOpacity style={{ position: 'absolute', top: 15, right: 15, zIndex: 10}} onPress={() => toggleOjoFavorites(card)}>
                                                <Image
                                                    source={isFavorite(card) ? require('../appAssets/icons/favorite.png')
                                                        : require('../appAssets/icons/not-favorite.png')}
                                                    style={{ width: 42, height: 42 }}
                                                />
                                            </TouchableOpacity>
                                            {
                                                card.type === 'big' && (
                                                    <View style={{width: '100%', height: height * 0.35}}>
                                                        <Image
                                                            source={card.image}
                                                            style={{ width: '100%', height: '100%', borderRadius: 21, resizeMode: 'cover' }}
                                                        />
                                                        <View style={[styles.cardTopicBox, {position: 'absolute', bottom: 15, left: 12}]}>
                                                            <Text style={styles.cardTopic}>{card.topic}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            {
                                                card.type === 'text' && (
                                                    <View style={{width: '100%'}}>
                                                        <Text style={styles.cardText}>{card.text}</Text>
                                                        <View style={styles.cardTopicBox}>
                                                            <Text style={styles.cardTopic}>{card.topic}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            {
                                                card.type === 'colors' && (
                                                    <View style={{width: '100%'}}>
                                                        <View style={styles.row}>
                                                            {card.colors.map((color, i) => (
                                                                <View key={i} style={[styles.cardColor, { backgroundColor: color }]} />
                                                            ))}
                                                        </View>
                                                        <View style={styles.cardTopicBox}>
                                                            <Text style={styles.cardTopic}>{card.topic}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                            {
                                                card.type === 'small' && (
                                                    <View style={{width: '100%'}}>
                                                        <Image
                                                            source={card.image}
                                                            style={{ width: '100%', height: 163, borderRadius: 25, resizeMode: 'cover', marginBottom: 12 }}
                                                        />
                                                        <View style={styles.cardTopicBox}>
                                                            <Text style={styles.cardTopic}>{card.topic}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        </View>
                                ))
                            }
                        </>
                    ) : (
                            <View style={styles.nothingContainer}>
                                <Text style={styles.nothingTitle}>There's nothing here yet</Text>
                                <Image source={require('../appAssets/decor/nothing.png')} style={styles.nothingImage} />
                            </View>
                    )
                }
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

    cardContainer: {
        backgroundColor: '#4f2bb0',
        borderRadius: 21,
        width: '100%',
        marginBottom: 16
    },

    cardText: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 5,
    },

    cardTopicBox: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 9,
        alignSelf: 'flex-start'
    },

    cardTopic: {
        fontSize: 13,
        lineHeight: 22,
        fontWeight: '400',
        color: '#fff', 
    },

    cardColor: {
        width: '49%',
        height: height * 0.17,
        borderRadius: 10
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8
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

});

export default OjoFavorites;