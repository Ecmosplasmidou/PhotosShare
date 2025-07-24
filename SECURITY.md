# � Configuration Sécurisée - PhotoShare

## ⚠️ IMPORTANT - Sécurité des Super-Utilisateurs

**Ce dépôt est PUBLIC** - Aucun credential sensible n'est stocké dans le code source.

### �️ Configuration des Super-Utilisateurs

Les super-utilisateurs sont configurés **uniquement** via les variables d'environnement :

#### Pour le développement local :
1. Créez un fichier `.env.local` (ignoré par Git)
2. Ajoutez vos variables :
```bash
NG_APP_SUPER_USER_1_USERNAME=votre_username
NG_APP_SUPER_USER_1_EMAIL=votre@email.com
```

#### Pour la production (Netlify) :
1. Allez dans Site Settings → Environment variables
2. Configurez :
   - `NG_APP_SUPER_USER_1_USERNAME`
   - `NG_APP_SUPER_USER_1_EMAIL`

### 🔍 Vérification de Sécurité

- ✅ Aucun credential dans `environment.ts`
- ✅ Aucun credential dans `environment.prod.ts`
- ✅ Fichier `.env` ignoré par Git
- ✅ Variables sensibles dans `.env.local` ou Netlify uniquement

### 🚨 En cas de leak accidentel

Si des credentials sensibles sont accidentellement commités :

1. **Changez immédiatement les mots de passe**
2. Supprimez les credentials du code
3. Utilisez `git filter-branch` pour nettoyer l'historique
4. Force push le dépôt nettoyé

### 📋 Checklist de Sécurité

- [ ] Aucun email personnel dans le code
- [ ] Aucun username réel dans le code  
- [ ] Variables sensibles dans Netlify uniquement
- [ ] `.env.local` dans `.gitignore`
- [ ] Tests de sécurité passés

## 🎯 Principe de Sécurité

> **"Jamais de secrets dans le code public"**

Tous les credentials sont gérés par des variables d'environnement externes.
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
