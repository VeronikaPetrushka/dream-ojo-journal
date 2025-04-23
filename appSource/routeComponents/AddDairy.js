import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const AddDiary = ({ item }) => {
    const navigation = useNavigation();
    const [name, setName] = useState(item?.name || null);
    const [description, setDescription] = useState(item?.description || null);
    const [mood, setMood] = useState(item?.mood || null);
    const [tags, setTags] = useState(item?.tags || ['']);

    const sleepMoods = ['Anxious', 'Vivid', 'Slow', 'Empty'];

    const handleTagChange = (text, index) => {
        const updated = [...tags];
        updated[index] = text;
        setTags(updated);
    };

    const handleRemoveTag = (index) => {
        if (index === 0) {
        const updated = [...tags];
        updated[0] = '';
        setTags(updated);
        } else {
        setTags(tags.filter((_, i) => i !== index));
        }
    };

    const handleAddTag = () => {
        setTags([...tags, '']);
    };

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [dreamDate, setDreamDate] = useState(item && parseDate(item?.dreamDate) || new Date());

    const formattedDreamDate = `${dreamDate.getDate().toString().padStart(2, "0")}.${(dreamDate.getMonth() + 1).toString().padStart(2, "0")}.${dreamDate.getFullYear()}`;

    const handleAddDream = async () => {
        try {
            const storedDreams = await AsyncStorage.getItem('dreams');
            const dreams = storedDreams ? JSON.parse(storedDreams) : [];

            const newDream = {
                id: item?.id || Date.now(),
                date: formattedDreamDate,
                name,
                description,
                mood,
                tags: tags.filter(tag => tag.trim() !== '')
            };

            let updatedDreams;

            if (item?.id) {
                updatedDreams = dreams.map((v) =>
                    v.id === item.id ? newDream : v
                );
            } else {
                updatedDreams = [...dreams, newDream];
            }

            await AsyncStorage.setItem('dreams', JSON.stringify(updatedDreams));
            navigation.navigate('DreamDairyRoute');
        } catch (error) {
            alert('Error saving your dream');
        }
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../appAssets/icons/back.png')} style={{width: 42, height: 42}} />
                </TouchableOpacity>
                <Text style={styles.title}>{item ? 'Edit dream' : 'Add dream'}</Text>
                <TouchableOpacity
                    onPress={handleAddDream}
                    disabled={!dreamDate || !name || !description || !mood}
                >
                    <Text
                        style={[styles.saveBtnText,
                            (!dreamDate || !name || !description || !mood) && { color: 'rgba(255, 255, 255, 0.5)' }]}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>

            <DateTimePicker 
                value={item ? new Date(dreamDate) : dreamDate} 
                mode="date" 
                display="spinner" 
                themeVariant="dark"
                onChange={(event, selectedDate) => {
                    if (selectedDate) {
                    setDreamDate(selectedDate);
                    }
                }}
                style={{alignSelf: 'center'}}
            />

            <ScrollView style={{ width: '100%' }}>
                {
                    name && <Text style={styles.label}>Name</Text>
                }
                <View style={{width: '100%', flexDirection: 'row'}}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder='Name'
                        placeholderTextColor={'#6c41df'}
                    />
                    {
                        name && (
                            <TouchableOpacity style={{position: 'absolute', top: 13, right: 13, zIndex: 10}} onPress={() => setName(null)}>
                                <Image source={require('../appAssets/icons/resetInput.png')} style={{width: 24, height: 24, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        )
                    }
                </View>

                {
                    description && <Text style={styles.label}>Description</Text>
                }
                <View style={{width: '100%', flexDirection: 'row'}}>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Description'
                        placeholderTextColor={'#6c41df'}
                        multiline
                    />
                    {
                        description && (
                            <TouchableOpacity style={{position: 'absolute', top: 13, right: 13, zIndex: 10}} onPress={() => setDescription(null)}>
                                <Image source={require('../appAssets/icons/resetInput.png')} style={{width: 24, height: 24, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        )
                    }
                </View>

                <Text style={styles.label}>Sleep mood</Text>
                <View style={[styles.row, {marginBottom: 5, justifyContent: 'flex-start'}]}>
                    {
                        sleepMoods.map((m, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={[styles.moodBtn, mood === m && { backgroundColor: '#e349ff' }]}
                                onPress={() => mood===m ? setMood(null) : setMood(m)}
                            >
                                <Text style={[styles.moodBtnText, mood===m && {fontWeight: '700'}]}>{m}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <Text style={styles.label}>Tags</Text>
                <View style={[styles.row, {marginBottom: 0, justifyContent: 'flex-start', flexWrap: 'wrap'}]}>
                    {tags.map((tag, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginRight: 5 }}>
                            <TextInput
                                style={[styles.input, {width: 140}]}
                                value={tag}
                                onChangeText={(text) => handleTagChange(text, index)}
                                placeholder="Tag"
                                placeholderTextColor="#6c41df"
                            />

                            {tag.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => handleRemoveTag(index)}
                                    style={{ position: 'absolute', top: 13, right: 13 }}
                                >
                                    <Image
                                        source={require('../appAssets/icons/resetInput.png')}
                                        style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleAddTag}>
                        <Image source={require('../appAssets/icons/addTag.png')} style={{width: 24, height: 24, marginBottom: 5}} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 21
    },

    title: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: '900',
        color: '#fff',
    },

    saveBtnText: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '900',
        color: '#e349ff',
    },

    label: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 2
    },

    input: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingRight: 45,
        borderRadius: 12,
        backgroundColor: '#4f2bb0',
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 5
    },

    moodBtn: {
        paddingVertical: 6.5,
        paddingHorizontal: 20,
        borderRadius: 9,
        backgroundColor: '#4f2bb0',
        marginRight: 5
    },

    moodBtnText: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '400',
        color: '#fff',
    }

});

export default AddDiary;