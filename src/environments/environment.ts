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
    // Ces valeurs seront configurées via les variables d'environnement Netlify
    // apiKey: 'configured-via-netlify',
    // authDomain: 'configured-via-netlify',
    // projectId: 'configured-via-netlify',
    // storageBucket: 'configured-via-netlify',
    // messagingSenderId: 'configured-via-netlify',
    // appId: 'configured-via-netlify'
  }
};
