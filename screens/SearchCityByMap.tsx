import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const SearchCityByMap = () => {
  const [marker, setMarker] = useState<any>(); //TODO fix any
  const handleAddMarker = (e: any) => {
    //TODO fix any
    setMarker({
      latlng: e.nativeEvent.coordinate,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={handleAddMarker}>
        {marker && <Marker coordinate={marker.latlng} />}
      </MapView>
    </View>
  );
};

export default SearchCityByMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
