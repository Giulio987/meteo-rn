import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const BackBtn = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={handleGoBack}>
      <Image source={require('../assets/arrow-left.png')}></Image>
    </Pressable>
  );
};

export default BackBtn;

const styles = StyleSheet.create({});
