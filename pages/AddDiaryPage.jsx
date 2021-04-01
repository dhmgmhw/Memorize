import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import 'firebase/firestore';

const loading = require('../assets/loader.gif');

const diviceWidth = Dimensions.get('window').width;
import { addDiary, imageUpload } from '../config/firebaseFunctions';

export default function AddDiaryPage({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const [image, setImage] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('게시글을 업로드하려면 사진첩 권한이 필요합니다.');
      }
    }
  };

  const upload = async () => {
    console.log('준비중...');
    setProgress(true);
    let date = new Date();
    let getTime = date.getTime();
    let formattedDate =
      date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    let data = {
      title: title,
      desc: content,
      image: image,
      date: getTime,
      formattedDate: formattedDate,
    };
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;
    console.log(date);
    let result = await addDiary(data);
    if (result) {
      Alert.alert('오늘도 고생 많으셨어요.');
      setTitle('');
      setContent('');
      setImage('');
      setImageUri('');
      setProgress(false);
      navigation.push('TabNavigator');
    } else {
      setProgress(false);
    }
  };

  const pickImage = async () => {
    console.log('이미지 선택');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });
    getImageUrl(imageData);
  };

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  return (
    <KeyboardAwareScrollView style={styles.viewMaker}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.viewMaker}>
          {progress == false ? null : (
            <Image source={loading} style={styles.progress} />
          )}

          <View style={styles.inputTitleBox}>
            <Text style={styles.inputTitleLabel}>당신의 하루를 들려주세요</Text>
            <TextInput
              style={styles.inputTitle}
              placeholder='. . . T i t l e'
              placeholderTextColor='#2B272A'
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View tyle={styles.inputImgBox}>
            {imageUri == '' || undefined ? (
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.imagePick}>
                <Ionicons style={styles.imageIcon} name={'camera'} size={80} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => pickImage()}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputDescBox}>
            <TextInput
              multiline
              style={styles.inputDiary}
              placeholder='. . . 당신의 하루를 들려주세요'
              placeholderTextColor='#2B272A'
              value={content}
              onChangeText={(text) => setContent(text)}
            />

            <TouchableOpacity style={styles.uploadBtn} onPress={() => upload()}>
              <Text style={styles.btnText}>등록합니다</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputTitleBox: {
    paddingTop: 70,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputTitleLabel: {
    fontSize: 25,
    fontWeight: '500',
    color: '#2B272A',
    marginBottom: 5,
  },
  inputTitle: {
    width: 300,
    height: 40,
    fontSize: 20,
    color: '#2B272A',
    borderRadius: 10,
    backgroundColor: '#B5AEA8',
    width: '100%',
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  viewMaker: {
    backgroundColor: '#B08C8E',
  },

  imagePick: {
    width: diviceWidth,
    height: diviceWidth,
    backgroundColor: '#2B272A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    color: '#B08C8E',
    borderColor: '#B08C8E',
    fontSize: 200,
    borderWidth: 10,
    borderRadius: 40,
    padding: 20,
  },
  imagePreview: {
    width: diviceWidth,
    height: diviceWidth,
  },
  inputDescBox: {
    paddingHorizontal: 20,
  },
  inputDiary: {
    width: '100%',
    height: 110,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: '600',
    padding: 15,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: '#B5AEA8',
    color: '#2B272A',
  },
  uploadBtn: {
    width: 180,
    height: 50,
    paddingTop: 3,
    backgroundColor: '#2B272A',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginVertical: 17,
    alignSelf: 'center',
  },
  btnText: {
    fontWeight: '200',
    fontSize: 16,
    color: '#F0B4B1',
    textAlign: 'center',
    marginVertical: 13,
  },
  progress: {
    borderWidth: 2,
    width: 70,
    height: 70,
    borderRadius: 100,
    position: 'absolute',
    top: 352,
    alignSelf: 'center',
    zIndex: 2,
  },
});
