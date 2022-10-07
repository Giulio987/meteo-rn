import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../styles/Fonts';
import Colors from '../styles/Colors';

interface AddCityBtnProps {
  hideText?: boolean;
}

const AddCityBtn = () => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => {}}
      >
        <Image source={require('../assets/Plus.png')}></Image>
        <Text style={styles.text}>Aggiungi città</Text>
      </Pressable>
    </View>
  );
};

export default AddCityBtn;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    height: 64,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.semiBold,
    color: Colors.primary.main,
    lineHeight: 30,
    fontSize: 20,
    marginLeft: 15,
  },
  pressed: {
    opacity: 0.5,
  },
});
