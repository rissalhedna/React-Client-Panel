import {createStore , combineReducers, compose} from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'


import {
    ReactReduxFirebase,
    firebaseReducer,
    reactReduxFirebase
  } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

//Reducers
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'


const firebaseConfig={
    apiKey: "AIzaSyDDAvkxvC8GcFUUZ1W4Aae7B2KyS4wZzV8",
    authDomain: "reactclientpanel-8b675.firebaseapp.com",
    databaseURL: "https://reactclientpanel-8b675.firebaseio.com",
    projectId: "reactclientpanel-8b675",
    storageBucket: "reactclientpanel-8b675.appspot.com",
    messagingSenderId: "370783054431",
    appId: "1:370783054431:web:6a247fc700ebca7ac289ea",
    measurementId: "G-G2CJ4Z47JT"
}
//react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//init firebase instance
firebase.initializeApp(firebaseConfig)

//init firestore
const firestore = firebase.firestore()


const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
})

//check for settings in local storage

if(localStorage.getItem('settings')===null){
    //default settings
    const defaultSettings = {
        disableBalanceOnAdd: false,
        disableBalanceOnEdit: false,
        allowRegistration: true
    }

    localStorage.setItem('settings',JSON.stringify(defaultSettings))
}

//create initial state
const initialState= {settings: JSON.parse(localStorage.getItem('settings'))}


//create store
const store = createStoreWithFirebase(rootReducer,initialState,compose(
    reactReduxFirebase(firebase),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store




// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDDAvkxvC8GcFUUZ1W4Aae7B2KyS4wZzV8",
//     authDomain: "reactclientpanel-8b675.firebaseapp.com",
//     databaseURL: "https://reactclientpanel-8b675.firebaseio.com",
//     projectId: "reactclientpanel-8b675",
//     storageBucket: "reactclientpanel-8b675.appspot.com",
//     messagingSenderId: "370783054431",
//     appId: "1:370783054431:web:6a247fc700ebca7ac289ea",
//     measurementId: "G-G2CJ4Z47JT"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>