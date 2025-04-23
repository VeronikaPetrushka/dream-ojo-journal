import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import decipherDreams from '../appConstants/decipherDreams';

const { height } = Dimensions.get('window');

const Decipher = () => {
    const navigation = useNavigation();
    const [play, setPlay] = useState(false);
    const [randomDream, setRandomDream] = useState(null);
    const [selectedDreams, setSelectedDreams] = useState([]);
    const [check, setCheck] = useState(false);
    const [resultText, setResultText] = useState(null);
    const [savedDreams, setSavedDreams] = useState([]);

    useEffect(() => {
        loadDecipherSaved();
    }, [savedDreams]);

    const resetDreams = () => {
        setSelectedDreams([]);
        setCheck(false);
        getRandomDream();
        setResultText(null);
    };

    const resetDecipher = () => {
        setPlay(false);
        setSelectedDreams([]);
        setCheck(false);
        setRandomDream(null);
        setResultText(null);
    }; 

    const getRandomDream = () => {
        const random = decipherDreams[Math.floor(Math.random() * decipherDreams.length)];
        setRandomDream(random);
    };

    const handleOptionPress = (option) => {
        if (selectedDreams.includes(option)) {
            setSelectedDreams(selectedDreams.filter((dream) => dream !== option));
        } else if (selectedDreams.length < 3) {
            setSelectedDreams((prev) => [...prev, option]);
        }
    };

    const handleCheckDreams = () => {
        const sortedSelection = [...selectedDreams].sort().join(',');

        const match = randomDream.check.find((entry) =>
            [...entry.selected].sort().join(',') === sortedSelection
        );

        if (match && match.resultText) {
            setResultText(match.resultText);
        } else {
            setResultText("No interpretation found for this combination. Try another path. 🌫️🔍");
        }

        setCheck(true);
    };

    const loadDecipherSaved = async () => {
        const stored = await AsyncStorage.getItem('savedDreams');
        stored && setSavedDreams(JSON.parse(stored));
    };

    const toggleSaveDream = async () => {
        if (!resultText || resultText.trim() === '') return;

        const exists = savedDreams.includes(resultText.trim());
        let updated;

        if (exists) {
            updated = savedDreams.filter((item) => item !== resultText.trim());
        } else {
            updated = [...savedDreams, resultText.trim()];
        }

        setSavedDreams(updated);
        await AsyncStorage.setItem('savedDreams', JSON.stringify(updated));
    };

    const isFavoriteDream = () => {
        return savedDreams.includes(resultText?.trim());
    };

    return (
        <View style={{ flex: 1 }}>

            {
                play ? (
                    <View style={{ width: '100%', flexGrow: 1 }}>
                        {
                            check ? (
                                <View style={{ width: '100%', flexGrow: 1 }}>
                                    <View style={{width: '100%', height: 226, marginTop: height * 0.1, marginBottom: height * 0.1}}>
                                        <Text style={styles.resultText}>{resultText}</Text>
                                        <Image source={require('../appAssets/decor/dreamResult.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                                    </View>
                                    <TouchableOpacity style={[styles.savedBtn, {alignSelf: 'center'}, isFavoriteDream() && {backgroundColor: '#888', shadowColor: '#d5d4d4'}]} onPress={toggleSaveDream}>
                                        <Text style={styles.savedBtnText}>{isFavoriteDream() ? 'Saved in “Night trail”' : 'Save it to “Night trail”'}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.row, {justifyContent: 'center'}]}>
                                        <TouchableOpacity
                                            onPress={resetDreams}>
                                            <Image
                                                source={require('../appAssets/decor/resetDreams.png')}
                                                style={{ width: 90, height: 90, resizeMode: 'contain', marginRight: 10 }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={resetDecipher}>
                                            <Image
                                                source={require('../appAssets/decor/resetDecipher.png')}
                                                style={{ width: 90, height: 90, resizeMode: 'contain' }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={{ width: '100%', flexGrow: 1 }}>
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end' }}
                                        onPress={resetDecipher}>
                                        <Image
                                            source={require('../appAssets/decor/resetDecipher.png')}
                                            style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: height * 0.03 }}
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.dreamContainer}>
                                        <Text style={styles.dreamPhrase}>{randomDream.phrase}</Text>
                                        <View style={styles.row}>
                                            {
                                                randomDream.options.map((option, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={[styles.optionBtn, selectedDreams.some((d) => d === option) && {borderColor: '#e349ff'}]}
                                                        onPress={() => handleOptionPress(option)}
                                                    >
                                                        <Text style={styles.optionBtnText}>{option}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={{ position: 'absolute', bottom: height * 0.15, alignSelf: 'center' }}
                                        onPress={handleCheckDreams}
                                        disabled={selectedDreams.length !== 3}
                                    >
                                        <Image
                                            source={selectedDreams.length === 3 ? require('../appAssets/decor/check-active.png')
                                                : require('../appAssets/decor/check.png')}
                                            style={{width: height * 0.09, height: height * 0.09}}
                                        />
                                    </TouchableOpacity>
                                </View>  
                            )
                        }
                    </View>
                ) : (
                    <View style={{width: '100%', flexGrow: 1}}>
                        <TouchableOpacity style={styles.savedBtn} onPress={() => navigation.navigate('DecipherSavedRoute')}>
                            <Text style={styles.savedBtnText}>Night trail</Text>
                        </TouchableOpacity>
                            
                        <Text style={styles.title}>Decipher the dream</Text>
                        
                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: height * 0.25, alignSelf: 'center' }}
                            onPress={() => { setPlay(true); getRandomDream();}}>
                            <Image
                                source={require('../appAssets/decor/play.png')}
                                style={{ width: height * 0.19, height: height * 0.19, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
            
        </View>
    )
};

const styles = StyleSheet.create({

    title: {
        fontSize: 55,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
    },

    savedBtn: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#e349ff',
        alignSelf: 'flex-end',
        marginBottom: 28,
        shadowColor: '#9800b3',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 0
    },

    savedBtnText: {
        fontSize: 16,
        lineHeight: 31,
        fontWeight: '900',
        color: '#fff',
    },

    dreamContainer: {
        width: '100%',
        backgroundColor: '#4f2bb0',
        borderRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 28
    },

    dreamPhrase: {
        fontSize: 25,
        lineHeight: 31,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 25
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%'
    },

    optionBtn: {
        width: '48%',
        padding: height * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 9,
        shadowColor: '#d5d4d4',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        borderWidth: 6,
        shadowRadius: 0,
        borderColor: '#fff'
    },

    optionBtnText: {
        fontSize: 16,
        lineHeight: 31,
        fontWeight: '900',
        color: '#000',
    },

    resultText: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '600',
        color: '#000',
        position: 'absolute',
        top: 22,
        left: 36,
        width: 300,
        zIndex: 10
    }

});

export default Decipher;