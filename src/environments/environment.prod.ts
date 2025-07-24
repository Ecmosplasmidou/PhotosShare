export const environment = {
  production: true,
  appName: 'PhotoShare',
  appVersion: '1.0.0',
  appDescription: 'Partagez vos moments précieux',
  
  superUsers: [
    {
      username: 'Mandro97',
      email: 'admin@photoshare.app' // Email générique pour éviter la détection de secrets
    }
  ],
  
  // Configuration API (pour production)
  apiUrl: 'https://your-api-domain.com/api',
  
  firebase: {
  }
};
