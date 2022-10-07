import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';

const Card = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style: ViewStyle;
}) => {
  //PASSARE UN PROP PER IL BACKGRUND COLOR LINEAR GRADIENT
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#0000002b',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
    width: 175,
    padding: 20,
  },
});
