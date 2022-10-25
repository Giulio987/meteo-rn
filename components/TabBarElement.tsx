import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface TabBarElementProps {
  imagePath: ImageSourcePropType;
  focused: boolean;
}

const TabBarElement = ({ imagePath, focused }: TabBarElementProps) => {
  return (
    <View style={styles.tabBarIconContainer}>
      <View style={styles.imageContainer}>
        <Image source={imagePath} style={{ alignSelf: 'center' }} />
      </View>
      {focused && (
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.primary.main,
            width: 71,
          }}
        />
      )}
    </View>
  );
};

export default TabBarElement;

const styles = StyleSheet.create({
  tabBarIconContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
});
