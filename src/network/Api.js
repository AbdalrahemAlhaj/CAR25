import { observer } from 'mobx-react';
import Store from './../Stores';
import LocalDb from '../storage/LocalDb';
import { Buffer } from 'buffer';
import { Platform, Alert } from 'react-native'
import RNRestart from 'react-native-restart';
import Toast from 'react-native-simple-toast';


export const GoogleApiKey = "AIzaSyDYq16-4tDS4S4bcwE2JiOa2FQEF5Hw8ZI"


const host = 'https://car25.com/wp-json/carspot/v1';

const PURCHASE_CODE = 'd0707d36-ac7f-41bf-9873-799dcead9a96';
const CUSTOM_SECURITY = '123';
class Api {
  static headers() {
    let { orderStore } = Store;
    if (orderStore.isSocailLogin) {
      if (Platform.OS === 'ios') {

        return {
          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'ios',
          'CARSPOT-LOGIN-TYPE': 'social',
        }

      }
      else
        return {
          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'android',
          'CARSPOT-LOGIN-TYPE': 'social',
        }
    }
    else {

      if (Platform.OS === 'ios') {
        return {

          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'ios',

        }

      }
      else
        return {
          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'android',


        }
    }
  }
  static msg(msg) {
    return console.warn(msg);
  }
  static get(route) {
    console.log('here')
    return this.func(route, null, 'GET');
  }

  static put(route, params) {
    return this.func(route, params, 'PUT')
  }

  static post(route, params) {
    return this.func(route, params, 'POST')
  }

  static delete(route, params) {
    return this.func(route, params, 'DELETE')
  }

  static async postImage(route, key, image) {
    let { orderStore } = Store;
    const url = `${host}/${route}`;
    const formData = new FormData();
    let options = {};

    const extension = image.mime.substring(image.mime.indexOf("/") + 1, image.mime.length);

    const photo = {

      uri: image.path,
      type: image.mime,
      name: "test." + extension,
    };
    // const photo = {

    //   uri: image.uri,
    //   type: image.type,
    //   name: image.fileName,
    // };

    formData.append(key, photo);


    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    return fetch(url, options).then(resp => {
      console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => {
      console.log('Api response is ------------->>>>>>', json);

      return json;
    });

  }

  static async postImageMulti(route, key, image, paramKey, paramValue) {
    let { orderStore } = Store;
    const url = `${host}/${route}`;
    const formData = new FormData();
    formData.append(paramKey, paramValue + "");

    let options = {};
    console.log('here image is', image.length)
    if (image.length != undefined)
    {  for (var i = 0; i < image.length; i++) {
        console.log('size=>', image[i].size);

        const extension = image[i].mime.substring(image[i].mime.indexOf("/") + 1, image[i].mime.length);

        const photo = {

          uri: image[i].path,
          type: image[i].mime,
          name: "test." + extension,
        };
        formData.append(key + i, photo);

      }
    }else{
      const extension = image.mime.substring(image.mime.indexOf("/") + 1, image.mime.length);

      const photo = {

        uri: image.path,
        type: image.mime,
        name: "test." + extension,
      };
      formData.append(key + i, photo);

    }
    console.log("Form Data", formData);
    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    return fetch(url, options).then(resp => {
      console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => {
      console.log('Api response is ------------->>>>>>', json);

      return json;
    });

  }


  // static async func(route, params, verb) {


  //   const host = 'https://carspot-api.scriptsbundle.com/wp-json/carspot/v1';
  //   const url = `${host}/${route}`
  //   let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );


  //   options.headers = Api.headers()

  //   const data = await LocalDb.getUserProfile();

  //   if(data!=null){
  //     const username = data.email;
  //     const password = data.password;
  //     const hash = new Buffer(`${username}:${password}`).toString('base64');
  //     options.headers['Authorization'] = `Basic ${hash}`;

  //   }

  //   let {orderStore} = {Store};
  // if(orderStore.isSocailLogin){
  //     const username = params.email;
  //     const password = '123';
  //     const hash = new Buffer(`${username}:${password}`).toString('base64');
  //     options.headers['Authorization'] = `Basic ${hash}`;
  // }      

  //   return fetch(url, options).then( resp => {
  //     console.log('Api response is ------------->>>>>>', resp);

  //     let json = resp.json();

  //     if (resp.ok) {
  //       return json
  //     }
  //     return json.then(err => {throw err});
  //   }).catch( json => { 
  //     console.log('Api response is ------------->>>>>>', json);
  //       //Api.showAlert();
  //     //return json;
  //   });
  // }

  static async func(route, params, verb) {
    //  console.warn(JSON.stringify(params));
    let { orderStore } = Store;

    const url = `${host}/${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);


    options.headers = Api.headers()

    const data = await LocalDb.getUserProfile();
    if (params != null && params.type === 'social') {

      const username = params.email;
      const password = '123';
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;
    }
    else
      if (data != null) {
        const username = data.email;
        const password = data.password;
        const hash = new Buffer(`${username}:${password}`).toString('base64');
        options.headers['Authorization'] = `Basic ${hash}`;


      }

    return fetch(url, options).then(resp => {
      console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).catch(json => {
      console.log('error is ', json)
      // console.log('Api response is ------------->>>>>>', json);
      Api.showAlert();
      return;
    });
  }
  static showAlert() {
    // Works on both iOS and Android
    Alert.alert(
      'Network Error!',
      'Click Ok To Restart App.',
      [

        { text: 'OK', onPress: () => RNRestart.Restart() },
      ],
      { cancelable: false },
    );
  }
}
export default Api;