// import { configureStore } from '@reduxjs/toolkit'
// import usersignupreducer from '../features/slices/signup/usersignupslice'
// import userloginreducer from '../features/slices/signup/userloginslice'
// import profilereducer from '../features/slices/signup/userprofilepictureslice'
// import adminloginreducer from '../features/adminslices/adminloginslice'
// import adminpanelreducer from '../features/adminslices/adminpanelslice'

// export const store = configureStore({
//     reducer: {
//         signup: usersignupreducer,
//         login: userloginreducer,
//         profile: profilereducer,
//         adminlogin: adminloginreducer,
//         adminpanel : adminpanelreducer
//     }
// })

// export default store

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// Import your reducers
import usersignupreducer from '../features/slices/signup/usersignupslice';
import userloginreducer from '../features/slices/signup/userloginslice';
import profilereducer from '../features/slices/signup/userprofilepictureslice';
import adminloginreducer from '../features/adminslices/adminloginslice';
import adminpanelreducer from '../features/adminslices/adminpanelslice';
import deletereducer from '../features/adminslices/deleteuserslice'
import addreducer from '../features/adminslices/adduserslice'

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  signup: usersignupreducer,
  login: userloginreducer,
  profile: profilereducer,
  adminlogin: adminloginreducer,
  adminpanel: adminpanelreducer,
  deleteuser:deletereducer,
  adduser : addreducer
});

// Persist configuration
const persistConfig = {
  key: 'root', // Key to persist
  storage, // LocalStorage for web
  whitelist: ['adminpanel'] // Specify which slices to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer
});

// Persistor
export const persistor = persistStore(store);

export default store;
