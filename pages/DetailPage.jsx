import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';

const diviceWidth = Dimensions.get('window').width;

export default function DetailPage({ navigation, route }) {
  const content = route.params.content;
  return (
    <View style={styles.container}>
      <StatusBar style='black' />
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>{content.title}</Text>
      </View>
      <View style={styles.innerBox}>
        <ScrollView style={styles.innerScrollBox}>
          <Text style={styles.innerStory}>{content.desc}</Text>
        </ScrollView>
        <Text style={styles.innerDate}>{content.formattedDate}</Text>
      </View>
      <View style={styles.imageBox}>
        <ImageBlurLoading
          style={styles.cardImage}
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B08C8E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    flex: 4,
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 70,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  innerBox: {
    flex: 10,
    backgroundColor: '#f9e8e9',
    width: diviceWidth,
    height: 800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerScrollBox: {
    marginTop: 280,
  },
  cardImage: {
    width: diviceWidth * 0.9,
    height: diviceWidth * 0.9,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  imageBox: {
    position: 'absolute',
    top: 120,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  innerStory: {
    paddingHorizontal: 35,
    fontSize: 18,
    lineHeight: 28,
  },
  innerDate: {
    height: 80,
    fontSize: 17,
    fontWeight: '700',
    paddingTop: 10,
  },
});
