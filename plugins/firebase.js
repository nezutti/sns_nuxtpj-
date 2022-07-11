import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCbvFVBBtHgOIpXpieVbo9Rt8TnFhKS-8I",
      authDomain: "sns-nuxtpj.firebaseapp.com",
      projectId: "sns-nuxtpj",
      storageBucket: "sns-nuxtpj.appspot.com",
      messagingSenderId: "857132558251",
      appId: "1:857132558251:web:83e01ee55f9d898e6c54ee",
      measurementId: "G-M1ESWPZZGZ"
    }
  )
}

export default firebase