export const environment = {
  production: false,
  appName: 'PhotoShare',
  appVersion: '1.0.0',
  appDescription: 'Partagez vos moments précieux',
  
  // Configuration des super-utilisateurs
  superUsers: [
    {
      username: 'Mandro97',
      email: 'cassamb97@gmail.com'
    }
    // Ajoutez d'autres super-utilisateurs ici
  ],
  
  // Configuration API (pour futur backend)
  apiUrl: 'http://localhost:3000/api',
  
  // Configuration Firebase (pour future intégration)
  firebase: {
    // apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
    // authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
    // projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'],
    // storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
    // messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
    // appId: process.env['NG_APP_FIREBASE_APP_ID']
  }
};
