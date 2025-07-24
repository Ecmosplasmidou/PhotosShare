export const environment = {
  production: false,
  appName: 'PhotoShare',
  appVersion: '1.0.0',
  appDescription: 'Partagez vos moments précieux',
  
  // Configuration des super-utilisateurs (valeurs de développement non sensibles)
  superUsers: [
    {
      username: 'dev_admin',
      email: 'admin@localhost.dev'
    }
    // Ajoutez d'autres super-utilisateurs ici
  ],
  
  // Configuration API (pour futur backend)
  apiUrl: 'http://localhost:3000/api',
  
  // Configuration Firebase (pour future intégration)
  firebase: {
    // Configuration de développement - valeurs factices
    // apiKey: 'dev-api-key',
    // authDomain: 'dev-project.firebaseapp.com',
    // projectId: 'dev-project-id',
    // storageBucket: 'dev-project.appspot.com',
    // messagingSenderId: '000000000',
    // appId: 'dev-app-id'
  }
};
