export const environment = {
  production: true,
  appName: 'PhotoShare',
  appVersion: '1.0.0',
  appDescription: 'Partagez vos moments précieux',
  

  superUsers: [
    // Sera peuplé dynamiquement par le service ConfigService
    // à partir des variables d'environnement sécurisées
  ],
  
  // Configuration API (pour production)
  apiUrl: 'https://your-api-domain.com/api',
  
  firebase: {
    // Les vraies valeurs seront injectées par les variables d'environnement Netlify
    // Aucune donnée sensible ici
  }
};
