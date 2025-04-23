import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Switch, Linking } from 'react-native';

const { height } = Dimensions.get('window');

const OjoSettings = () => {
    const [silenceMode, setSilenceMode] = useState(true);
    const [notificationsOn, setNotificationsOn] = useState(true);

    const openOjoPrivacy = () => {
        Linking.openURL('https://your-privacy-policy-url.com').catch((err) =>
            alert("Failed to open privacy policy:", err)
        );
    };
    
    return (
        <View style={{ flex: 1 }}>

            <Text style={styles.title}>Settings</Text>

            <Image source={require('../appAssets/decor/nothing.png')} style={styles.image} />

            <ScrollView style={{ width: '100%' }}>

                <View style={styles.button}>
                    <Text style={styles.buttonText}>Night silence mode</Text>
                    <Switch value={silenceMode} onValueChange={() => setSilenceMode((prev) => !prev)} thumbColor="#fff" trackColor={{ false: "#fff", true: "#e349ff" }} />
                </View>
                <Text style={styles.hint}>disabling notifications and sounds after 22:00</Text>

                <View style={styles.button}>
                    <Text style={styles.buttonText}>Notifications</Text>
                    <Switch value={notificationsOn} onValueChange={() => setNotificationsOn((prev) => !prev)} thumbColor="#fff" trackColor={{ false: "#fff", true: "#e349ff" }} />
                </View>

                <View style={styles.button}>
                    <Text style={styles.buttonText}>Privacy Policy</Text>
                    <TouchableOpacity onPress={openOjoPrivacy}>
                        <Image source={require('../appAssets/icons/settings.png')} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                </View>

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

    image: {
        width: '100%',
        height: height * 0.19,
        resizeMode: 'contain',
        marginBottom: 10
    },

    button: {
        width: '100%',
        paddingVertical: 11,
        paddingHorizontal: 12,
        backgroundColor: '#4f2bb0',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 7
    },

    buttonText: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '400',
        color: '#fff'
    },

    hint: {
        fontSize: 11,
        lineHeight: 20,
        fontWeight: '300',
        color: '#fff',
        marginBottom: 10
    }

});

export default OjoSettings;