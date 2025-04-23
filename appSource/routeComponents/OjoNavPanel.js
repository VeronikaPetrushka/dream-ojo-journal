import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const panel = [
    {
        icon: require('../appAssets/nav/dairy.png'),
        route: 'DreamDairyRoute'
    },
    {
        icon: require('../appAssets/nav/images.png'),
        route: 'OjoImagesRoute'
    },
    {
        icon: require('../appAssets/nav/decipher.png'),
        route: 'DecipherRoute'
    },
    {
        icon: require('../appAssets/nav/settings.png'),
        route: 'OjoSettingsRoute'
    },
];

const OjoNavPanel = () => {
    const navigation = useNavigation();
    const [focused, setFocused] = useState('DreamDairyRoute');

    const handleNavigate = (screen) => {
        setFocused(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unfollow = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setFocused(currentRoute);
        });

        return unfollow;
    }, [navigation]);

    return (
        <View style={styles.panel}>

            {
                panel.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.btn, focused === item.route && { backgroundColor: '#e349ff' }]}
                        onPress={() => handleNavigate(item.route)}
                    >
                        <Image
                            source={item.icon}
                            style={[{ width: '100%', height: '100%' },
                                focused === item.route && { tintColor: '#ff' }]}
                        />
                    </TouchableOpacity>
                ))
            }
            
        </View>
    )
};

const styles = StyleSheet.create({

    panel: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 100,
        padding: 5,
        backgroundColor: '#4f2bb0'
    },

    btn: {
        width: 49,
        height: 49,
        borderRadius: 100,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default OjoNavPanel;