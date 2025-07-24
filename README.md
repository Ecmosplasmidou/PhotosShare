# 📸 PhotoShare

> **Partagez vos moments précieux avec vos proches**

PhotoShare est une application web moderne de partage de photos développée avec Angular 18+ et TypeScript. Elle offre une expérience utilisateur complète similaire aux réseaux sociaux populaires avec un design responsive et des fonctionnalités avancées.

## ✨ Fonctionnalités

### 🎯 **Fonctionnalités Principales**
- 📷 **Upload et partage de photos** avec titre, description et localisation
- ❤️ **Système de likes** interactif avec animations
- 💬 **Commentaires** avec gestion temps réel
- 👤 **Authentification utilisateur** sécurisée
- 👑 **Système de super-utilisateurs** avec privilèges administrateur
- 🔄 **Feed chronologique** avec dernière photo en tête

### 🎨 **Interface & Design**
- 📱 **Responsive design** optimisé mobile et desktop
- 🍔 **Burger menu** avec navigation fullscreen sur mobile
- 🎭 **Animations fluides** et transitions modernes
- 🌈 **Design moderne** avec gradients et glassmorphism
- 🚫 **Blocage du scroll** lors de l'ouverture du menu mobile

### 🔐 **Sécurité & Configuration**
- 🔒 **Variables d'environnement** pour les données sensibles
- 🛡️ **Service de configuration** centralisé
- 📁 **Architecture modulaire** avec services séparés
- 🔄 **Multi-environnement** (dev/production)

## 🛠️ Technologies Utilisées

- **Frontend**: Angular 18+, TypeScript, SCSS
- **Styling**: CSS Grid, Flexbox, Animations CSS
- **Architecture**: Standalone Components, Services, Guards
- **Stockage**: LocalStorage (évolutif vers Firebase)
- **Sécurité**: Variables d'environnement, AuthGuard

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Angular CLI

### Installation
```bash
# Cloner le repository
git clone https://github.com/Ecmosplasmidou/PhotosShare.git
cd PhotosShare

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Modifiez .env avec vos configurations

# Démarrer le serveur de développement
ng serve
```

L'application sera accessible sur `http://localhost:4200`
L'application sera accessible sur `http://localhost:4200`

## 📱 Aperçu

### Desktop
- Interface moderne avec navigation horizontale
- Grille responsive pour la galerie
- Formulaires optimisés

### Mobile
- Burger menu avec navigation fullscreen
- Layout adaptatif en colonne unique
- Touch-friendly avec animations

## 🎯 Fonctionnalités Détaillées

### 🔐 Authentification
- Connexion simple avec username/email
- Gestion des sessions avec localStorage
- Système de super-utilisateurs configurables

### 📸 Gestion des Photos
- Upload avec preview
- Métadonnées (titre, description, localisation)
- Tri chronologique automatique
- Actions (like, supprimer, commenter)

### 💬 Système de Commentaires
- Ajout/suppression de commentaires
- Avatar utilisateur généré automatiquement
- Timestamps et gestion des permissions

### 🎨 Interface Responsive
- Mobile-first design
- Breakpoints: 480px, 768px, 1200px
- Animations et micro-interactions

## 🔧 Configuration

### Variables d'Environnement
Consultez `.env.example` pour la liste complète des variables configurables :

```env
# Super-utilisateurs
NG_APP_SUPER_USER_1_USERNAME=admin
NG_APP_SUPER_USER_1_EMAIL=admin@example.com

# Configuration app
NG_APP_NAME=PhotoShare
NG_APP_VERSION=1.0.0
```

## 🚀 Déploiement

### Build de Production
```bash
ng build --configuration=production
```

### Hébergement Recommandé
- **Netlify** ou **Vercel** pour le frontend
- **Firebase** pour l'évolution vers un backend complet

## 🔮 Roadmap

- [ ] 🔥 Intégration Firebase
- [ ] 📱 Application mobile (Ionic)
- [ ] 🔍 Recherche et filtres
- [ ] 👥 Système d'amis et followers
- [ ] 📊 Analytics et statistiques
- [ ] 🌐 Internationalisation (i18n)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez le guide de contribution pour plus d'informations.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Cassam Mahadawoo**
- GitHub: [@Ecmosplasmidou](https://github.com/Ecmosplasmidou)
- Email: cassamb97@gmail.com

---

⭐ N'hésitez pas à mettre une étoile si ce projet vous plaît !
