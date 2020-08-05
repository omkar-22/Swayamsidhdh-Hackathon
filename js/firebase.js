import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCaCT9z5LBuPxE2tjcREca5yDyTN0Em1aA",
  authDomain: "sth-2020.firebaseapp.com",
  databaseURL: "https://sth-2020.firebaseio.com",
  projectId: "sth-2020",
  storageBucket: "sth-2020.appspot.com",
  messagingSenderId: "917485156489",
  appId: "1:917485156489:web:af3c8ff6efb5c603ad6e58"
};

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export default firebase
