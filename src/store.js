import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

//firestore config
const firebaseConfig = {

	apiKey: "AIzaSyCk0fHK6djTS5dbxDOdD0So3_MlXB4peWI",
    authDomain: "biblioteca-92d24.firebaseapp.com",
    databaseURL: "https://biblioteca-92d24.firebaseio.com",
    projectId: "biblioteca-92d24",
    storageBucket: "biblioteca-92d24.appspot.com",
    messagingSenderId: "973200616508",
    appId: "1:973200616508:web:0568cb35e6421df2c96739",
    measurementId: "G-MMC6L34DP2"
}

//firebase initialize
firebase.initializeApp(firebaseConfig);

//react-redux config
const rrConfig = {
	userprofile: 'users',
	useFirestoreForProfile: true
}

//create ehancer with compose from redux and firestore
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrConfig),
	reduxFirestore(firebase)
)(createStore);

//reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

//initial state
const initialState = {}

//create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
	reactReduxFirebase(firebase),
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;