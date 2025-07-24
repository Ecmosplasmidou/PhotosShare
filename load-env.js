const fs = require('fs');
const path = require('path');

// Fonction pour charger les variables d'environnement depuis .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.warn('⚠️  Fichier .env.local non trouvé');
    return;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=');
      
      if (key && value) {
        process.env[key] = value;
        console.log(`✅ Variable chargée: ${key}`);
      }
    }
  });
}

loadEnvFile();
