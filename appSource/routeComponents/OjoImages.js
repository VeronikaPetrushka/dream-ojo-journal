import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ojoImages from '../appConstants/ojoImages';

const { height } = Dimensions.get('window');

const OjoImages = () => {
    const navigation = useNavigation();
    const [ojoFavorites, setOjoFavorites] = useState([]);
    const [randomCard, setRandomCard] = useState(null);

    const flatCards = ojoImages.flatMap(section =>
        section.cards.map(card => ({ ...card, type: section.type }))
    );

    useEffect(() => {
        loadFavorites();
        pickRandomCard();
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

    const pickRandomCard = () => {
        const random = flatCards[Math.floor(Math.random() * flatCards.length)];
        setRandomCard(random);
    };

    return (
        <View style={{ flex: 1 }}>

            <Text style={styles.title}>OJO Images</Text>

            <TouchableOpacity style={{ position: 'absolute', top: -10, right: 0}} onPress={() => navigation.navigate('OjoFavoritesRoute')}>
                <Image source={require('../appAssets/icons/favorite.png')} style={{width: 42, height: 42}} />
            </TouchableOpacity>

            <Text style={styles.subTitle}>Image of The day</Text>

            <ScrollView style={{ width: '100%' }}>
                {
                    randomCard && (
                        <View style={{width: '100%'}}>
                            <View style={[styles.cardContainer, randomCard.type !== 'big' && {padding: 10}]}>
                                <TouchableOpacity style={{ position: 'absolute', top: 15, right: 15, zIndex: 10}} onPress={() => toggleOjoFavorites(randomCard)}>
                                    <Image
                                        source={isFavorite(randomCard) ? require('../appAssets/icons/favorite.png')
                                            : require('../appAssets/icons/not-favorite.png')}
                                        style={{ width: 42, height: 42 }}
                                    />
                                </TouchableOpacity>
                                {
                                    randomCard.type === 'big' && (
                                        <View style={{width: '100%', height: height * 0.35}}>
                                            <Image
                                                source={randomCard.image}
                                                style={{ width: '100%', height: '100%', borderRadius: 21, resizeMode: 'cover' }}
                                            />
                                            <View style={[styles.cardTopicBox, {position: 'absolute', bottom: 15, left: 12}]}>
                                                <Text style={styles.cardTopic}>{randomCard.topic}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    randomCard.type === 'text' && (
                                        <View style={{width: '100%'}}>
                                            <Text style={styles.cardText}>{randomCard.text}</Text>
                                            <View style={styles.cardTopicBox}>
                                                <Text style={styles.cardTopic}>{randomCard.topic}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    randomCard.type === 'colors' && (
                                        <View style={{width: '100%'}}>
                                            <View style={styles.row}>
                                                {randomCard.colors.map((color, i) => (
                                                    <View key={i} style={[styles.cardColor, { backgroundColor: color }]} />
                                                ))}
                                            </View>
                                            <View style={styles.cardTopicBox}>
                                                <Text style={styles.cardTopic}>{randomCard.topic}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    randomCard.type === 'small' && (
                                        <View style={{width: '100%'}}>
                                            <Image
                                                source={randomCard.image}
                                                style={{ width: '100%', height: 163, borderRadius: 25, resizeMode: 'cover', marginBottom: 12 }}
                                            />
                                            <View style={styles.cardTopicBox}>
                                                <Text style={styles.cardTopic}>{randomCard.topic}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                            <View style={{width: '100%', height: 237, marginTop: 17}}>
                                <Image
                                    source={require('../appAssets/decor/ojoPhrase.png')}
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                />
                                <Text style={styles.cardPhrase}>{randomCard.phrase}</Text>
                            </View>
                        </View>
                    )
                }
                <View style={{ height: 120 }} />
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
        width: '100%'
    },

    subTitle: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 5,
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

    cardPhrase: {
        fontSize: 13,
        lineHeight: 22,
        fontWeight: '600',
        color: '#000', 
        position: 'absolute',
        top: 10,
        left: 12,
        width: 156,
        textAlign: 'center'
    }

});

export default OjoImages;