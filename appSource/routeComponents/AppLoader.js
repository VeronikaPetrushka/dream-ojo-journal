import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const AppLoader = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                navigation.navigate('DreamDairyRoute');
            }, 1000);
        });
    }, []);

    return (
        <LinearGradient colors={['#141D76', '#BA21A3']} style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Animated.Image
                    source={require('../appAssets/loaders/logo.png')}
                    style={{ width: width, height: width, opacity: fadeAnim }}
                />
            </View>
        </LinearGradient>
    )
};

export default AppLoader;