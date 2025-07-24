# 📸 PhotoShare

> **Partagez vos moments précieux avec vos proches**

PhotoShare est un réseau social développée avec Angular 18+ et TypeScript. Elle offre une expérience utilisateur complète similaire aux autres réseaux sociaux avec un design responsive et des fonctionnalités avancées.

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
git clone https://github.com/votre-username/photoshare.git
cd photoshare

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Modifiez .env avec vos configurations

# Démarrer le serveur de développement
ng serve
