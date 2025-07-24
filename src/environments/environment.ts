export const environment = {
  production: false,
  appName: 'PhotoShare',
  appVersion: '1.0.0',
  appDescription: 'Partagez vos moments précieux',
  
  // Configuration des super-utilisateurs
  // ⚠️ Les super-utilisateurs sont configurés via les variables d'environnement
  // pour des raisons de sécurité - aucun credential dans le code source
  superUsers: [
    // Les valeurs réelles seront injectées depuis les variables d'environnement
    // Voir .env.example pour la configuration requise
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
