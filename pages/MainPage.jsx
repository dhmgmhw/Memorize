import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import CardComponent from '../components/CardComponent';
import PhotoCardComponent from '../components/PhotoCardComponent';
import { getData } from '../config/firebaseFunctions';

const diviceWidth = Dimensions.get('window').width;

export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const readyData = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    readyData();
  }, []);

  return (
    <>
      <View style={styles.headerView}>
        <Image
          style={styles.cardImage}
          resizeMode='contain'
          source={require('../assets/logo.png')}
        />
      </View>
      <StatusBar style='black' />
      <ScrollView
        horizontal={true}
        style={styles.master1}
        showsHorizontalScrollIndicator={false}>
        {data.map((content, i) => {
          return (
            <CardComponent content={content} key={i} navigation={navigation} />
          );
        })}
      </ScrollView>
      <ScrollView
        horizontal={true}
        style={styles.master2}
        showsHorizontalScrollIndicator={false}>
        {data.map((content, i) => {
          return (
            <PhotoCardComponent
              content={content}
              key={i}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  master1: {
    backgroundColor: '#B08C8E',
    height: '45%',
    paddingTop: 10,
  },
  master2: {
    backgroundColor: '#B08C8E',
    paddingTop: 10,
  },
  cardImage: {
    alignSelf: 'center',
    width: 170,
    height: 100,
  },
  headerView: {
    backgroundColor: '#B08C8E',
    paddingTop: 80,
  },
});
