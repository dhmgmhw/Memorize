import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';

const diviceWidth = Dimensions.get('window').width;

export default function CardComponent({ navigation, content }) {
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
          <View style={styles.cardDesc}>
            <Text style={styles.cardDate}>{content.title}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    backgroundColor: '#f9e8e9',
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderRadius: 10,
  },
  cardBox: {
    width: diviceWidth * 0.9,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  cardDesc: {
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#B5AEA8',
    width: 130,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    top: 373,
    left: 242,
  },
  cardImage: {
    width: diviceWidth * 0.9,
    height: diviceWidth * 0.9,
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardDate: {
    marginTop: 10,
    height: 25,
    fontSize: 15,
    fontWeight: '700',
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    color: '#2B272A',
  },
});
