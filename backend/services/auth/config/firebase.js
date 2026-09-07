import {cert, initializeApp} from "firebase-admin"
import serviceAcccountKey from  "../serviceAccountKey.json"  with {type : "json"}

export const firebaseAdmin = initializeApp({
    credential : cert(serviceAcccountKey)
})