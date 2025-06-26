import {initializeApp} from 'firebase-admin/app';
import {getStorage} from  'firebase-admin/storage'
import path from 'path';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountString) {
    throw new Error("Firebase service account is not defined in enviroment variables")
};

const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);


const firebaseAdminApp = initializeApp({
    credential: serviceAccount,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = getStorage(firebaseAdminApp).bucket();

export {bucket};