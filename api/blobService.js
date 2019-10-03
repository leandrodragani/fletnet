/* eslint-disable no-undef */
/* eslint-disable func-names */
import firebase from 'firebase';
import axios from 'axios';

export async function uploadBlob(request) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', request.blob, true);
    xhr.send(null);
  });
  console.log(blob);
  const ref = firebase
    .storage()
    .ref()
    .child(`${request.path}/${request.filename}`);

  const snapshot = await ref.put(blob);
  blob.close();
  return await snapshot.ref.getDownloadURL();
}

export async function uploadBlobREST(request) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', request.blob, true);
    xhr.send(null);
  });
  console.log(blob);

  const data = new FormData();
  data.append('file', blob, request.filename);
  axios.post('/files', data).then((response) => {
    console.log(response);
  });
}
