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

export default function CardComponent2({ navigation, content }) {
  const goDetail = () =>
    navigation.navigate('DetailPage', { content: content });

  let saverImage = content.image;
  let saverDate = content.formattedDate;

  return (
    <>
      <View style={styles.cardBox}>
        <View style={styles.headerView}>
          <Image
            style={styles.cardImage}
            resizeMode='contain'
            source={require('../assets/logo.png')}
          />
        </View>
        <StatusBar style='black' />
        <View style={styles.card}>
          <TouchableOpacity onPress={goDetail}>
            <ImageBlurLoading
              style={styles.cardImage}
              withIndicator
              thumbnailSource={{ uri: saverImage }}
              source={{ uri: saverImage }}
            />
          </TouchableOpacity>
          <View style={styles.cardDesc}>
            <Text style={styles.cardDate}>{saverDate}</Text>
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.master2}>
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
        </ScrollView>
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
