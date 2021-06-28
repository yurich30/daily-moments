import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAMLKbxVYpE0h6Xz8z49beAZhiyjv8FdUE",
    authDomain: "daily-moments-d4917.firebaseapp.com",
    projectId: "daily-moments-d4917",
    storageBucket: "daily-moments-d4917.appspot.com",
    messagingSenderId: "319408579531",
    appId: "1:319408579531:web:efff6210e42b5407488c4e",
    measurementId: "G-BMEFKL985H"
  }

const app = firebase.initializeApp(firebaseConfig)
export const auth =  app.auth()
export const firestore = app.firestore()