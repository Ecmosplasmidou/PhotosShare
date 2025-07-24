export const environment = {
  production: true,
  appName: 'PhotoShare',
  appVersion: '1.0.0',
  appDescription: 'Partagez vos moments précieux',
  
  // Configuration des super-utilisateurs
  superUsers: [
    {
      username: 'Mandro97',
      email: 'cassamb97@gmail.com'
    }
  ],
  
  // Configuration API (pour production)
  apiUrl: 'https://your-api-domain.com/api',
  
  // Configuration Firebase (pour production)
  firebase: {
    // Remplacez par vos vraies clés de production
    // apiKey: 'your-production-api-key',
    // authDomain: 'your-project.firebaseapp.com',
    // projectId: 'your-project-id',
    // storageBucket: 'your-project.appspot.com',
    // messagingSenderId: '123456789',
    // appId: '1:123456789:web:abc123def456'
  }
};
