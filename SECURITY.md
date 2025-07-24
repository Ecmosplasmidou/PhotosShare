# 🔐 Configuration de Sécurité - PhotoShare

## 📋 Variables d'Environnement

### 🚀 Installation
1. Copiez le fichier `.env.example` vers `.env`
2. Modifiez les valeurs selon votre configuration
3. **IMPORTANT** : Ne commitez jamais le fichier `.env` dans Git

```bash
cp .env.example .env
```

### 🔧 Configuration des Super-Utilisateurs

Les super-utilisateurs sont configurés dans le fichier d'environnement :

```env
NG_APP_SUPER_USER_1_USERNAME=votre-nom-utilisateur
NG_APP_SUPER_USER_1_EMAIL=votre-email@example.com
```

### 📁 Structure des Fichiers de Configuration

```
src/
├── environments/
│   ├── environment.ts          # Configuration développement
│   └── environment.prod.ts     # Configuration production
└── app/
    └── services/
        ├── config.service.ts   # Service de configuration centralisé
        └── auth.service.ts     # Service d'authentification
```

### 🛡️ Sécurité

#### ✅ Bonnes Pratiques
- ✅ Fichier `.env` dans `.gitignore`
- ✅ Variables sensibles dans `environment.ts`
- ✅ Service de configuration centralisé
- ✅ Différentiation dev/production

#### ❌ À Éviter
- ❌ Hardcoder des emails/mots de passe dans le code
- ❌ Commiter le fichier `.env`
- ❌ Exposer des clés API en public

### 🔄 Migration Future vers Firebase

Quand vous migrerez vers Firebase, décommentez et configurez :

```env
NG_APP_FIREBASE_API_KEY=your-api-key
NG_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NG_APP_FIREBASE_PROJECT_ID=your-project-id
NG_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NG_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
NG_APP_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### 🚀 Déploiement

#### Développement
```bash
ng serve
# Utilise environment.ts
```

#### Production
```bash
ng build --configuration=production
# Utilise environment.prod.ts
```

### 🐛 Debug

Le service affiche automatiquement la configuration en mode développement dans la console :

```
🔧 Configuration de l'application
📱 App: PhotoShare v1.0.0
🌐 API URL: http://localhost:3000/api
👑 Super Users: 1 configuré(s)
🏭 Production: false
```

### 📞 Support

Si vous avez des questions sur la configuration, consultez :
- `src/app/services/config.service.ts` - Service de configuration
- `src/environments/environment.ts` - Variables d'environnement
