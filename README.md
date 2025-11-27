<p align="center">
  <img src="public/Applogo.png" alt="FlutterOrbit Academy Logo" width="120" height="120" style="border-radius: 20px;">
</p>

<h1 align="center">🚀 FlutterOrbit Academy</h1>

<p align="center">
  <strong>Your Path to Flutter Mastery</strong>
</p>

<p align="center">
  A structured, industry-vetted curriculum designed to take you from complete beginner to professional Flutter architect.
</p>

<p align="center">
  <a href="https://flutterkit.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-FlutterOrbit-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://pub.dev/packages/smart_review_prompter">
    <img src="https://img.shields.io/badge/pub.dev-smart__review__prompter-cyan?style=for-the-badge&logo=dart" alt="Pub.dev Package">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Firebase-Free_Tier-FFCA28?style=flat-square&logo=firebase" alt="Firebase">
</p>

---

## ✨ Features

### 📚 Comprehensive Curriculum
- **15 Structured Modules** covering everything from Dart basics to app deployment
- **200+ Hours** of curated learning content
- **Progressive Learning Path** - unlock your potential step by step

### 🎯 Interactive Learning
| Feature | Description |
|---------|-------------|
| 📝 **Quizzes** | Test your knowledge after each module |
| 🃏 **Flashcards** | Review key concepts with flip cards |
| 💻 **DartPad Integration** | Practice code directly in the browser |
| 📖 **Code Examples** | Real-world code snippets for every topic |

### 🏆 Gamification & Progress
- 🔥 **Streak Tracking** - Build consistent learning habits
- 📊 **Progress Dashboard** - Visual progress with circular charts
- 🎖️ **Certificates** - Generate personalized completion certificates
- 🏅 **Achievement System** - Unlock badges as you progress
- 📈 **Rank System** - From Beginner to Flutter Architect

### 🛠️ Developer Tools
- ⏱️ **Pomodoro Timer** - Built-in study timer
- 🔖 **Bookmarks** - Save important topics
- 📝 **Notes** - Add personal notes to modules
- 💾 **Export/Import** - Backup your progress
- 🔗 **Share Progress** - Share your achievements

### 🌐 Community Features (Firebase)
- 📬 **Newsletter** - Get latest Flutter patterns
- 💬 **Feedback System** - Submit suggestions & bug reports
- 📊 **Community Stats** - See global learning statistics
- 🔗 **Progress Sharing** - Generate shareable progress links

### 📦 Resource Hub
- **50+ Popular Packages** - Curated pub.dev packages by category
- **15+ Learning Resources** - Docs, videos, tools & community links
- **Quick Tips** - Pro tips for every module

---

## 📖 Curriculum Overview

| Week | Module | Topics |
|------|--------|--------|
| 1 | **Dart Fundamentals** | Variables, Data Types, Control Flow, Functions |
| 2 | **Object-Oriented Dart** | Classes, Inheritance, Mixins, Generics |
| 3 | **Async Dart & Futures** | Futures, Async/Await, Streams, Isolates |
| 4 | **Flutter Basics** | Widgets, Material Design, Layouts |
| 5 | **Responsive Layouts** | MediaQuery, LayoutBuilder, Adaptive UI |
| 6 | **State & Interactivity** | setState, Forms, Gestures, Animations |
| 7 | **Navigation & Routing** | Navigator, Named Routes, Deep Linking |
| 8 | **API & Networking** | HTTP, REST APIs, JSON Parsing, Dio |
| 9 | **State Management** | Provider, Riverpod, BLoC, GetX |
| 10 | **Local Persistence** | SharedPreferences, SQLite, Hive |
| 11 | **Clean Architecture** | Repository Pattern, DI, SOLID |
| 12 | **Firebase Integration** | Auth, Firestore, Cloud Functions |
| 13 | **Animations & Polish** | Implicit, Explicit, Hero Animations |
| 14 | **Testing & DevOps** | Unit, Widget, Integration Tests, CI/CD |
| 15 | **Deployment** | App Store, Play Store, Web Deployment |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SatishParmar1/FlutterKIT.git

# Navigate to project directory
cd FlutterKIT

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

---

## 🔥 Firebase Setup (Optional)

The app uses Firebase for newsletter, feedback, and community features.

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database**
4. Enable **Analytics**

### 2. Configure Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Newsletter - allow subscriptions
    match /newsletter/{document} {
      allow create: if request.resource.data.email is string;
      allow read: if true;
    }
    
    // Feedback - allow submissions
    match /feedback/{document} {
      allow create: if true;
    }
    
    // Stats - read only
    match /stats/{document} {
      allow read: if true;
      allow write: if true;
    }
    
    // Shared Progress
    match /sharedProgress/{document} {
      allow create, read: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['views']);
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📦 My Flutter Package

<p align="center">
  <a href="https://pub.dev/packages/smart_review_prompter">
    <img src="https://img.shields.io/pub/v/smart_review_prompter?style=for-the-badge&logo=dart&logoColor=white&label=smart_review_prompter" alt="Pub Version">
  </a>
</p>

**[smart_review_prompter](https://pub.dev/packages/smart_review_prompter)** - A Flutter package to intelligently prompt users for app reviews at the right moment. Boost your app ratings! ⭐

---

## 👤 Author

<p align="center">
  <img src="https://github.com/SatishParmar1.png" alt="Satish Parmar" width="100" style="border-radius: 50%;">
</p>

<h3 align="center">Satish Parmar</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/satish-parmar-ak978312">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/SatishParmar1">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://instagram.com/satish_parmar_978">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  </a>
  <a href="https://who-is-satish.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio">
  </a>
</p>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If this project helped you learn Flutter, please give it a ⭐ on GitHub!

<p align="center">
  <a href="https://github.com/SatishParmar1/FlutterKIT">
    <img src="https://img.shields.io/github/stars/SatishParmar1/FlutterKIT?style=social" alt="GitHub Stars">
  </a>
</p>

---

<p align="center">
  Made with ❤️ for the Flutter Community
</p>

<p align="center">
  <sub>© 2024 FlutterOrbit Academy. All rights reserved.</sub>
</p>
