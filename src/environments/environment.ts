export const environment = {
  issuer: 'https://localhost:5000',
  //issuer: 'https://idm2.azurewebsites.net',
  clientId: 'local-dev',
  idm: {
    //domain: 'https://idm2.azurewebsites.net',
    domain: 'https://localhost:5000',
  },
  account: {
    //domain: 'https://account1.azurewebsites.net',
    domain: 'https://localhost:3001',
  },
  catalog: {
    //domain: 'https://catalog3.azurewebsites.net',
    domain: 'https://localhost:3002',
  },
    firebaseConfig: {
    apiKey: "AIzaSyA5zaOwzY523rShD_WRv_hyOyz9YLYNYck",
    authDomain: "drve-test.firebaseapp.com",
    projectId: "drve-test",
    storageBucket: "drve-test.firebasestorage.app",
    messagingSenderId: "601591865009",
    appId: "1:601591865009:web:ea37acfb38c6f8a397cc90",
    measurementId: "G-3EQYHE38HM",
    vapidKey: 'BNIyFeLRkgRd5OvhTtL92uBiQTuSo22pr17wwjq-pWyJGqMTDAjKu_MNsVg5osHk6L1XFDtQ5c-vLigfimIxSOY'
  },
};
