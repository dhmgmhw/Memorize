import * as firebase from "firebase";
import "firebase/firestore";
import {
    Alert
} from "react-native";

export async function addDiary(content) {
    try {
        const db = firebase.firestore();
        await db.collection('diary').doc(content.date + "D").set(content);
        return true
    } catch (err) {
        Alert.alert("글 작성에 문제가 있습니다! ", err.message)
        return false
    }
}

export async function imageUpload(blob, date) {
    const storageRef = firebase
        .storage()
        .ref()
        .child('diary/' + date);
    const snapshot = await storageRef.put(blob);
    const imageUrl = await snapshot.ref.getDownloadURL();
    blob.close();

    return imageUrl;
}

export async function getData() {
    try {
        const db = firebase.firestore();
        const snapshot = await db.collection('diary').get();
        let data = [];
        snapshot.docs.map((doc) => {
            data.push(doc.data());
        });
        return data;
    } catch (err) {
        console.log(err);
        return false;
    }
}