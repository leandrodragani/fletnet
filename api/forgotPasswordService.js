import firebase from 'firebase'

export function forgotPassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
}