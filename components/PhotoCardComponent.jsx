import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';

const diviceWidth = Dimensions.get('window').width;

export default function PhotoCardComponent({ navigation, content }) {
  const goDetail = () =>
    navigation.navigate('DetailPage', { content: content });

  return (
    <>
      <View style={styles.cardBox}>
        <View style={styles.card}>
          <TouchableOpacity onPress={goDetail}>
            <ImageBlurLoading
              style={styles.cardImage}
              withIndicator
              thumbnailSource={{ uri: content.image }}
              source={{ uri: content.image }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: '#f9e8e9',
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardBox: {
    width: diviceWidth * 0.2,
    marginHorizontal: 15,
  },
  cardImage: {
    width: diviceWidth * 0.2,
    height: diviceWidth * 0.2,
    backgroundColor: 'grey',
  },
});
