import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

interface CityInputProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const CityInput = () => {
  //{ isModalOpen, onClose }: CityInputProps
  return (
    <View style={{ flex: 1, padding: 100 }}>
      <Text>Inserisci la città</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default CityInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});
