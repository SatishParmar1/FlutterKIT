import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import AppLogo from './assets/Applogo.png';
import { 
  Terminal, BookOpen, Code, Layers, 
  CheckCircle2, ChevronDown, 
  Search, ShieldAlert, Cpu, Rocket,
  ExternalLink, PlayCircle, FileText,
  Trophy, Activity, Zap,
  Github, Twitter, Linkedin, Youtube, Mail, 
  Star, Clock, BarChart3, CheckCircle,
  Award, Target, Flame, Brain, Lightbulb,
  Play, Copy, RefreshCw, ChevronRight,
  GraduationCap, Medal, Crown, Sparkles,
  Calendar, TrendingUp, Users, Heart,
  AlertCircle, Info, HelpCircle, X,
  Bookmark, BookmarkCheck, StickyNote, Download,
  Upload, Timer, Pause, RotateCcw, Sun, Moon,
  Shuffle, Eye, EyeOff, Volume2, VolumeX,
  Settings, Trash2, Edit3, Save, Filter,
  LayoutGrid, List, ArrowLeft, ArrowRight,
  FileCode, Link, GitBranch, FolderGit2,
  Package, Database, Globe, Lock, Image,
  Palette, Navigation, Bell, Smartphone,
  MessageSquare, Send, ThumbsUp, Share2, Loader2
} from 'lucide-react';

// Firebase imports
import { 
  subscribeToNewsletter, 
  submitFeedback, 
  getCommunityStats, 
  trackNewLearner,
  trackModuleCompletion,
  trackQuizCompletion,
  trackFlashcardReview,
  trackDartPadUsage,
  trackResourceClick,
  submitToLeaderboard,
  getLeaderboard,
  shareProgress,
  trackEvent
} from './firebase';

// --- POPULAR PACKAGES DATA ---
const POPULAR_PACKAGES = {
  stateManagement: [
    { name: "provider", desc: "Simple state management with InheritedWidget", url: "https://pub.dev/packages/provider", likes: "8.9k", stars: 5 },
    { name: "flutter_riverpod", desc: "Reactive caching & data-binding framework", url: "https://pub.dev/packages/flutter_riverpod", likes: "4.2k", stars: 5 },
    { name: "flutter_bloc", desc: "BLoC pattern for predictable state management", url: "https://pub.dev/packages/flutter_bloc", likes: "5.1k", stars: 5 },
    { name: "get", desc: "State, navigation & dependency injection", url: "https://pub.dev/packages/get", likes: "11k", stars: 5 },
    { name: "mobx", desc: "Reactive state management with observables", url: "https://pub.dev/packages/mobx", likes: "2.3k", stars: 4 },
  ],
  networking: [
    { name: "http", desc: "Composable HTTP client library", url: "https://pub.dev/packages/http", likes: "7.2k", stars: 5 },
    { name: "dio", desc: "Powerful HTTP client with interceptors", url: "https://pub.dev/packages/dio", likes: "6.8k", stars: 5 },
    { name: "retrofit", desc: "Type-safe REST client generator", url: "https://pub.dev/packages/retrofit", likes: "1.9k", stars: 4 },
    { name: "graphql_flutter", desc: "GraphQL client for Flutter", url: "https://pub.dev/packages/graphql_flutter", likes: "1.4k", stars: 4 },
    { name: "web_socket_channel", desc: "WebSocket connection handling", url: "https://pub.dev/packages/web_socket_channel", likes: "1.1k", stars: 4 },
  ],
  storage: [
    { name: "shared_preferences", desc: "Simple key-value storage", url: "https://pub.dev/packages/shared_preferences", likes: "7.5k", stars: 5 },
    { name: "hive", desc: "Lightweight & fast NoSQL database", url: "https://pub.dev/packages/hive", likes: "4.6k", stars: 5 },
    { name: "sqflite", desc: "SQLite plugin for Flutter", url: "https://pub.dev/packages/sqflite", likes: "4.1k", stars: 5 },
    { name: "isar", desc: "Super fast cross-platform database", url: "https://pub.dev/packages/isar", likes: "2.8k", stars: 5 },
    { name: "flutter_secure_storage", desc: "Secure storage for sensitive data", url: "https://pub.dev/packages/flutter_secure_storage", likes: "3.2k", stars: 5 },
  ],
  ui: [
    { name: "flutter_svg", desc: "SVG rendering and widget", url: "https://pub.dev/packages/flutter_svg", likes: "4.9k", stars: 5 },
    { name: "cached_network_image", desc: "Load & cache network images", url: "https://pub.dev/packages/cached_network_image", likes: "5.4k", stars: 5 },
    { name: "flutter_animate", desc: "Powerful animation builder", url: "https://pub.dev/packages/flutter_animate", likes: "2.1k", stars: 5 },
    { name: "shimmer", desc: "Shimmer loading effect", url: "https://pub.dev/packages/shimmer", likes: "2.7k", stars: 5 },
    { name: "lottie", desc: "Render Lottie animations", url: "https://pub.dev/packages/lottie", likes: "3.5k", stars: 5 },
    { name: "flutter_staggered_grid_view", desc: "Staggered grid layouts", url: "https://pub.dev/packages/flutter_staggered_grid_view", likes: "2.4k", stars: 4 },
  ],
  navigation: [
    { name: "go_router", desc: "Declarative routing for Flutter", url: "https://pub.dev/packages/go_router", likes: "3.8k", stars: 5 },
    { name: "auto_route", desc: "Flutter navigation code generator", url: "https://pub.dev/packages/auto_route", likes: "2.5k", stars: 5 },
    { name: "beamer", desc: "Navigation using Navigator 2.0", url: "https://pub.dev/packages/beamer", likes: "1.2k", stars: 4 },
  ],
  firebase: [
    { name: "firebase_core", desc: "Flutter plugin for Firebase Core", url: "https://pub.dev/packages/firebase_core", likes: "4.1k", stars: 5 },
    { name: "firebase_auth", desc: "Firebase Authentication", url: "https://pub.dev/packages/firebase_auth", likes: "3.5k", stars: 5 },
    { name: "cloud_firestore", desc: "Cloud Firestore database", url: "https://pub.dev/packages/cloud_firestore", likes: "3.3k", stars: 5 },
    { name: "firebase_messaging", desc: "Push notifications", url: "https://pub.dev/packages/firebase_messaging", likes: "2.9k", stars: 5 },
    { name: "firebase_storage", desc: "Cloud Storage for files", url: "https://pub.dev/packages/firebase_storage", likes: "2.1k", stars: 5 },
  ],
  utilities: [
    { name: "intl", desc: "Internationalization and localization", url: "https://pub.dev/packages/intl", likes: "5.8k", stars: 5 },
    { name: "url_launcher", desc: "Launch URLs in browser/apps", url: "https://pub.dev/packages/url_launcher", likes: "5.2k", stars: 5 },
    { name: "path_provider", desc: "Access file system paths", url: "https://pub.dev/packages/path_provider", likes: "4.8k", stars: 5 },
    { name: "permission_handler", desc: "Handle app permissions", url: "https://pub.dev/packages/permission_handler", likes: "4.1k", stars: 5 },
    { name: "connectivity_plus", desc: "Network connectivity status", url: "https://pub.dev/packages/connectivity_plus", likes: "2.9k", stars: 5 },
    { name: "device_info_plus", desc: "Device information", url: "https://pub.dev/packages/device_info_plus", likes: "2.4k", stars: 4 },
    { name: "package_info_plus", desc: "App version info", url: "https://pub.dev/packages/package_info_plus", likes: "2.2k", stars: 4 },
  ],
  forms: [
    { name: "flutter_form_builder", desc: "Easy form creation", url: "https://pub.dev/packages/flutter_form_builder", likes: "2.6k", stars: 5 },
    { name: "reactive_forms", desc: "Reactive form handling", url: "https://pub.dev/packages/reactive_forms", likes: "1.1k", stars: 4 },
    { name: "form_field_validator", desc: "Common form validators", url: "https://pub.dev/packages/form_field_validator", likes: "890", stars: 4 },
  ],
  testing: [
    { name: "mockito", desc: "Mock library for Dart", url: "https://pub.dev/packages/mockito", likes: "3.1k", stars: 5 },
    { name: "bloc_test", desc: "Testing library for BLoC", url: "https://pub.dev/packages/bloc_test", likes: "1.5k", stars: 5 },
    { name: "golden_toolkit", desc: "Widget screenshot testing", url: "https://pub.dev/packages/golden_toolkit", likes: "780", stars: 4 },
  ],
  codeGen: [
    { name: "freezed", desc: "Code generation for immutable classes", url: "https://pub.dev/packages/freezed", likes: "3.9k", stars: 5 },
    { name: "json_serializable", desc: "JSON serialization code gen", url: "https://pub.dev/packages/json_serializable", likes: "4.7k", stars: 5 },
    { name: "build_runner", desc: "Build system for code generation", url: "https://pub.dev/packages/build_runner", likes: "3.2k", stars: 5 },
    { name: "injectable", desc: "Dependency injection generator", url: "https://pub.dev/packages/injectable", likes: "1.8k", stars: 5 },
  ],
};

// --- LEARNING RESOURCES DATA ---
const LEARNING_RESOURCES = [
  { name: "Flutter Official Docs", url: "https://docs.flutter.dev", desc: "Official Flutter documentation", icon: "📚", category: "docs" },
  { name: "Dart Official Docs", url: "https://dart.dev/guides", desc: "Dart language documentation", icon: "🎯", category: "docs" },
  { name: "Flutter Widget Catalog", url: "https://docs.flutter.dev/ui/widgets", desc: "All Flutter widgets explained", icon: "🧩", category: "docs" },
  { name: "Flutter Cookbook", url: "https://docs.flutter.dev/cookbook", desc: "Practical Flutter recipes", icon: "🍳", category: "docs" },
  { name: "DartPad", url: "https://dartpad.dev", desc: "Online Dart & Flutter editor", icon: "💻", category: "tools" },
  { name: "FlutterFlow", url: "https://flutterflow.io", desc: "Visual Flutter app builder", icon: "🎨", category: "tools" },
  { name: "Flutter Gems", url: "https://fluttergems.dev", desc: "Curated package list", icon: "💎", category: "tools" },
  { name: "Pub.dev", url: "https://pub.dev", desc: "Official package repository", icon: "📦", category: "tools" },
  { name: "Flutter YouTube", url: "https://www.youtube.com/@flutterdev", desc: "Official Flutter channel", icon: "🎬", category: "video" },
  { name: "The Net Ninja", url: "https://www.youtube.com/c/TheNetNinja", desc: "Flutter tutorial series", icon: "🥷", category: "video" },
  { name: "Fireship", url: "https://www.youtube.com/@Fireship", desc: "Quick Flutter tutorials", icon: "🔥", category: "video" },
  { name: "Reso Coder", url: "https://www.youtube.com/@ResoCoder", desc: "Clean architecture tutorials", icon: "🏗️", category: "video" },
  { name: "Flutter Community", url: "https://medium.com/flutter-community", desc: "Community articles", icon: "✍️", category: "community" },
  { name: "r/FlutterDev", url: "https://www.reddit.com/r/FlutterDev/", desc: "Flutter subreddit", icon: "🗣️", category: "community" },
  { name: "Flutter Discord", url: "https://discord.gg/flutter", desc: "Official Discord server", icon: "💬", category: "community" },
];

// --- QUIZ DATA ---
const QUIZ_DATA = {
  1: [
    {
      id: "q1-1",
      question: "What is the difference between 'final' and 'const' in Dart?",
      options: [
        "They are exactly the same",
        "'final' is runtime constant, 'const' is compile-time constant",
        "'const' can be changed, 'final' cannot",
        "'final' is for classes only"
      ],
      correct: 1,
      explanation: "'final' variables can only be set once but their value is determined at runtime. 'const' variables are compile-time constants and must be known at compile time."
    },
    {
      id: "q1-2",
      question: "Which keyword enables null safety in Dart?",
      options: [
        "nullable",
        "?",
        "late",
        "Both ? and late are used"
      ],
      correct: 3,
      explanation: "The '?' makes a type nullable (String?), while 'late' indicates a non-null variable will be initialized later."
    },
    {
      id: "q1-3",
      question: "What will print: print(5 ~/ 2);",
      options: ["2.5", "2", "3", "Error"],
      correct: 1,
      explanation: "The ~/ operator performs integer division in Dart, so 5 ~/ 2 = 2 (not 2.5)."
    }
  ],
  2: [
    {
      id: "q2-1",
      question: "What is a factory constructor used for?",
      options: [
        "To create abstract classes",
        "To return an existing instance or subtype",
        "To make variables private",
        "To define static methods"
      ],
      correct: 1,
      explanation: "Factory constructors can return existing instances from cache, or return subtypes, unlike regular constructors that always create new instances."
    },
    {
      id: "q2-2",
      question: "How do you make a class property private in Dart?",
      options: [
        "Use 'private' keyword",
        "Use '#' prefix",
        "Use '_' prefix",
        "Use 'protected' keyword"
      ],
      correct: 2,
      explanation: "In Dart, prefixing a name with underscore (_) makes it library-private. There's no 'private' keyword."
    }
  ],
  3: [
    {
      id: "q3-1",
      question: "What does 'await' do in Dart?",
      options: [
        "Creates a new thread",
        "Pauses execution until Future completes",
        "Makes function synchronous",
        "Catches errors"
      ],
      correct: 1,
      explanation: "'await' pauses the execution of an async function until the Future completes and returns its value."
    },
    {
      id: "q3-2",
      question: "What is a Stream in Dart?",
      options: [
        "A type of List",
        "A sequence of asynchronous events",
        "A file reader",
        "A network connection"
      ],
      correct: 1,
      explanation: "A Stream is a sequence of asynchronous data events, like a pipe that delivers data over time."
    }
  ],
  4: [
    {
      id: "q4-1",
      question: "What is the root widget in a Flutter app?",
      options: [
        "Scaffold",
        "MaterialApp or CupertinoApp",
        "Container",
        "Column"
      ],
      correct: 1,
      explanation: "MaterialApp (or CupertinoApp for iOS style) is typically the root widget that provides theming, navigation, and other app-wide configurations."
    },
    {
      id: "q4-2",
      question: "What's the difference between StatelessWidget and StatefulWidget?",
      options: [
        "StatelessWidget is faster",
        "StatefulWidget can rebuild when state changes",
        "StatelessWidget cannot have children",
        "There is no difference"
      ],
      correct: 1,
      explanation: "StatefulWidget maintains mutable state that can trigger rebuilds, while StatelessWidget is immutable and only rebuilds when parent rebuilds."
    }
  ],
  5: [
    {
      id: "q5-1",
      question: "What is the difference between Expanded and Flexible?",
      options: [
        "They are the same",
        "Expanded forces child to fill space, Flexible allows smaller size",
        "Flexible is faster",
        "Expanded only works in Column"
      ],
      correct: 1,
      explanation: "Expanded forces its child to fill all available space. Flexible with FlexFit.loose allows the child to be smaller than the allocated space."
    },
    {
      id: "q5-2",
      question: "Why use ListView.builder instead of ListView?",
      options: [
        "It's easier to use",
        "It builds items lazily for better performance",
        "It supports more widgets",
        "It has better styling"
      ],
      correct: 1,
      explanation: "ListView.builder creates items lazily as they scroll into view, making it much more efficient for long lists."
    }
  ],
  6: [
    {
      id: "q6-1",
      question: "When should you call setState()?",
      options: [
        "In the build method",
        "When you want to update UI after state change",
        "In initState only",
        "Never, use Provider instead"
      ],
      correct: 1,
      explanation: "setState() should be called when you modify state variables and want to trigger a rebuild of the widget."
    },
    {
      id: "q6-2",
      question: "What happens if you don't dispose a TextEditingController?",
      options: [
        "Nothing",
        "Memory leak",
        "App crashes immediately",
        "Text disappears"
      ],
      correct: 1,
      explanation: "Not disposing controllers leads to memory leaks as they continue to hold resources even after the widget is gone."
    }
  ],
  7: [
    {
      id: "q7-1",
      question: "What does Navigator.pop() do?",
      options: [
        "Opens a new screen",
        "Returns to the previous screen",
        "Closes the app",
        "Refreshes the current screen"
      ],
      correct: 1,
      explanation: "Navigator.pop() removes the current route from the stack and returns to the previous screen."
    },
    {
      id: "q7-2",
      question: "How do you pass data to a new screen?",
      options: [
        "Global variables only",
        "Through constructor arguments or route arguments",
        "SharedPreferences",
        "It's not possible"
      ],
      correct: 1,
      explanation: "Data can be passed through the constructor when using MaterialPageRoute, or via arguments in named routes."
    }
  ],
  8: [
    {
      id: "q8-1",
      question: "What widget is best for displaying async data?",
      options: [
        "Container",
        "FutureBuilder",
        "Text",
        "Column"
      ],
      correct: 1,
      explanation: "FutureBuilder automatically rebuilds based on the state of a Future - loading, error, or data."
    },
    {
      id: "q8-2",
      question: "What does json.decode() return?",
      options: [
        "String",
        "Map<String, dynamic> or List",
        "int",
        "Widget"
      ],
      correct: 1,
      explanation: "json.decode() parses a JSON string and returns either a Map<String, dynamic> for objects or a List for arrays."
    }
  ],
  9: [
    {
      id: "q9-1",
      question: "What is the difference between ref.watch and ref.read?",
      options: [
        "They are the same",
        "watch rebuilds on change, read doesn't",
        "read is for Streams only",
        "watch is deprecated"
      ],
      correct: 1,
      explanation: "ref.watch() makes the widget rebuild when the provider's value changes. ref.read() gets the value once without listening."
    },
    {
      id: "q9-2",
      question: "What is StateNotifier used for?",
      options: [
        "Simple boolean state",
        "Complex immutable state management",
        "Navigation only",
        "API calls"
      ],
      correct: 1,
      explanation: "StateNotifier is used for managing complex state with methods to modify it, following immutable state patterns."
    }
  ],
  10: [
    {
      id: "q10-1",
      question: "Which storage is best for sensitive data like tokens?",
      options: [
        "SharedPreferences",
        "flutter_secure_storage",
        "Hive",
        "SQLite"
      ],
      correct: 1,
      explanation: "flutter_secure_storage uses platform-specific secure storage (Keychain on iOS, EncryptedSharedPreferences on Android)."
    },
    {
      id: "q10-2",
      question: "What is a TypeAdapter in Hive?",
      options: [
        "A UI component",
        "A converter for custom types",
        "A network adapter",
        "A testing tool"
      ],
      correct: 1,
      explanation: "TypeAdapter tells Hive how to serialize and deserialize custom objects for storage."
    }
  ],
  11: [
    {
      id: "q11-1",
      question: "In Clean Architecture, where should business logic live?",
      options: [
        "UI Layer",
        "Domain Layer",
        "Data Layer",
        "Anywhere"
      ],
      correct: 1,
      explanation: "Business logic belongs in the Domain layer, which should be independent of frameworks and UI."
    },
    {
      id: "q11-2",
      question: "What is a UseCase?",
      options: [
        "A UI test",
        "A single business operation or feature",
        "A database table",
        "An API endpoint"
      ],
      correct: 1,
      explanation: "A UseCase encapsulates a single piece of business logic, making it reusable and testable."
    }
  ],
  12: [
    {
      id: "q12-1",
      question: "What widget is used for real-time Firestore data?",
      options: [
        "FutureBuilder",
        "StreamBuilder",
        "Container",
        "ListView"
      ],
      correct: 1,
      explanation: "StreamBuilder listens to Firestore snapshots() which provide real-time updates when data changes."
    },
    {
      id: "q12-2",
      question: "What are Firebase Security Rules for?",
      options: [
        "UI styling",
        "Controlling data access on the server",
        "Encryption",
        "Performance"
      ],
      correct: 1,
      explanation: "Security Rules run on Firebase servers and determine who can read/write what data in your database."
    }
  ],
  13: [
    {
      id: "q13-1",
      question: "What is AnimatedContainer?",
      options: [
        "A video player",
        "A container that animates property changes automatically",
        "A loading spinner",
        "A gesture detector"
      ],
      correct: 1,
      explanation: "AnimatedContainer automatically animates changes to its properties (size, color, etc.) over a specified duration."
    },
    {
      id: "q13-2",
      question: "What is needed for Hero animation to work?",
      options: [
        "Same widget type only",
        "Same tag on both source and destination",
        "AnimationController",
        "Lottie package"
      ],
      correct: 1,
      explanation: "Hero animation requires widgets with the same tag on both the source and destination routes."
    }
  ],
  14: [
    {
      id: "q14-1",
      question: "What is the purpose of widget testing?",
      options: [
        "Test the entire app",
        "Test individual widgets in isolation",
        "Test API calls",
        "Test database"
      ],
      correct: 1,
      explanation: "Widget tests verify that individual widgets render correctly and respond to user interactions as expected."
    },
    {
      id: "q14-2",
      question: "What library is commonly used for mocking in Dart?",
      options: [
        "Faker",
        "Mockito",
        "Jest",
        "Mocha"
      ],
      correct: 1,
      explanation: "Mockito is the most popular mocking library for Dart, allowing you to create mock objects for testing."
    }
  ],
  15: [
    {
      id: "q15-1",
      question: "What file format should you use for Play Store upload?",
      options: [
        "APK",
        "App Bundle (.aab)",
        "IPA",
        "ZIP"
      ],
      correct: 1,
      explanation: "Google Play requires App Bundles (.aab) which allow the store to optimize the download for each device."
    },
    {
      id: "q15-2",
      question: "What happens if you lose your keystore file?",
      options: [
        "Generate a new one",
        "You can't update the app, only publish a new one",
        "Contact Google",
        "Use backup from Play Console"
      ],
      correct: 1,
      explanation: "If you lose your keystore, you cannot update your existing app. You can use Play App Signing to let Google manage it."
    }
  ]
};

// --- CODE EXAMPLES ---
const CODE_EXAMPLES = {
  1: [
    {
      title: "Variables & Null Safety",
      code: `// Variables in Dart
var name = 'Flutter';           // Type inferred
String language = 'Dart';       // Explicit type
final version = 3.0;            // Runtime constant
const pi = 3.14159;             // Compile-time constant

// Null Safety
String? nullableName;           // Can be null
String nonNullable = 'Hello';   // Cannot be null
late String lateInit;           // Initialized later

// Null-aware operators
String result = nullableName ?? 'Default';  // If null, use default
int? length = nullableName?.length;         // Safe access`,
      language: "dart"
    },
    {
      title: "Collections",
      code: `// List (Array)
var fruits = ['Apple', 'Banana', 'Orange'];
fruits.add('Mango');
var first = fruits[0];  // Apple

// Set (Unique values)
var uniqueNumbers = {1, 2, 3, 3};  // {1, 2, 3}

// Map (Key-Value)
var person = {
  'name': 'John',
  'age': 25,
  'city': 'NYC'
};
print(person['name']);  // John

// Spread operator
var morefruits = ['Grape', ...fruits];

// Collection if/for
var nav = [
  'Home',
  if (isLoggedIn) 'Profile',
  for (var page in pages) page.title,
];`,
      language: "dart"
    }
  ],
  2: [
    {
      title: "Classes & Constructors",
      code: `class Person {
  final String name;
  final int age;
  
  // Regular constructor
  Person(this.name, this.age);
  
  // Named constructor
  Person.guest() : name = 'Guest', age = 18;
  
  // Factory constructor
  factory Person.fromJson(Map<String, dynamic> json) {
    return Person(json['name'], json['age']);
  }
  
  void greet() => print('Hello, I am \$name');
}

void main() {
  var person = Person('John', 25);
  var guest = Person.guest();
  person.greet();
}`,
      language: "dart"
    },
    {
      title: "Inheritance & Mixins",
      code: `// Abstract class
abstract class Animal {
  void makeSound();
  void eat() => print('Eating...');
}

// Mixin
mixin Swimmer {
  void swim() => print('Swimming...');
}

mixin Flyer {
  void fly() => print('Flying...');
}

// Inheritance with mixin
class Duck extends Animal with Swimmer, Flyer {
  @override
  void makeSound() => print('Quack!');
}

void main() {
  var duck = Duck();
  duck.makeSound();  // Quack!
  duck.swim();       // Swimming...
  duck.fly();        // Flying...
}`,
      language: "dart"
    }
  ],
  3: [
    {
      title: "Futures & Async/Await",
      code: `Future<String> fetchUserData() async {
  // Simulate network delay
  await Future.delayed(Duration(seconds: 2));
  return 'User data loaded!';
}

Future<void> main() async {
  print('Fetching data...');
  
  try {
    String data = await fetchUserData();
    print(data);
  } catch (e) {
    print('Error: \$e');
  }
  
  // Using .then()
  fetchUserData()
    .then((data) => print(data))
    .catchError((e) => print('Error: \$e'));
}`,
      language: "dart"
    },
    {
      title: "Streams",
      code: `import 'dart:async';

Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

void main() async {
  // Listen to stream
  await for (var count in countStream(5)) {
    print('Count: \$count');
  }
  
  // Stream controller
  var controller = StreamController<String>();
  
  controller.stream.listen(
    (data) => print('Received: \$data'),
    onError: (e) => print('Error: \$e'),
    onDone: () => print('Stream closed'),
  );
  
  controller.add('Hello');
  controller.add('World');
  controller.close();
}`,
      language: "dart"
    }
  ],
  4: [
    {
      title: "Basic Widget Structure",
      code: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My First App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: const Center(
        child: Text('Hello, Flutter!'),
      ),
    );
  }
}`,
      language: "dart"
    },
    {
      title: "Common Layout Widgets",
      code: `// Column - Vertical layout
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Item 1'),
    Text('Item 2'),
    Text('Item 3'),
  ],
)

// Row - Horizontal layout
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Icon(Icons.star),
    Icon(Icons.star),
    Icon(Icons.star),
  ],
)

// Container - Box with styling
Container(
  width: 200,
  height: 100,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.black26,
        blurRadius: 10,
        offset: Offset(0, 4),
      ),
    ],
  ),
  child: Text('Styled Box'),
)`,
      language: "dart"
    }
  ],
  5: [
    {
      title: "Expanded & Flexible",
      code: `Row(
  children: [
    // Takes 2/3 of available space
    Expanded(
      flex: 2,
      child: Container(
        color: Colors.blue,
        height: 100,
        child: Center(child: Text('Flex 2')),
      ),
    ),
    // Takes 1/3 of available space
    Expanded(
      flex: 1,
      child: Container(
        color: Colors.red,
        height: 100,
        child: Center(child: Text('Flex 1')),
      ),
    ),
  ],
)

// Flexible - can shrink smaller than flex ratio
Row(
  children: [
    Flexible(
      fit: FlexFit.loose,
      child: Container(
        color: Colors.green,
        child: Text('I can be smaller'),
      ),
    ),
  ],
)`,
      language: "dart"
    },
    {
      title: "ListView.builder",
      code: `class RecipeList extends StatelessWidget {
  final List<String> recipes = [
    'Pasta', 'Pizza', 'Salad', 'Soup', 'Burger'
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: recipes.length,
      itemBuilder: (context, index) {
        return ListTile(
          leading: CircleAvatar(
            child: Text('\${index + 1}'),
          ),
          title: Text(recipes[index]),
          subtitle: Text('Delicious recipe'),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: () {
            // Navigate to detail
          },
        );
      },
    );
  }
}`,
      language: "dart"
    }
  ],
  6: [
    {
      title: "StatefulWidget & setState",
      code: `class CounterWidget extends StatefulWidget {
  const CounterWidget({super.key});

  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Count: \$_counter',
          style: TextStyle(fontSize: 24),
        ),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`,
      language: "dart"
    },
    {
      title: "TextEditingController & Forms",
      code: `class LoginForm extends StatefulWidget {
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      print('Email: \${_emailController.text}');
      print('Password: \${_passwordController.text}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            validator: (value) =>
              value!.isEmpty ? 'Enter email' : null,
            decoration: InputDecoration(labelText: 'Email'),
          ),
          TextFormField(
            controller: _passwordController,
            obscureText: true,
            validator: (value) =>
              value!.length < 6 ? 'Min 6 chars' : null,
            decoration: InputDecoration(labelText: 'Password'),
          ),
          ElevatedButton(
            onPressed: _submit,
            child: Text('Login'),
          ),
        ],
      ),
    );
  }
}`,
      language: "dart"
    }
  ],
  7: [
    {
      title: "Navigator Push & Pop",
      code: `// Navigate to new screen
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailScreen(item: item),
  ),
);

// Go back
Navigator.pop(context);

// Push and remove all previous routes
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (context) => HomeScreen()),
  (route) => false,
);

// Push replacement (replaces current route)
Navigator.pushReplacement(
  context,
  MaterialPageRoute(builder: (context) => NewScreen()),
);`,
      language: "dart"
    },
    {
      title: "Named Routes",
      code: `// Define routes in MaterialApp
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => HomeScreen(),
    '/details': (context) => DetailScreen(),
    '/settings': (context) => SettingsScreen(),
  },
)

// Navigate using named route
Navigator.pushNamed(context, '/details');

// Pass arguments
Navigator.pushNamed(
  context,
  '/details',
  arguments: {'id': 123, 'title': 'Item'},
);

// Receive arguments in destination
class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map;
    return Scaffold(
      body: Text('Item ID: \${args['id']}'),
    );
  }
}`,
      language: "dart"
    }
  ],
  8: [
    {
      title: "HTTP GET Request",
      code: `import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'https://api.example.com';

  Future<List<User>> fetchUsers() async {
    final response = await http.get(
      Uri.parse('\$baseUrl/users'),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => User.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load users');
    }
  }
}

class User {
  final int id;
  final String name;
  final String email;

  User({required this.id, required this.name, required this.email});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}`,
      language: "dart"
    },
    {
      title: "FutureBuilder",
      code: `class UserListScreen extends StatelessWidget {
  final ApiService apiService = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Users')),
      body: FutureBuilder<List<User>>(
        future: apiService.fetchUsers(),
        builder: (context, snapshot) {
          // Loading state
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          
          // Error state
          if (snapshot.hasError) {
            return Center(
              child: Text('Error: \${snapshot.error}'),
            );
          }
          
          // Success state
          final users = snapshot.data!;
          return ListView.builder(
            itemCount: users.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(users[index].name),
                subtitle: Text(users[index].email),
              );
            },
          );
        },
      ),
    );
  }
}`,
      language: "dart"
    }
  ],
  9: [
    {
      title: "Riverpod Provider",
      code: `import 'package:flutter_riverpod/flutter_riverpod.dart';

// Simple state provider
final counterProvider = StateProvider<int>((ref) => 0);

// StateNotifier for complex state
class CartNotifier extends StateNotifier<List<Item>> {
  CartNotifier() : super([]);

  void addItem(Item item) {
    state = [...state, item];
  }

  void removeItem(String id) {
    state = state.where((item) => item.id != id).toList();
  }

  double get total => state.fold(0, (sum, item) => sum + item.price);
}

final cartProvider = StateNotifierProvider<CartNotifier, List<Item>>(
  (ref) => CartNotifier(),
);

// Usage in widget
class CartScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartProvider);
    final cartNotifier = ref.read(cartProvider.notifier);

    return ListView.builder(
      itemCount: cart.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(cart[index].name),
          trailing: IconButton(
            icon: Icon(Icons.delete),
            onPressed: () => cartNotifier.removeItem(cart[index].id),
          ),
        );
      },
    );
  }
}`,
      language: "dart"
    },
    {
      title: "AsyncNotifier Pattern",
      code: `// Async data fetching with Riverpod
final usersProvider = AsyncNotifierProvider<UsersNotifier, List<User>>(
  UsersNotifier.new,
);

class UsersNotifier extends AsyncNotifier<List<User>> {
  @override
  Future<List<User>> build() async {
    return await _fetchUsers();
  }

  Future<List<User>> _fetchUsers() async {
    final response = await http.get(Uri.parse('/api/users'));
    return (json.decode(response.body) as List)
        .map((e) => User.fromJson(e))
        .toList();
  }

  Future<void> addUser(User user) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await http.post(Uri.parse('/api/users'), body: user.toJson());
      return _fetchUsers();
    });
  }
}`,
      language: "dart"
    }
  ],
  10: [
    {
      title: "SharedPreferences",
      code: `import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static late SharedPreferences _prefs;

  static Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  // Save data
  static Future<void> setString(String key, String value) async {
    await _prefs.setString(key, value);
  }

  static Future<void> setBool(String key, bool value) async {
    await _prefs.setBool(key, value);
  }

  static Future<void> setInt(String key, int value) async {
    await _prefs.setInt(key, value);
  }

  // Read data
  static String? getString(String key) => _prefs.getString(key);
  static bool? getBool(String key) => _prefs.getBool(key);
  static int? getInt(String key) => _prefs.getInt(key);

  // Delete data
  static Future<void> remove(String key) async {
    await _prefs.remove(key);
  }
}`,
      language: "dart"
    },
    {
      title: "Hive Database",
      code: `import 'package:hive_flutter/hive_flutter.dart';

// Model with TypeAdapter
@HiveType(typeId: 0)
class Task extends HiveObject {
  @HiveField(0)
  late String id;

  @HiveField(1)
  late String title;

  @HiveField(2)
  late bool isDone;
}

// Initialize Hive
Future<void> main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(TaskAdapter());
  await Hive.openBox<Task>('tasks');
  runApp(MyApp());
}

// CRUD Operations
class TaskRepository {
  final Box<Task> _box = Hive.box<Task>('tasks');

  List<Task> getAllTasks() => _box.values.toList();

  Future<void> addTask(Task task) async {
    await _box.put(task.id, task);
  }

  Future<void> updateTask(Task task) async {
    await task.save();
  }

  Future<void> deleteTask(String id) async {
    await _box.delete(id);
  }
}`,
      language: "dart"
    }
  ],
  11: [
    {
      title: "Clean Architecture Structure",
      code: `// lib/
// ├── core/
// │   ├── error/
// │   │   ├── failures.dart
// │   │   └── exceptions.dart
// │   └── usecases/
// │       └── usecase.dart
// ├── features/
// │   └── weather/
// │       ├── data/
// │       │   ├── datasources/
// │       │   ├── models/
// │       │   └── repositories/
// │       ├── domain/
// │       │   ├── entities/
// │       │   ├── repositories/
// │       │   └── usecases/
// │       └── presentation/
// │           ├── bloc/
// │           ├── pages/
// │           └── widgets/

// Domain Entity
class Weather {
  final double temperature;
  final String condition;
  final String city;

  Weather({
    required this.temperature,
    required this.condition,
    required this.city,
  });
}

// Repository Interface (Domain)
abstract class WeatherRepository {
  Future<Either<Failure, Weather>> getWeather(String city);
}`,
      language: "dart"
    },
    {
      title: "Use Case Pattern",
      code: `import 'package:dartz/dartz.dart';

// Base UseCase
abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class NoParams {}

// Concrete UseCase
class GetWeather implements UseCase<Weather, GetWeatherParams> {
  final WeatherRepository repository;

  GetWeather(this.repository);

  @override
  Future<Either<Failure, Weather>> call(GetWeatherParams params) {
    return repository.getWeather(params.city);
  }
}

class GetWeatherParams {
  final String city;
  GetWeatherParams({required this.city});
}

// Usage in Bloc/Controller
class WeatherBloc extends Bloc<WeatherEvent, WeatherState> {
  final GetWeather getWeather;

  WeatherBloc({required this.getWeather}) : super(WeatherInitial()) {
    on<FetchWeather>((event, emit) async {
      emit(WeatherLoading());
      final result = await getWeather(
        GetWeatherParams(city: event.city),
      );
      result.fold(
        (failure) => emit(WeatherError(failure.message)),
        (weather) => emit(WeatherLoaded(weather)),
      );
    });
  }
}`,
      language: "dart"
    }
  ],
  12: [
    {
      title: "Firebase Auth",
      code: `import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Auth state stream
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Current user
  User? get currentUser => _auth.currentUser;

  // Sign up with email
  Future<UserCredential> signUp(String email, String password) async {
    return await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  // Sign in with email
  Future<UserCredential> signIn(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  // Sign in with Google
  Future<UserCredential> signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
    final GoogleSignInAuthentication? googleAuth = 
        await googleUser?.authentication;
    
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );
    
    return await _auth.signInWithCredential(credential);
  }

  // Sign out
  Future<void> signOut() async => await _auth.signOut();
}`,
      language: "dart"
    },
    {
      title: "Firestore CRUD",
      code: `import 'package:cloud_firestore/cloud_firestore.dart';

class ChatService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Get messages stream
  Stream<List<Message>> getMessages(String chatId) {
    return _db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => Message.fromFirestore(doc))
            .toList());
  }

  // Send message
  Future<void> sendMessage(String chatId, Message message) async {
    await _db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message.toMap());
  }

  // Delete message
  Future<void> deleteMessage(String chatId, String messageId) async {
    await _db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .doc(messageId)
        .delete();
  }
}

// Usage with StreamBuilder
StreamBuilder<List<Message>>(
  stream: ChatService().getMessages(chatId),
  builder: (context, snapshot) {
    if (!snapshot.hasData) return CircularProgressIndicator();
    return ListView.builder(
      itemCount: snapshot.data!.length,
      itemBuilder: (context, index) => MessageBubble(snapshot.data![index]),
    );
  },
)`,
      language: "dart"
    }
  ],
  13: [
    {
      title: "Implicit Animations",
      code: `class AnimatedBox extends StatefulWidget {
  @override
  _AnimatedBoxState createState() => _AnimatedBoxState();
}

class _AnimatedBoxState extends State<AnimatedBox> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => _isExpanded = !_isExpanded),
      child: AnimatedContainer(
        duration: Duration(milliseconds: 500),
        curve: Curves.easeInOut,
        width: _isExpanded ? 200 : 100,
        height: _isExpanded ? 200 : 100,
        decoration: BoxDecoration(
          color: _isExpanded ? Colors.blue : Colors.red,
          borderRadius: BorderRadius.circular(_isExpanded ? 50 : 10),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              blurRadius: _isExpanded ? 20 : 5,
              offset: Offset(0, _isExpanded ? 10 : 2),
            ),
          ],
        ),
        child: Center(
          child: AnimatedOpacity(
            duration: Duration(milliseconds: 300),
            opacity: _isExpanded ? 1.0 : 0.5,
            child: Icon(Icons.star, color: Colors.white, size: 40),
          ),
        ),
      ),
    );
  }
}`,
      language: "dart"
    },
    {
      title: "Hero Animation",
      code: `// List Screen
class ListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () => Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => DetailScreen(index: index),
            ),
          ),
          child: Hero(
            tag: 'image-\$index',
            child: Image.network(
              'https://picsum.photos/200?random=\$index',
              fit: BoxFit.cover,
            ),
          ),
        );
      },
    );
  }
}

// Detail Screen
class DetailScreen extends StatelessWidget {
  final int index;
  DetailScreen({required this.index});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Hero(
          tag: 'image-\$index',
          child: Image.network(
            'https://picsum.photos/600?random=\$index',
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}`,
      language: "dart"
    }
  ],
  14: [
    {
      title: "Unit Testing",
      code: `import 'package:flutter_test/flutter_test.dart';

// Function to test
int add(int a, int b) => a + b;

class Calculator {
  int multiply(int a, int b) => a * b;
  double divide(int a, int b) {
    if (b == 0) throw ArgumentError('Cannot divide by zero');
    return a / b;
  }
}

void main() {
  group('Calculator Tests', () {
    late Calculator calculator;

    setUp(() {
      calculator = Calculator();
    });

    test('add should return sum of two numbers', () {
      expect(add(2, 3), equals(5));
      expect(add(-1, 1), equals(0));
    });

    test('multiply should return product', () {
      expect(calculator.multiply(3, 4), equals(12));
    });

    test('divide should throw on zero', () {
      expect(
        () => calculator.divide(10, 0),
        throwsA(isA<ArgumentError>()),
      );
    });

    test('divide should return correct result', () {
      expect(calculator.divide(10, 2), equals(5.0));
    });
  });
}`,
      language: "dart"
    },
    {
      title: "Widget Testing",
      code: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$count', key: Key('counter_text')),
        ElevatedButton(
          key: Key('increment_button'),
          onPressed: () => setState(() => count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}

void main() {
  testWidgets('Counter increments on tap', (WidgetTester tester) async {
    // Build widget
    await tester.pumpWidget(MaterialApp(home: CounterWidget()));

    // Verify initial state
    expect(find.text('Count: 0'), findsOneWidget);
    expect(find.text('Count: 1'), findsNothing);

    // Tap button
    await tester.tap(find.byKey(Key('increment_button')));
    await tester.pump();

    // Verify state changed
    expect(find.text('Count: 1'), findsOneWidget);
    expect(find.text('Count: 0'), findsNothing);
  });
}`,
      language: "dart"
    }
  ],
  15: [
    {
      title: "App Icon Generation",
      code: `# pubspec.yaml
dev_dependencies:
  flutter_launcher_icons: ^0.13.1

flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icon/app_icon.png"
  min_sdk_android: 21
  adaptive_icon_background: "#ffffff"
  adaptive_icon_foreground: "assets/icon/app_icon_foreground.png"

# Run command:
# flutter pub run flutter_launcher_icons

# For native splash screen:
dev_dependencies:
  flutter_native_splash: ^2.3.5

flutter_native_splash:
  color: "#42a5f5"
  image: assets/splash.png
  android: true
  ios: true

# Run command:
# flutter pub run flutter_native_splash:create`,
      language: "yaml"
    },
    {
      title: "Release Build Commands",
      code: `# Android Release Build

# Generate keystore (first time only)
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# Create key.properties file in android/
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=<path-to-keystore>

# Build APK
flutter build apk --release

# Build App Bundle (recommended for Play Store)
flutter build appbundle --release

# iOS Release Build

# Open in Xcode
open ios/Runner.xcworkspace

# Build iOS archive
flutter build ios --release

# Then archive in Xcode:
# Product > Archive

# Analyze APK size
flutter build apk --analyze-size

# Enable obfuscation
flutter build apk --obfuscate --split-debug-info=build/debug-info`,
      language: "bash"
    }
  ]
};

// --- TIPS DATA ---
const TIPS_DATA = {
  1: [
    { icon: "💡", tip: "Use 'final' by default. Only use 'var' when you need to reassign." },
    { icon: "⚡", tip: "Prefer 'const' constructors for widgets to improve performance." },
    { icon: "🎯", tip: "Enable null safety and avoid using '!' unless absolutely necessary." },
    { icon: "📝", tip: "Use string interpolation: '$variable' instead of concatenation." }
  ],
  2: [
    { icon: "🏗️", tip: "Prefer composition over inheritance in most cases." },
    { icon: "🔒", tip: "Make fields private with '_' and expose through getters." },
    { icon: "📦", tip: "Use factory constructors for singleton patterns." },
    { icon: "🎨", tip: "Use mixins to share behavior between unrelated classes." }
  ],
  3: [
    { icon: "⏳", tip: "Always handle errors in async code with try-catch blocks." },
    { icon: "🔄", tip: "Use async/await instead of .then() for cleaner code." },
    { icon: "📡", tip: "Cancel subscriptions to Streams in dispose() to prevent memory leaks." },
    { icon: "🚀", tip: "Use Future.wait() to run multiple async operations in parallel." }
  ],
  4: [
    { icon: "🚀", tip: "Use 'const' widgets whenever possible for better performance." },
    { icon: "📱", tip: "Always test on both iOS and Android devices." },
    { icon: "🎨", tip: "Use Theme.of(context) for consistent styling." },
    { icon: "♻️", tip: "Extract repeated widgets into separate classes." }
  ],
  5: [
    { icon: "📐", tip: "Use Expanded and Flexible to avoid overflow errors." },
    { icon: "📱", tip: "Always wrap scrollable content in a SingleChildScrollView or ListView." },
    { icon: "🎯", tip: "Use MediaQuery.of(context).size for responsive layouts." },
    { icon: "⚡", tip: "Use ListView.builder for long lists - it's more efficient." }
  ],
  6: [
    { icon: "🔄", tip: "Call setState() only when state actually changes." },
    { icon: "🧹", tip: "Always dispose TextEditingControllers in dispose()." },
    { icon: "📋", tip: "Use GlobalKey<FormState> for form validation." },
    { icon: "⚡", tip: "Minimize the widget tree that rebuilds on setState()." }
  ],
  7: [
    { icon: "🧭", tip: "Use named routes for cleaner navigation code." },
    { icon: "📦", tip: "Pass data through constructor arguments, not global state." },
    { icon: "🔙", tip: "Handle the back button behavior with WillPopScope." },
    { icon: "🚀", tip: "Consider GoRouter for complex navigation requirements." }
  ],
  8: [
    { icon: "🌐", tip: "Always handle loading, error, and success states." },
    { icon: "📦", tip: "Create model classes with fromJson() factory constructors." },
    { icon: "🔄", tip: "Use FutureBuilder for simple async UI patterns." },
    { icon: "⚡", tip: "Cache API responses when appropriate to improve UX." }
  ],
  9: [
    { icon: "📊", tip: "Use ref.watch() for reactive rebuilds, ref.read() for one-time reads." },
    { icon: "🏗️", tip: "Keep state immutable - use copyWith() pattern." },
    { icon: "🎯", tip: "Create separate providers for different features." },
    { icon: "🧪", tip: "Riverpod makes testing easier with ProviderContainer." }
  ],
  10: [
    { icon: "💾", tip: "Use SharedPreferences for simple key-value storage only." },
    { icon: "📦", tip: "Hive is faster than SQLite for most Flutter use cases." },
    { icon: "🔐", tip: "Use flutter_secure_storage for sensitive data like tokens." },
    { icon: "🗂️", tip: "Implement a Repository pattern to abstract storage details." }
  ],
  11: [
    { icon: "🏛️", tip: "Keep domain layer independent of frameworks." },
    { icon: "🔌", tip: "Use dependency injection for loose coupling." },
    { icon: "📋", tip: "Define repository interfaces in domain, implement in data layer." },
    { icon: "🧪", tip: "Clean architecture makes unit testing much easier." }
  ],
  12: [
    { icon: "🔥", tip: "Always configure Firebase security rules before going live." },
    { icon: "📡", tip: "Use StreamBuilder with Firestore for real-time updates." },
    { icon: "🔐", tip: "Never expose Firebase API keys in client code." },
    { icon: "💰", tip: "Monitor Firestore reads to control costs." }
  ],
  13: [
    { icon: "✨", tip: "Use implicit animations (Animated*) for simple effects." },
    { icon: "🎬", tip: "AnimationController needs TickerProviderStateMixin." },
    { icon: "🦸", tip: "Hero animations only work between two routes." },
    { icon: "📱", tip: "Test animations on low-end devices for performance." }
  ],
  14: [
    { icon: "🧪", tip: "Aim for 80% code coverage with unit tests." },
    { icon: "🔧", tip: "Use Mockito to mock dependencies in tests." },
    { icon: "📱", tip: "Widget tests are faster than integration tests." },
    { icon: "🚀", tip: "Set up CI/CD early in your project." }
  ],
  15: [
    { icon: "📦", tip: "Use App Bundle (.aab) instead of APK for Play Store." },
    { icon: "🔐", tip: "Keep your keystore file safe - you can't recover it!" },
    { icon: "📸", tip: "Prepare high-quality screenshots before submission." },
    { icon: "📝", tip: "Write compelling app descriptions with keywords." }
  ]
};

// --- FLASHCARDS DATA ---
const FLASHCARDS_DATA = [
  { id: 1, front: "What is the difference between 'var' and 'dynamic'?", back: "'var' infers type at compile-time and is fixed. 'dynamic' allows type to change at runtime.", category: "Dart Basics", difficulty: "Easy" },
  { id: 2, front: "What does the '??' operator do?", back: "Null-coalescing operator. Returns left value if not null, otherwise returns right value. Example: name ?? 'Guest'", category: "Dart Basics", difficulty: "Easy" },
  { id: 3, front: "What is a Future in Dart?", back: "A Future represents a potential value or error that will be available at some time in the future. Used for async operations.", category: "Async", difficulty: "Medium" },
  { id: 4, front: "Difference between 'extends' and 'implements'?", back: "'extends' inherits implementation (single inheritance). 'implements' requires you to provide all implementations (can implement multiple).", category: "OOP", difficulty: "Medium" },
  { id: 5, front: "What is a mixin in Dart?", back: "A mixin is a way to reuse code in multiple class hierarchies using the 'with' keyword. Cannot be instantiated directly.", category: "OOP", difficulty: "Hard" },
  { id: 6, front: "What is the Widget tree?", back: "Flutter builds UI as a tree of widgets. Each widget describes part of the UI. The tree is rebuilt on state changes.", category: "Flutter", difficulty: "Easy" },
  { id: 7, front: "StatelessWidget vs StatefulWidget?", back: "StatelessWidget: Immutable, no internal state. StatefulWidget: Mutable state that triggers rebuilds when changed.", category: "Flutter", difficulty: "Easy" },
  { id: 8, front: "What is BuildContext?", back: "BuildContext is a handle to the location of a widget in the widget tree. Used to access theme, navigator, and inherited widgets.", category: "Flutter", difficulty: "Medium" },
  { id: 9, front: "What is setState()?", back: "setState() notifies Flutter that state has changed and schedules a rebuild of the widget. Only call inside StatefulWidget.", category: "Flutter", difficulty: "Easy" },
  { id: 10, front: "What is the purpose of Keys in Flutter?", back: "Keys preserve state when widgets move around in the tree. Important for lists and animations.", category: "Flutter", difficulty: "Hard" },
  { id: 11, front: "What is a Stream?", back: "A Stream is a sequence of asynchronous events. Like a pipe that delivers data over time. Can be single or broadcast.", category: "Async", difficulty: "Medium" },
  { id: 12, front: "What is the cascade notation (..)?", back: "Allows multiple operations on the same object without repeating the object name. Example: object..method1()..method2()", category: "Dart Basics", difficulty: "Easy" },
  { id: 13, front: "What is Navigator in Flutter?", back: "Navigator manages a stack of routes (screens). push() adds a route, pop() removes. Used for screen navigation.", category: "Flutter", difficulty: "Medium" },
  { id: 14, front: "What is a const constructor?", back: "Creates a compile-time constant object. All fields must be final. Improves performance by reusing instances.", category: "Flutter", difficulty: "Medium" },
  { id: 15, front: "What are Inherited Widgets?", back: "Widgets that efficiently propagate data down the tree. Provider and Theme use them internally.", category: "Flutter", difficulty: "Hard" },
];

// --- ACHIEVEMENTS DATA ---
const ACHIEVEMENTS = [
  { id: 'first_topic', title: 'First Steps', desc: 'Complete your first topic', icon: Star, color: 'from-yellow-500 to-orange-500', condition: 'topics', value: 1 },
  { id: 'five_topics', title: 'Getting Started', desc: 'Complete 5 topics', icon: Flame, color: 'from-orange-500 to-red-500', condition: 'topics', value: 5 },
  { id: 'ten_topics', title: 'Dedicated Learner', desc: 'Complete 10 topics', icon: BookOpen, color: 'from-blue-500 to-indigo-500', condition: 'topics', value: 10 },
  { id: 'one_module', title: 'Module Master', desc: 'Complete your first module', icon: Award, color: 'from-blue-500 to-cyan-500', condition: 'modules', value: 1 },
  { id: 'three_modules', title: 'Trilogy Complete', desc: 'Complete 3 modules', icon: Medal, color: 'from-emerald-500 to-teal-500', condition: 'modules', value: 3 },
  { id: 'streak_3', title: 'Consistent', desc: '3-day learning streak', icon: Flame, color: 'from-orange-400 to-red-400', condition: 'streak', value: 3 },
  { id: 'streak_7', title: 'Week Warrior', desc: '7-day learning streak', icon: Flame, color: 'from-red-500 to-orange-500', condition: 'streak', value: 7 },
  { id: 'half_way', title: 'Half Way There', desc: 'Complete 50% of curriculum', icon: Target, color: 'from-green-500 to-emerald-500', condition: 'percent', value: 50 },
  { id: 'master', title: 'Flutter Master', desc: 'Complete all modules', icon: Crown, color: 'from-yellow-400 to-yellow-600', condition: 'percent', value: 100 },
  { id: 'bookworm', title: 'Bookworm', desc: 'Bookmark 5 topics', icon: Bookmark, color: 'from-pink-500 to-rose-500', condition: 'bookmarks', value: 5 },
  { id: 'flashcard_master', title: 'Flash Master', desc: 'Review 20 flashcards', icon: Zap, color: 'from-cyan-500 to-blue-500', condition: 'flashcards', value: 20 },
  { id: 'note_taker', title: 'Note Taker', desc: 'Add notes to 3 modules', icon: StickyNote, color: 'from-amber-500 to-yellow-500', condition: 'notes', value: 3 },
];

// --- DAILY CHALLENGES ---
const DAILY_CHALLENGES = [
  { id: 1, title: "Code a Counter", desc: "Build a counter app with increment/decrement", xp: 50, hint: "Use StatefulWidget and setState()" },
  { id: 2, title: "Style Challenge", desc: "Create a profile card with shadows and gradients", xp: 75, hint: "Use Container with BoxDecoration" },
  { id: 3, title: "List Builder", desc: "Display a scrollable list of 100 items", xp: 60, hint: "Use ListView.builder for performance" },
  { id: 4, title: "Navigation Pro", desc: "Implement 3-screen navigation with data passing", xp: 100, hint: "Use Navigator.push with arguments" },
  { id: 5, title: "API Fetch", desc: "Fetch and display data from a public API", xp: 120, hint: "Use http package and FutureBuilder" },
  { id: 6, title: "Form Validator", desc: "Create a login form with validation", xp: 80, hint: "Use Form widget with GlobalKey<FormState>" },
  { id: 7, title: "Theme Switcher", desc: "Implement dark/light theme toggle", xp: 90, hint: "Use ThemeData and Provider or setState" },
];

// --- ROADMAP DATA ---
const ROADMAP_DATA = [
  {
    id: 1,
    title: "Dart Fundamentals",
    subtitle: "Module 1: Language Basics",
    time: "10-15 Hours",
    icon: Terminal,
    difficulty: "Beginner",
    desc: "Master the Dart language syntax, types, and logic flow before touching Flutter widgets.",
    curriculum: [
      { id: "1-1", text: "Variables (var, final, const, late) & Null Safety Basics" },
      { id: "1-2", text: "Built-in Types: int, double, String, bool" },
      { id: "1-3", text: "Control Flow: if-else, switch case, ternary operator" },
      { id: "1-4", text: "Loops: for, for-in, while, do-while" },
      { id: "1-5", text: "Functions: Named params {}, Optional [], Arrow syntax =>" },
      { id: "1-6", text: "Lists, Sets, and Maps basics" }
    ],
    project: {
      title: "CLI Temperature Converter",
      brief: "Build a console app that accepts user input and converts temperatures.",
      requirements: [
        "Accept input: 32 F",
        "Convert to Celsius and Kelvin",
        "Use a switch statement for unit selection",
        "Handle invalid inputs (try/parse)",
        "Loop until user types 'exit'"
      ],
      snippet: `import 'dart:io';\n\nvoid main() {\n  print("Enter temp (e.g., 32 F):");\n  String? input = stdin.readLineSync();\n  // Logic here...\n}`
    },
    resources: [
      { type: "video", title: "Dart Course for Beginners", url: "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q" },
      { type: "doc", title: "Dart Language Tour", url: "https://dart.dev/guides/language/language-tour" }
    ]
  },
  {
    id: 2,
    title: "Object-Oriented Dart",
    subtitle: "Module 2: Architecture",
    time: "12 Hours",
    icon: Layers,
    difficulty: "Intermediate",
    desc: "Learn how to structure code using Classes, Enums, and advanced collections.",
    curriculum: [
      { id: "2-1", text: "Class Syntax, Objects, & Constructors" },
      { id: "2-2", text: "Named Constructors & Factory Constructors" },
      { id: "2-3", text: "Inheritance (extends) & Method Overriding" },
      { id: "2-4", text: "Abstract Classes vs Interfaces (implements)" },
      { id: "2-5", text: "Mixins (with keyword)" },
      { id: "2-6", text: "Advanced Collection Methods: .map(), .where(), .reduce()" }
    ],
    project: {
      title: "LMS (Library Management System)",
      brief: "A complex console app managing books and members.",
      requirements: [
        "Create Book class (id, title, borrowedBy)",
        "Create User class (id, name)",
        "Create Library class to manage lists",
        "Methods: lendBook(), returnBook(), searchByTitle()",
        "Use .where() to find available books"
      ],
      snippet: `class Book {\n  final String id;\n  String title;\n  bool isBorrowed;\n  Book(this.id, this.title, {this.isBorrowed = false});\n}`
    },
    resources: [
      { type: "video", title: "Dart OOP Explanation", url: "https://www.youtube.com/watch?v=Apz7r9tqg_U" },
      { type: "doc", title: "Effective Dart: Usage", url: "https://dart.dev/guides/language/effective-dart/usage" }
    ]
  },
  {
    id: 3,
    title: "Async Dart & Futures",
    subtitle: "Module 3: Asynchronous Programming",
    time: "10 Hours",
    icon: Activity,
    difficulty: "Hard",
    desc: "Understanding asynchronous code is crucial for API calls and file IO.",
    curriculum: [
      { id: "3-1", text: "The Event Loop explanation" },
      { id: "3-2", text: "Future<T> class & Future.delayed" },
      { id: "3-3", text: "async and await keywords" },
      { id: "3-4", text: "Streams & StreamController (Basics)" },
      { id: "3-5", text: "Error Handling: try-catch-finally in async" }
    ],
    project: {
      title: "Mock Data Fetcher",
      brief: "Simulate a slow network request and process data.",
      requirements: [
        "Create a function `fetchUser()` that returns Future",
        "Use Future.delayed to wait 2 seconds",
        "Return a Map (JSON) or throw an error randomly",
        "Handle the error gracefully in main()",
        "Bonus: Listen to a Stream of integers (countdown)"
      ],
      snippet: `Future<String> fetchUser() async {\n  await Future.delayed(Duration(seconds: 2));\n  return "User Data Loaded";\n}`
    },
    resources: [
      { type: "doc", title: "Asynchronous programming", url: "https://dart.dev/codelabs/async-await" }
    ]
  },
  {
    id: 4,
    title: "Flutter Basics",
    subtitle: "Module 4: UI Development",
    time: "15 Hours",
    icon: Zap,
    difficulty: "Beginner",
    desc: "Setup Flutter and understand the Widget Tree philosophy.",
    curriculum: [
      { id: "4-1", text: "MaterialApp & Scaffold Structure" },
      { id: "4-2", text: "Container, SizedBox, Padding, Margin" },
      { id: "4-3", text: "Row, Column, and Main/Cross Axis Alignment" },
      { id: "4-4", text: "StatelessWidget vs StatefulWidget (Theory)" },
      { id: "4-5", text: "Text, Icon, & Image (Asset/Network) widgets" },
      { id: "4-6", text: "CircleAvatar & Card widgets" }
    ],
    project: {
      title: "Digital Identity Card",
      brief: "A static UI profile page.",
      requirements: [
        "Use a Column for vertical layout",
        "CircleAvatar for profile pic",
        "Custom Fonts (Google Fonts)",
        "Card widgets for Email/Phone",
        "No hardcoded pixels! Use padding."
      ],
      snippet: `Scaffold(\n  body: Column(\n    children: [\n      CircleAvatar(radius: 50),\n      Text("Name"),\n    ],\n  ),\n)`
    },
    resources: [
      { type: "doc", title: "Layouts in Flutter", url: "https://docs.flutter.dev/ui/layout" },
      { type: "video", title: "Flutter Widget of the Week", url: "https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG" }
    ]
  },
  {
    id: 5,
    title: "Responsive Layouts",
    subtitle: "Module 5: Adaptive UI",
    time: "12 Hours",
    icon: Layers,
    difficulty: "Intermediate",
    desc: "Make apps look good on all screens using scrollable and flexible widgets.",
    curriculum: [
      { id: "5-1", text: "Expanded vs Flexible" },
      { id: "5-2", text: "ListView & ListView.builder (Performance)" },
      { id: "5-3", text: "GridView.builder & SliverGridDelegate" },
      { id: "5-4", text: "MediaQuery & LayoutBuilder" },
      { id: "5-5", text: "SafeArea & SingleChildScrollView" }
    ],
    project: {
      title: "Recipe Gallery",
      brief: "A scrollable list/grid of recipes.",
      requirements: [
        "Home: GridView of recipe images",
        "Detail: Scrollable Column with ingredients",
        "Use Expanded to fill space",
        "Ensure it scrolls without overflow errors"
      ],
      snippet: `ListView.builder(\n  itemCount: recipes.length,\n  itemBuilder: (context, index) {\n    return RecipeCard(recipes[index]);\n  },\n)`
    },
    resources: [
      { type: "doc", title: "Building Scrolling UI", url: "https://docs.flutter.dev/ui/layout/scrolling" }
    ]
  },
  {
    id: 6,
    title: "State & Interactivity",
    subtitle: "Module 6: Dynamic UI",
    time: "15 Hours",
    icon: Cpu,
    difficulty: "Hard",
    desc: "Handling user input and updating the UI dynamically.",
    curriculum: [
      { id: "6-1", text: "StatefulWidget Lifecycle (initState, dispose)" },
      { id: "6-2", text: "setState() mechanics" },
      { id: "6-3", text: "TextEditingController & Input Fields" },
      { id: "6-4", text: "GestureDetector & InkWell" },
      { id: "6-5", text: "Forms & GlobalKey Validation" }
    ],
    project: {
      title: "BMI Calculator",
      brief: "Interactive calculator with sliders and custom buttons.",
      requirements: [
        "Custom Gender Selector (Male/Female)",
        "Slider for Height",
        "Plus/Minus buttons for Weight/Age",
        "Calculate Logic: weight / height^2",
        "Update UI immediately on change"
      ],
      snippet: `setState(() {\n  weight++;\n});`
    },
    resources: [
      { type: "video", title: "StatefulWidget Lifecycle", url: "https://www.youtube.com/watch?v=aqtDqT7eKQI" }
    ]
  },
  {
    id: 7,
    title: "Navigation & Routing",
    subtitle: "Module 7: App Structure",
    time: "10 Hours",
    icon: ExternalLink,
    difficulty: "Intermediate",
    desc: "Moving between screens and passing data.",
    curriculum: [
      { id: "7-1", text: "Navigator.push & .pop" },
      { id: "7-2", text: "Named Routes vs Anonymous Routes" },
      { id: "7-3", text: "Passing Arguments to routes" },
      { id: "7-4", text: "GoRouter Package (Industry Standard)" },
      { id: "7-5", text: "BottomNavigationBar & Drawer" }
    ],
    project: {
      title: "Expense Tracker UI",
      brief: "Multi-screen app with navigation structure.",
      requirements: [
        "Screen 1: Dashboard with BottomNav",
        "Screen 2: Add Expense (Modal or New Page)",
        "Screen 3: Settings (Drawer)",
        "Pass new expense data back to dashboard"
      ],
      snippet: `Navigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => SecondScreen()),\n);`
    },
    resources: [
      { type: "doc", title: "Navigation Cookbook", url: "https://docs.flutter.dev/cookbook/navigation" }
    ]
  },
  {
    id: 8,
    title: "API & Networking",
    subtitle: "Module 8: Backend Communication",
    time: "18 Hours",
    icon: Zap,
    difficulty: "Hard",
    desc: "Fetching data from the internet using HTTP protocols.",
    curriculum: [
      { id: "8-1", text: "REST API concepts (GET, POST)" },
      { id: "8-2", text: "http vs dio packages" },
      { id: "8-3", text: "JSON Parsing (dart:convert)" },
      { id: "8-4", text: "Handling Loading/Error States" },
      { id: "8-5", text: "FutureBuilder Widget" }
    ],
    project: {
      title: "Crypto Ticker / News App",
      brief: "Live data feed from a public API.",
      requirements: [
        "Fetch data from CoinGecko or NewsAPI",
        "Model Class with .fromJson() factory",
        "Show Loading Spinner while fetching",
        "Show Error Widget if offline",
        "Pull-to-refresh"
      ],
      snippet: `final response = await http.get(Uri.parse(url));\nif (response.statusCode == 200) {\n  // Parse JSON\n}`
    },
    resources: [
      { type: "doc", title: "Fetch data from internet", url: "https://docs.flutter.dev/cookbook/networking/fetch-data" }
    ]
  },
  {
    id: 9,
    title: "State Management",
    subtitle: "Module 9: Riverpod & Provider",
    time: "20 Hours",
    icon: Layers,
    difficulty: "Expert",
    desc: "Managing app-wide state efficiently without setState drill.",
    curriculum: [
      { id: "9-1", text: "Why we need State Management?" },
      { id: "9-2", text: "Riverpod Basics (ProviderScope, Consumer)" },
      { id: "9-3", text: "StateProvider vs StateNotifierProvider" },
      { id: "9-4", text: "Ref.watch vs Ref.read" },
      { id: "9-5", text: "Immutable State (copyWith pattern)" }
    ],
    project: {
      title: "E-Commerce Cart",
      brief: "Product catalog with a persistent shopping cart.",
      requirements: [
        "Product List (Provider)",
        "Cart State (StateNotifier)",
        "Add/Remove items updates cart count everywhere",
        "Calculate Total Price automatically",
        "No setState() allowed for logic"
      ],
      snippet: `final cartProvider = StateNotifierProvider<CartNotifier, List<Item>>((ref) => CartNotifier());`
    },
    resources: [
      { type: "doc", title: "Riverpod Documentation", url: "https://riverpod.dev" }
    ]
  },
  {
    id: 10,
    title: "Local Persistence",
    subtitle: "Module 10: Databases",
    time: "12 Hours",
    icon: BookOpen,
    difficulty: "Intermediate",
    desc: "Saving data on the device so it survives app restarts.",
    curriculum: [
      { id: "10-1", text: "SharedPreferences (Simple Key-Value)" },
      { id: "10-2", text: "Hive (NoSQL, Fast, Dart-native)" },
      { id: "10-3", text: "Sqflite (Relational SQL)" },
      { id: "10-4", text: "TypeAdapters for Hive" },
      { id: "10-5", text: "Repository Pattern for storage" }
    ],
    project: {
      title: "Todo App with Persistence",
      brief: "Classic Todo app that remembers tasks.",
      requirements: [
        "Use Hive to store tasks",
        "Mark done/undone saves instantly",
        "Delete task removes from DB",
        "Filter (All/Active/Done)",
        "Use Box<Task> to open/close"
      ],
      snippet: `var box = await Hive.openBox('tasks');\nbox.put('key', TaskObject());`
    },
    resources: [
      { type: "doc", title: "Hive Docs", url: "https://docs.hivedb.dev" }
    ]
  },
  {
    id: 11,
    title: "Clean Architecture",
    subtitle: "Module 11: Scalable Code",
    time: "15 Hours",
    icon: Layers,
    difficulty: "Expert",
    desc: "Structuring large apps using Data, Domain, and Presentation layers.",
    curriculum: [
      { id: "11-1", text: "Separation of Concerns" },
      { id: "11-2", text: "Domain Layer (Entities, Usecases)" },
      { id: "11-3", text: "Data Layer (Models, Repositories, DataSources)" },
      { id: "11-4", text: "Presentation Layer (Widgets, Controllers)" },
      { id: "11-5", text: "Dependency Injection (GetIt / Riverpod)" }
    ],
    project: {
      title: "Weather App Refactor",
      brief: "Refactor Week 8 app into Clean Architecture.",
      requirements: [
        "Abstract Repository Interface",
        "Concrete Implementation calls API",
        "Usecase: GetWeatherForCity",
        "UI only talks to Controller/Bloc",
        "Handle Failures with Either<Left, Right>"
      ],
      snippet: `class GetWeather { final WeatherRepository repo; ... call() { return repo.getWeather(); } }`
    },
    resources: [
      { type: "doc", title: "Clean Arch by ResoCoder", url: "https://resocoder.com/flutter-clean-architecture-tdd/" }
    ]
  },
  {
    id: 12,
    title: "Firebase Integration",
    subtitle: "Module 12: Backend Service",
    time: "18 Hours",
    icon: Zap,
    difficulty: "Hard",
    desc: "Serverless backend for Auth, Database, and Storage.",
    curriculum: [
      { id: "12-1", text: "Firebase Console Setup (iOS/Android)" },
      { id: "12-2", text: "Firebase Auth (Email, Google)" },
      { id: "12-3", text: "Cloud Firestore (NoSQL, Streams)" },
      { id: "12-4", text: "Firebase Storage (Images)" },
      { id: "12-5", text: "Security Rules" }
    ],
    project: {
      title: "Social Chat App",
      brief: "Real-time chat room.",
      requirements: [
        "Sign in with Google",
        "List of messages (StreamBuilder)",
        "Send message (write to Firestore)",
        "Display sender avatar",
        "Logout function"
      ],
      snippet: `FirebaseFirestore.instance.collection('chats').snapshots()`
    },
    resources: [
      { type: "doc", title: "FlutterFire", url: "https://firebase.flutter.dev" }
    ]
  },
  {
    id: 13,
    title: "Animations & Polish",
    subtitle: "Module 13: UI/UX Magic",
    time: "10 Hours",
    icon: Zap,
    difficulty: "Intermediate",
    desc: "Making the app feel premium with motion.",
    curriculum: [
      { id: "13-1", text: "Implicit Animations (AnimatedContainer, Opacity)" },
      { id: "13-2", text: "Hero Animations (Shared Element)" },
      { id: "13-3", text: "Explicit Animations (Controller, Tween)" },
      { id: "13-4", text: "Lottie Files (Vector Animation)" },
      { id: "13-5", text: "Custom Painters (Canvas Drawing)" }
    ],
    project: {
      title: "Habit Tracker Visuals",
      brief: "Add confetti and smooth transitions to a habit app.",
      requirements: [
        "Hero transition from list to detail",
        "Staggered list animation on load",
        "Confetti explosion on task complete",
        "Animated progress bar"
      ],
      snippet: `AnimatedContainer(duration: Duration(seconds: 1), color: isSelected ? Colors.blue : Colors.red)`
    },
    resources: [
      { type: "video", title: "Flutter Animations Course", url: "https://www.youtube.com/playlist?list=PLjxrf2q8roU2v6UqYlt_KPaXjqRb31cmn" }
    ]
  },
  {
    id: 14,
    title: "Testing & DevOps",
    subtitle: "Module 14: QA & Stability",
    time: "10 Hours",
    icon: ShieldAlert,
    difficulty: "Hard",
    desc: "Ensuring stability and automated building.",
    curriculum: [
      { id: "14-1", text: "Unit Testing (Functions, Logic)" },
      { id: "14-2", text: "Widget Testing (PumpWidget, Finders)" },
      { id: "14-3", text: "Integration Testing (Full flow)" },
      { id: "14-4", text: "Mocking (Mockito)" },
      { id: "14-5", text: "CI/CD Basics (GitHub Actions / Codemagic)" }
    ],
    project: {
      title: "Test Suite",
      brief: "Write tests for the Calculator or Weather app.",
      requirements: [
        "Unit test the logic (math/conversion)",
        "Widget test: ensure buttons exist",
        "Widget test: tap button and verify text change",
        "Mock the API call"
      ],
      snippet: `test('Counter increments', () { expect(counter.value, 1); });`
    },
    resources: [
      { type: "doc", title: "Testing Flutter Apps", url: "https://docs.flutter.dev/testing" }
    ]
  },
  {
    id: 15,
    title: "Deployment",
    subtitle: "Module 15: Launch",
    time: "8 Hours",
    icon: Rocket,
    difficulty: "Intermediate",
    desc: "Preparing and uploading to stores.",
    curriculum: [
      { id: "15-1", text: "App Icons & Splash Screens" },
      { id: "15-2", text: "Keystores & Signing (Android)" },
      { id: "15-3", text: "Xcode Archive (iOS)" },
      { id: "15-4", text: "Play Console & App Store Connect" },
      { id: "15-5", text: "Obfuscation & Size Optimization" }
    ],
    project: {
      title: "Portfolio Release",
      brief: "Prepare a showcase app for release.",
      requirements: [
        "Generate launcher icons",
        "Build Release APK/Bundle",
        "Take screenshots",
        "Write Privacy Policy",
        "Upload to Internal Test Track"
      ],
      snippet: `flutter build appbundle --release`
    },
    resources: [
      { type: "doc", title: "Deployment Guide", url: "https://docs.flutter.dev/deployment" }
    ]
  }
];

// --- COMPONENT: Header (Modern Glassmorphism) ---
const Header = ({ stats, resetData, onOpenResources }) => (
  <header className="fixed top-0 w-full z-50 glass border-b border-white/5 shadow-lg shadow-black/10">
    {/* Package Promotion Banner */}
    <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border-b border-cyan-500/20 py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs">
        <Rocket className="text-cyan-400" size={14} />
        <span className="text-slate-400">Check out my Flutter package:</span>
        <a 
          href="https://pub.dev/packages/smart_review_prompter" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
        >
          smart_review_prompter
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between h-[60px] sm:h-[72px]">
      {/* Brand */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img 
          src={AppLogo} 
          alt="FlutterOrbit Logo" 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-blue-500/25"
        />
        <div className="flex flex-col">
          <span className="text-base sm:text-xl font-extrabold tracking-tight leading-none">
            <span className="text-white">FLUTTER</span><span className="gradient-text">ORBIT</span>
          </span>
          <span className="text-[8px] sm:text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">Academy</span>
        </div>
      </div>
      
      {/* Center Navigation */}
      <div className="hidden md:flex items-center gap-2">
        <button
          onClick={onOpenResources}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all text-sm font-medium"
        >
          <Package size={16} />
          <span>Packages & Resources</span>
        </button>
      </div>
      
      {/* User Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Resources Button */}
        <button
          onClick={onOpenResources}
          className="md:hidden p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
          title="Packages & Resources"
        >
          <Package size={18} />
        </button>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300">{stats.percent}% Complete</span>
        </div>
        <button 
          onClick={resetData}
          className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all" 
          title="Reset Progress"
        >
          <ShieldAlert size={18} />
        </button>
      </div>
    </div>
  </header>
);

// --- COMPONENT: Quiz ---
const QuizComponent = ({ moduleId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = QUIZ_DATA[moduleId] || [];

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
        <Brain size={40} className="mx-auto mb-3 text-slate-600" />
        <p className="text-slate-500">Quiz coming soon for this module!</p>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8">
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
          percentage >= 80 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
          percentage >= 50 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
          'bg-gradient-to-br from-red-500 to-pink-500'
        }`}>
          <span className="text-3xl font-bold text-white">{percentage}%</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          {percentage >= 80 ? '🎉 Excellent!' : percentage >= 50 ? '👍 Good Job!' : '📚 Keep Learning!'}
        </h3>
        <p className="text-slate-400 mb-6">
          You scored {score} out of {questions.length} questions correctly
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-yellow-400" />
          <span className="text-sm font-bold text-white">{score} pts</span>
        </div>
      </div>
      
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
        <h4 className="text-lg font-bold text-white mb-6">{question.question}</h4>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 border ${
                showResult
                  ? index === question.correct
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : index === selectedAnswer
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-slate-800/30 border-slate-700/50 text-slate-500'
                  : selectedAnswer === index
                    ? 'bg-blue-500/20 border-blue-500 text-white'
                    : 'bg-slate-800/30 border-slate-700/50 text-slate-300 hover:border-blue-500/50 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  showResult
                    ? index === question.correct
                      ? 'bg-emerald-500 text-white'
                      : index === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-700 text-slate-400'
                    : selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={`p-4 rounded-xl border ${
          selectedAnswer === question.correct
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : 'bg-orange-500/10 border-orange-500/30'
        }`}>
          <div className="flex items-start gap-3">
            <Info size={20} className={selectedAnswer === question.correct ? 'text-emerald-400' : 'text-orange-400'} />
            <p className="text-sm text-slate-300">{question.explanation}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <button
            onClick={submitAnswer}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              selectedAnswer === null
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT: Achievements Panel ---
const AchievementsPanel = ({ completedTopics, completedWeeks, onClose }) => {
  const totalTopics = ROADMAP_DATA.reduce((acc, m) => acc + m.curriculum.length, 0);
  const percent = Math.round((completedTopics.length / totalTopics) * 100);

  const checkAchievement = (achievement) => {
    switch (achievement.requirement) {
      case 1: return completedTopics.length >= 1;
      case 5: return completedTopics.length >= 5;
      case 'module': return completedWeeks.length >= 1;
      case 'quiz': return false; // Would need quiz tracking
      case 7: return false; // Would need streak tracking
      case 50: return percent >= 50;
      case 'dart': return completedWeeks.includes(1) && completedWeeks.includes(2) && completedWeeks.includes(3);
      case 100: return percent === 100;
      default: return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-lg w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
              <Trophy className="text-yellow-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Achievements</h3>
              <p className="text-xs text-slate-400">{ACHIEVEMENTS.filter(a => checkAchievement(a)).length}/{ACHIEVEMENTS.length} Unlocked</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = checkAchievement(achievement);
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isUnlocked 
                    ? 'bg-gradient-to-r from-slate-800/50 to-slate-800/30 border-slate-600' 
                    : 'bg-slate-800/20 border-slate-700/30 opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${achievement.color} shadow-lg` 
                    : 'bg-slate-800'
                }`}>
                  <Icon size={24} className={isUnlocked ? 'text-white' : 'text-slate-600'} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>{achievement.title}</h4>
                  <p className="text-xs text-slate-400">{achievement.desc}</p>
                </div>
                {isUnlocked && <Sparkles className="text-yellow-400" size={20} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Daily Challenge ---
const DailyChallenge = ({ challenges, userProgress, onComplete }) => {
  const today = new Date().getDay();
  const challenge = challenges[today % challenges.length];
  const [showHint, setShowHint] = useState(false);
  const isCompleted = userProgress?.completedChallenges?.includes(challenge.id);
  
  return (
    <div className="relative bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-2xl border border-orange-500/20 p-5 overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="text-orange-400" size={20} />
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Daily Challenge</span>
        </div>
        <h4 className="text-lg font-bold text-white mb-1">{challenge.title}</h4>
        <p className="text-sm text-slate-400 mb-3">{challenge.desc}</p>
        
        {showHint && challenge.hint && (
          <div className="mb-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-blue-400">
              <Lightbulb size={14} />
              <span>{challenge.hint}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            +{challenge.xp} XP
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-slate-400 hover:text-blue-400 transition-colors"
            >
              {showHint ? 'Hide' : 'Hint'}
            </button>
            {isCompleted ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle size={14} /> Done
              </span>
            ) : (
              <button className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors">
                Start →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Flashcards ---
const FlashcardsModal = ({ onClose, userProgress, setUserProgress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState('all');
  const [shuffled, setShuffled] = useState(false);
  
  const filteredCards = useMemo(() => {
    let cards = [...FLASHCARDS_DATA];
    if (filter !== 'all') {
      cards = cards.filter(c => c.category === filter);
    }
    if (shuffled) {
      cards = cards.sort(() => Math.random() - 0.5);
    }
    return cards;
  }, [filter, shuffled]);
  
  const categories = [...new Set(FLASHCARDS_DATA.map(c => c.category))];
  const currentCard = filteredCards[currentIndex];
  const reviewedCount = userProgress?.reviewedFlashcards?.length || 0;
  
  const markReviewed = () => {
    if (!userProgress.reviewedFlashcards?.includes(currentCard.id)) {
      setUserProgress(prev => ({
        ...prev,
        reviewedFlashcards: [...(prev.reviewedFlashcards || []), currentCard.id]
      }));
    }
  };

  const nextCard = () => {
    markReviewed();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const shuffleCards = () => {
    setShuffled(true);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (!currentCard) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
              <Zap className="text-cyan-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Flashcards</h3>
              <p className="text-xs text-slate-400">{reviewedCount} reviewed • {filteredCards.length} cards</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 p-4 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => { setFilter('all'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                filter === cat ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={shuffleCards}
            className="ml-auto p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            title="Shuffle"
          >
            <Shuffle size={16} />
          </button>
        </div>

        {/* Card */}
        <div className="p-6">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative h-64 cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div 
              className="absolute inset-0 transition-all duration-500"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center items-center text-center border-2 bg-gradient-to-br from-slate-800 to-slate-800/50 border-slate-700 hover:border-blue-500/50"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full ${
                  currentCard.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                  currentCard.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentCard.difficulty}
                </span>
                <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed">{currentCard.front}</p>
                <p className="text-xs text-slate-500 mt-4">Click to reveal answer</p>
              </div>
              
              {/* Back */}
              <div 
                className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center items-center text-center border-2 bg-gradient-to-br from-blue-900/30 to-violet-900/30 border-blue-500/30"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <span className="text-xs font-medium text-blue-400 mb-4">{currentCard.category}</span>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">{currentCard.back}</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-4 mb-6">
            {filteredCards.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-6 bg-blue-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevCard}
              className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            
            <span className="text-sm text-slate-400">
              {currentIndex + 1} / {filteredCards.length}
            </span>
            
            <button
              onClick={nextCard}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Study Timer (Pomodoro) ---
const StudyTimer = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  
  const presets = [
    { label: 'Pomodoro', work: 25, break: 5 },
    { label: 'Short', work: 15, break: 3 },
    { label: 'Long', work: 45, break: 10 },
  ];
  const [activePreset, setActivePreset] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer ended
      if (!isBreak) {
        setSessions(prev => prev + 1);
        setIsBreak(true);
        setTimeLeft(presets[activePreset].break * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(presets[activePreset].work * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, activePreset]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(presets[activePreset].work * 60);
  };

  const selectPreset = (index) => {
    setActivePreset(index);
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(presets[index].work * 60);
  };

  const progress = isBreak 
    ? ((presets[activePreset].break * 60 - timeLeft) / (presets[activePreset].break * 60)) * 100
    : ((presets[activePreset].work * 60 - timeLeft) / (presets[activePreset].work * 60)) * 100;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isBreak ? 'bg-emerald-500/20' : 'bg-gradient-to-br from-red-500/20 to-orange-500/20'}`}>
              <Timer className={isBreak ? 'text-emerald-400' : 'text-orange-400'} size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Study Timer</h3>
              <p className="text-xs text-slate-400">{sessions} sessions completed</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Presets */}
          <div className="flex gap-2 mb-8">
            {presets.map((preset, i) => (
              <button
                key={preset.label}
                onClick={() => selectPreset(i)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  activePreset === i 
                    ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className={isBreak ? 'text-emerald-500' : 'text-blue-500'}
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white font-mono">{formatTime(timeLeft)}</span>
              <span className={`text-xs font-medium uppercase tracking-wider mt-1 ${isBreak ? 'text-emerald-400' : 'text-blue-400'}`}>
                {isBreak ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={resetTimer}
              className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-4 rounded-2xl font-bold text-white transition-all ${
                isRunning
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-red-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-violet-600 hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Notes Modal ---
const NotesModal = ({ moduleId, moduleName, userProgress, setUserProgress, onClose }) => {
  const [note, setNote] = useState(userProgress?.notes?.[moduleId] || '');
  const [saved, setSaved] = useState(false);

  const saveNote = () => {
    setUserProgress(prev => ({
      ...prev,
      notes: {
        ...(prev.notes || {}),
        [moduleId]: note
      }
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
              <StickyNote className="text-yellow-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Notes</h3>
              <p className="text-xs text-slate-400">{moduleName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add your notes, tips, or reminders for this module..."
            className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-200 text-sm resize-none focus:outline-none focus:border-blue-500/50 placeholder-slate-500"
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-slate-500">{note.length} characters</span>
            <button
              onClick={saveNote}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                saved 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              {saved ? <CheckCircle size={16} /> : <Save size={16} />}
              {saved ? 'Saved!' : 'Save Note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Certificate Modal ---
const CertificateModal = ({ moduleId, moduleName, onClose, userProgress, setUserProgress }) => {
  const [userName, setUserName] = useState(userProgress?.certificateName || '');
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  // Get week title based on moduleId
  const getWeekTitle = (id) => {
    const weekTitles = {
      1: "Week 1: Dart Fundamentals",
      2: "Week 2: Object-Oriented Dart",
      3: "Week 3: Async Dart & Futures",
      4: "Week 4: Flutter Basics",
      5: "Week 5: Responsive Layouts",
      6: "Week 6: State & Interactivity",
      7: "Week 7: Navigation & Routing",
      8: "Week 8: API & Networking",
      9: "Week 9: State Management",
      10: "Week 10: Local Persistence",
      11: "Week 11: Clean Architecture",
      12: "Week 12: Firebase Integration",
      13: "Week 13: Animations & Polish",
      14: "Week 14: Testing & DevOps",
      15: "Week 15: Deployment"
    };
    return weekTitles[id] || `Week ${id}: ${moduleName}`;
  };

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateCertificate = () => {
    if (!userName.trim()) return;
    
    // Save the name for future certificates
    setUserProgress(prev => ({
      ...prev,
      certificateName: userName,
      certificates: [...(prev.certificates || []), { moduleId, date: new Date().toISOString() }]
    }));

    setCertificateGenerated(true);
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Use html2canvas to capture the certificate
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `FlutterOrbit-Week${moduleId}-Certificate-${userName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error generating certificate:', error);
      // Fallback: try to print
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-5xl overflow-hidden my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
              <Award className="text-yellow-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">🎉 Congratulations!</h3>
              <p className="text-xs text-slate-400">You completed {getWeekTitle(moduleId)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!certificateGenerated ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Trophy className="text-white" size={40} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Generate Your Certificate</h4>
                <p className="text-slate-400 max-w-md mx-auto">
                  Enter your name to generate a personalized certificate for <span className="text-yellow-400 font-semibold">{getWeekTitle(moduleId)}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 text-center text-lg"
                  />
                </div>

                <button
                  onClick={generateCertificate}
                  disabled={!userName.trim()}
                  className={`w-full px-8 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                    userName.trim()
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:shadow-yellow-500/25'
                      : 'bg-slate-700 cursor-not-allowed'
                  }`}
                >
                  <Award size={18} />
                  Generate Certificate
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Certificate Preview */}
              <div className="overflow-auto bg-gray-200 rounded-xl p-4">
                <div 
                  ref={certificateRef}
                  style={{
                    width: '1100px',
                    height: '780px',
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    padding: '15px',
                    color: '#1a2b4b',
                    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
                    margin: '0 auto',
                  }}
                >
                  {/* Outer Border */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    border: '3px solid #1a2b4b',
                    padding: '5px',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}>
                    {/* Corner Accents */}
                    <div style={{ position: 'absolute', top: '-6px', left: '-6px', width: '20px', height: '20px', border: '4px solid #1a2b4b', borderRight: '0', borderBottom: '0', background: '#fff', zIndex: 2 }}></div>
                    <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', border: '4px solid #1a2b4b', borderLeft: '0', borderBottom: '0', background: '#fff', zIndex: 2 }}></div>
                    <div style={{ position: 'absolute', bottom: '-6px', left: '-6px', width: '20px', height: '20px', border: '4px solid #1a2b4b', borderRight: '0', borderTop: '0', background: '#fff', zIndex: 2 }}></div>
                    <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '20px', height: '20px', border: '4px solid #1a2b4b', borderLeft: '0', borderTop: '0', background: '#fff', zIndex: 2 }}></div>

                    {/* Inner Border */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      border: '2px solid #d4af37',
                      padding: '50px 80px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'radial-gradient(circle at center, #fff 40%, #fcfbf7 100%)',
                      boxSizing: 'border-box',
                    }}>
                      
                      {/* Header - Logo */}
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          fontFamily: "'Georgia', serif",
                        }}>
                          <img 
                            src={AppLogo} 
                            alt="FlutterOrbit Logo"
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '10px',
                            }}
                          />
                          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a2b4b' }}>
                            FLUTTER<span style={{ color: '#5b6cf6', fontWeight: 'bold' }}>ORBIT</span>
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <div style={{ textAlign: 'center' }}>
                        <h1 style={{
                          fontFamily: "'Georgia', 'Times New Roman', serif",
                          fontSize: '56px',
                          fontWeight: '800',
                          letterSpacing: '6px',
                          color: '#1a2b4b',
                          textTransform: 'uppercase',
                          margin: '0',
                          lineHeight: '1.2',
                        }}>Certificate</h1>
                        <h2 style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: '18px',
                          textTransform: 'uppercase',
                          letterSpacing: '4px',
                          color: '#d4af37',
                          marginTop: '5px',
                          fontWeight: '500',
                        }}>Of Completion</h2>
                      </div>

                      {/* Main Content */}
                      <div style={{
                        textAlign: 'center',
                        width: '100%',
                        flexGrow: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '20px',
                      }}>
                        <p style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: '20px',
                          color: '#555',
                          fontStyle: 'italic',
                        }}>This certifies that</p>

                        {/* Name */}
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: '800px',
                          margin: '0 auto',
                        }}>
                          <div style={{
                            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                            fontSize: '64px',
                            color: '#1a2b4b',
                            textAlign: 'center',
                            borderBottom: '1px solid #d4af37',
                            paddingBottom: '10px',
                          }}>{userName}</div>
                        </div>

                        <div>
                          <p style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '16px',
                            color: '#555',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                          }}>has successfully completed the</p>
                          <p style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: '32px',
                            color: '#1a2b4b',
                            fontWeight: '700',
                            marginTop: '5px',
                          }}>Flutter Developer Roadmap</p>
                        </div>

                        {/* Details Grid */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '80px',
                          marginTop: '20px',
                          width: '100%',
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              color: '#888',
                              marginBottom: '5px',
                            }}>Title / Achievement</span>
                            <span style={{
                              fontFamily: "'Georgia', serif",
                              fontSize: '20px',
                              color: '#1a2b4b',
                              borderBottom: '1px solid #ccc',
                              paddingBottom: '5px',
                              minWidth: '250px',
                              textAlign: 'center',
                            }}>{getWeekTitle(moduleId)}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              color: '#888',
                              marginBottom: '5px',
                            }}>Date Issued</span>
                            <span style={{
                              fontFamily: "'Georgia', serif",
                              fontSize: '20px',
                              color: '#1a2b4b',
                              borderBottom: '1px solid #ccc',
                              paddingBottom: '5px',
                              minWidth: '250px',
                              textAlign: 'center',
                            }}>{currentDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Signatures */}
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '30px',
                        padding: '0 40px',
                      }}>
                        {/* Left Signature */}
                        <div style={{ textAlign: 'center', width: '220px' }}>
                          <div style={{
                            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                            fontSize: '32px',
                            color: '#1a2b4b',
                            marginBottom: '5px',
                            minHeight: '40px',
                          }}>Flutter Expert</div>
                          <div style={{ width: '100%', height: '1px', backgroundColor: '#1a2b4b', marginBottom: '8px' }}></div>
                          <div style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: '#1a2b4b',
                            fontWeight: '600',
                          }}>Instructor</div>
                        </div>

                        {/* Center Badge */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{
                            width: '110px',
                            height: '110px',
                            border: '2px solid #d4af37',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <div style={{
                              width: '95px',
                              height: '95px',
                              backgroundColor: '#1a2b4b',
                              borderRadius: '50%',
                              color: '#d4af37',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: "'Georgia', serif",
                              fontSize: '10px',
                              letterSpacing: '1px',
                              textAlign: 'center',
                              lineHeight: '1.4',
                              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                            }}>
                              <span style={{ fontSize: '24px', marginBottom: '4px' }}>★</span>
                              CERTIFIED<br/>EXCELLENCE
                            </div>
                          </div>
                        </div>

                        {/* Right Signature */}
                        <div style={{ textAlign: 'center', width: '220px' }}>
                          <div style={{
                            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                            fontSize: '32px',
                            color: '#1a2b4b',
                            marginBottom: '5px',
                            minHeight: '40px',
                          }}>Academy Head</div>
                          <div style={{ width: '100%', height: '1px', backgroundColor: '#1a2b4b', marginBottom: '8px' }}></div>
                          <div style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: '#1a2b4b',
                            fontWeight: '600',
                          }}>Academy Director</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={downloadCertificate}
                  disabled={isDownloading}
                  className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Download Certificate
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCertificateGenerated(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 size={18} />
                  Edit Name
                </button>
              </div>

              <div className="text-center text-xs text-slate-500">
                <p>Your certificate has been generated! Click download to save it to your device.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: GitHub Project Modal ---
const GitHubProjectModal = ({ moduleId, moduleName, projectCode, onClose }) => {
  const [githubToken, setGithubToken] = useState('');
  const [repoName, setRepoName] = useState(`flutter-module-${moduleId}-project`);
  const [repoDescription, setRepoDescription] = useState(`My ${moduleName} project from FlutterOrbit Academy`);
  const [isPrivate, setIsPrivate] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const createGitHubRepo = async () => {
    if (!githubToken.trim()) {
      setStatus({ type: 'error', message: 'Please enter your GitHub Personal Access Token' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Create repository
      const repoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          description: repoDescription,
          private: isPrivate,
          auto_init: true,
        }),
      });

      if (!repoResponse.ok) {
        const errorData = await repoResponse.json();
        throw new Error(errorData.message || 'Failed to create repository');
      }

      const repoData = await repoResponse.json();

      // Wait a moment for repo to be ready
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create main.dart file with project code
      const fileContent = btoa(unescape(encodeURIComponent(projectCode || `// ${moduleName} Project\n// Created from FlutterOrbit Academy\n\nvoid main() {\n  print('Hello, Flutter!');\n}`)));
      
      const fileResponse = await fetch(`https://api.github.com/repos/${repoData.full_name}/contents/lib/main.dart`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add ${moduleName} project code from FlutterOrbit`,
          content: fileContent,
        }),
      });

      if (!fileResponse.ok) {
        console.warn('Could not create file, but repo was created');
      }

      setStatus({ 
        type: 'success', 
        message: `Repository created successfully! View it at: github.com/${repoData.full_name}`,
        repoUrl: repoData.html_url 
      });
      setStep(3);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900">
              <Github className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload to GitHub</h3>
              <p className="text-xs text-slate-400">Module {moduleId}: {moduleName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-400 mt-0.5 shrink-0" size={18} />
                  <div className="text-sm text-slate-300">
                    <p className="font-medium text-blue-400 mb-1">How to get a GitHub Token:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-400 text-xs">
                      <li>Go to GitHub → Settings → Developer Settings</li>
                      <li>Click "Personal access tokens" → "Tokens (classic)"</li>
                      <li>Generate new token with "repo" scope</li>
                      <li>Copy and paste the token below</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Personal Access Token</label>
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 font-mono text-sm"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!githubToken.trim()}
                className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  githubToken.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-lg'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Repository Name</label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                  placeholder="my-flutter-project"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={repoDescription}
                  onChange={(e) => setRepoDescription(e.target.value)}
                  placeholder="Project description..."
                  rows={2}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="private" className="text-sm text-slate-300">
                  Make repository private
                </label>
              </div>

              {status.type && (
                <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${
                  status.type === 'success' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {status.message}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={createGitHubRepo}
                  disabled={isLoading || !repoName.trim()}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    !isLoading && repoName.trim()
                      ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:shadow-lg'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin" size={18} />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FolderGit2 size={18} />
                      Create Repository
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <CheckCircle className="text-white" size={40} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Repository Created!</h4>
                <p className="text-slate-400 text-sm">Your project has been uploaded to GitHub successfully.</p>
              </div>
              <a
                href={status.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:shadow-lg transition-all"
              >
                <Github size={18} />
                View on GitHub
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: DartPad Embed ---
const DartPadEmbed = ({ initialCode, onClose }) => {
  const [code, setCode] = useState(initialCode || `void main() {
  print('Hello, Flutter!');
  
  // Try writing some Dart code here
  var name = 'FlutterOrbit';
  print('Welcome to \$name Academy!');
}`);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  // Encode code for DartPad URL
  const encodedCode = encodeURIComponent(code);
  const dartPadUrl = `https://dartpad.dev/embed-dart.html?theme=dark&run=false&split=50&ga_id=`;

  useEffect(() => {
    // Post message to DartPad iframe to set code
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.onload = () => {
        // DartPad uses postMessage for communication
        setTimeout(() => {
          iframe.contentWindow?.postMessage({
            type: 'sourceCode',
            sourceCode: code,
          }, '*');
        }, 1000);
      };
    }
  }, []);

  return (
    <div className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isFullscreen ? 'p-0' : ''}`}>
      <div className={`bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[85vh]'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <FileCode className="text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">DartPad</h3>
              <p className="text-xs text-slate-400">Write and run Dart code directly in your browser</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <X size={20} /> : <LayoutGrid size={20} />}
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="h-[calc(100%-65px)]">
          <iframe
            ref={iframeRef}
            src={`https://dartpad.dev/?theme=dark`}
            className="w-full h-full border-0"
            title="DartPad"
            allow="clipboard-write"
          />
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Feedback Modal ---
const FeedbackModal = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ text: '', type: '' });

  const feedbackTypes = [
    { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'text-yellow-400' },
    { id: 'bug', label: 'Bug Report', icon: AlertCircle, color: 'text-red-400' },
    { id: 'content', label: 'Content Request', icon: BookOpen, color: 'text-blue-400' },
    { id: 'appreciation', label: 'Appreciation', icon: Heart, color: 'text-pink-400' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setSubmitResult({ text: 'Please enter your feedback message.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult({ text: '', type: '' });

    try {
      const result = await submitFeedback({
        type: feedbackType,
        message: message.trim(),
        email: email.trim() || 'anonymous',
        userAgent: navigator.userAgent,
        url: window.location.href
      });

      setSubmitResult({ text: result.message, type: result.success ? 'success' : 'error' });
      
      if (result.success) {
        setMessage('');
        setEmail('');
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      setSubmitResult({ text: 'Failed to submit feedback. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                <MessageSquare className="text-violet-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Send Feedback</h2>
                <p className="text-sm text-slate-400">Help us improve FlutterOrbit Academy</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">What type of feedback?</label>
            <div className="grid grid-cols-2 gap-2">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFeedbackType(type.id)}
                  className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                    feedbackType === type.id
                      ? 'bg-violet-500/20 border-violet-500/50 text-white'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <type.icon size={18} className={type.color} />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Your Feedback</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              rows={4}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all placeholder-slate-500 resize-none"
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email <span className="text-slate-500">(optional - for follow-up)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all placeholder-slate-500"
            />
          </div>

          {/* Submit Result */}
          {submitResult.text && (
            <div className={`p-3 rounded-xl flex items-center gap-2 ${
              submitResult.type === 'success' 
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {submitResult.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm">{submitResult.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Send Feedback</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENT: Community Stats Card ---
const CommunityStatsCard = ({ communityStats, onOpenFeedback }) => {
  const stats = [
    { label: 'Active Learners', value: communityStats.totalLearners?.toLocaleString() || '1,247', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Modules Completed', value: communityStats.modulesCompleted?.toLocaleString() || '5,893', icon: CheckCircle, color: 'from-emerald-500 to-green-500' },
    { label: 'Hours Learned', value: communityStats.hoursLearned?.toLocaleString() || '12,450', icon: Clock, color: 'from-violet-500 to-purple-500' },
    { label: 'Avg. Streak', value: `${communityStats.averageStreak || 7} days`, icon: Flame, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="glass rounded-2xl border border-slate-700/50 p-5 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20">
            <Globe className="text-blue-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Community Stats</h3>
            <p className="text-xs text-slate-400">Join thousands learning Flutter</p>
          </div>
        </div>
        <button
          onClick={onOpenFeedback}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 transition-all text-sm font-medium"
        >
          <MessageSquare size={16} />
          <span>Send Feedback</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/30 rounded-xl p-3 sm:p-4 border border-slate-700/30">
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20 mb-2`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: Share Progress Modal ---
const ShareProgressModal = ({ onClose, userProgress, stats }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareResult, setShareResult] = useState({ text: '', type: '', shareId: null });
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const progressData = {
        completedModules: userProgress.completedWeeks?.length || 0,
        completedTopics: userProgress.completedTopics?.length || 0,
        streak: userProgress.streak || 0,
        percentComplete: stats.percent,
        sharedAt: new Date().toISOString()
      };

      const result = await shareProgress(progressData);
      
      if (result.success) {
        setShareResult({
          text: 'Progress shared successfully!',
          type: 'success',
          shareId: result.shareId
        });
      } else {
        setShareResult({ text: result.message || 'Failed to share progress.', type: 'error' });
      }
    } catch (error) {
      setShareResult({ text: 'Failed to share progress. Please try again.', type: 'error' });
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    if (shareResult.shareId) {
      const shareUrl = `${window.location.origin}?share=${shareResult.shareId}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <Share2 className="text-cyan-400" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Share Progress</h2>
                <p className="text-sm text-slate-400">Show off your learning journey!</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Progress Preview */}
          <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-xl p-5 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={AppLogo} 
                alt="FlutterOrbit Logo" 
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <div className="text-lg font-bold text-white">FlutterOrbit Academy</div>
                <div className="text-xs text-slate-400">Learning Progress</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.percent}%</div>
                <div className="text-xs text-slate-400">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{userProgress.streak || 0}</div>
                <div className="text-xs text-slate-400">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{userProgress.completedWeeks?.length || 0}</div>
                <div className="text-xs text-slate-400">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{userProgress.completedTopics?.length || 0}</div>
                <div className="text-xs text-slate-400">Topics</div>
              </div>
            </div>
          </div>

          {/* Share Result */}
          {shareResult.text && (
            <div className={`p-3 rounded-xl flex items-center gap-2 ${
              shareResult.type === 'success' 
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {shareResult.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm">{shareResult.text}</span>
            </div>
          )}

          {/* Share Link */}
          {shareResult.shareId && (
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}?share=${shareResult.shareId}`}
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl py-2 px-3 text-sm text-slate-300 truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  copied
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                    : 'bg-slate-800 border border-slate-700 text-white hover:bg-slate-700'
                }`}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          {!shareResult.shareId && (
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSharing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Creating Share Link...</span>
                </>
              ) : (
                <>
                  <Share2 size={18} />
                  <span>Generate Share Link</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Packages & Resources Modal ---
const PackagesResourcesModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedCategory, setSelectedCategory] = useState('stateManagement');
  const [searchQuery, setSearchQuery] = useState('');

  const packageCategories = [
    { id: 'stateManagement', name: 'State Management', icon: Layers, color: 'from-blue-500 to-violet-500' },
    { id: 'networking', name: 'Networking', icon: Globe, color: 'from-green-500 to-emerald-500' },
    { id: 'storage', name: 'Storage', icon: Database, color: 'from-amber-500 to-orange-500' },
    { id: 'ui', name: 'UI & Animation', icon: Palette, color: 'from-pink-500 to-rose-500' },
    { id: 'navigation', name: 'Navigation', icon: Navigation, color: 'from-cyan-500 to-blue-500' },
    { id: 'firebase', name: 'Firebase', icon: Flame, color: 'from-orange-500 to-red-500' },
    { id: 'utilities', name: 'Utilities', icon: Settings, color: 'from-slate-500 to-slate-600' },
    { id: 'forms', name: 'Forms', icon: FileText, color: 'from-indigo-500 to-purple-500' },
    { id: 'testing', name: 'Testing', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
    { id: 'codeGen', name: 'Code Generation', icon: Code, color: 'from-violet-500 to-purple-500' },
  ];

  const resourceCategories = [
    { id: 'all', name: 'All' },
    { id: 'docs', name: 'Documentation' },
    { id: 'tools', name: 'Tools' },
    { id: 'video', name: 'Video Courses' },
    { id: 'community', name: 'Community' },
  ];

  const [resourceFilter, setResourceFilter] = useState('all');

  const filteredResources = LEARNING_RESOURCES.filter(r => 
    (resourceFilter === 'all' || r.category === resourceFilter) &&
    (searchQuery === '' || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredPackages = POPULAR_PACKAGES[selectedCategory]?.filter(p =>
    searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
              <Package className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Flutter Resources</h3>
              <p className="text-xs text-slate-400">Essential packages & learning materials</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'packages'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Package size={18} />
            Popular Packages
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'resources'
                ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BookOpen size={18} />
            Learning Resources
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder={activeTab === 'packages' ? "Search packages..." : "Search resources..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-220px)]">
          {activeTab === 'packages' && (
            <div className="flex">
              {/* Categories Sidebar */}
              <div className="w-56 border-r border-slate-800 p-3 space-y-1 shrink-0 bg-slate-900/50 hidden md:block">
                {packageCategories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${cat.color} bg-opacity-20`}>
                        <Icon size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Categories */}
              <div className="md:hidden w-full p-3 border-b border-slate-800 overflow-x-auto">
                <div className="flex gap-2">
                  {packageCategories.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-medium transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-slate-800/50 text-slate-400'
                        }`}
                      >
                        <Icon size={14} />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Packages Grid */}
              <div className="flex-1 p-4">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    {packageCategories.find(c => c.id === selectedCategory)?.name}
                    <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                      {filteredPackages.length} packages
                    </span>
                  </h4>
                </div>
                <div className="grid gap-3">
                  {filteredPackages.map((pkg, i) => (
                    <a
                      key={i}
                      href={pkg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <Package className="text-cyan-400" size={20} />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{pkg.name}</h5>
                          <p className="text-xs text-slate-500">{pkg.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Heart size={12} className="text-pink-400" />
                          {pkg.likes}
                        </div>
                        <div className="flex">
                          {[...Array(pkg.stars)].map((_, i) => (
                            <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <ExternalLink size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="p-4">
              {/* Resource Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {resourceCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setResourceFilter(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      resourceFilter === cat.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredResources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-2xl">
                      {resource.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{resource.name}</h5>
                      <p className="text-xs text-slate-500 truncate">{resource.desc}</p>
                    </div>
                    <ExternalLink size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>

              {/* Helpful Tips Section */}
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-violet-500/10 rounded-2xl border border-cyan-500/20">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-400" size={20} />
                  Quick Learning Tips
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                    <span className="text-xl">🎯</span>
                    <div>
                      <h5 className="text-sm font-bold text-white">Start Small</h5>
                      <p className="text-xs text-slate-400">Begin with simple apps like counter or todo list</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                    <span className="text-xl">📱</span>
                    <div>
                      <h5 className="text-sm font-bold text-white">Build Real Projects</h5>
                      <p className="text-xs text-slate-400">Apply concepts by building actual apps</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                    <span className="text-xl">🔄</span>
                    <div>
                      <h5 className="text-sm font-bold text-white">Practice Daily</h5>
                      <p className="text-xs text-slate-400">Consistency beats intensity in learning</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                    <span className="text-xl">👥</span>
                    <div>
                      <h5 className="text-sm font-bold text-white">Join Community</h5>
                      <p className="text-xs text-slate-400">Discord, Reddit, Twitter for help & motivation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              💡 Pro tip: Star packages you use often on pub.dev for quick access
            </p>
            <a
              href="https://pub.dev/packages/smart_review_prompter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm font-medium"
            >
              <Rocket size={16} />
              Try my package: smart_review_prompter
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: DartPad Button (for embedding in code examples) ---
const DartPadButton = ({ code, onOpenDartPad }) => (
  <button
    onClick={() => onOpenDartPad(code)}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all text-sm font-medium"
  >
    <Play size={16} />
    Try in DartPad
  </button>
);

// --- COMPONENT: Export/Import Progress ---
const ExportImportModal = ({ userProgress, setUserProgress, onClose }) => {
  const [importData, setImportData] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const exportProgress = () => {
    const data = JSON.stringify(userProgress, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flutter-orbit-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ type: 'success', text: 'Progress exported successfully!' });
  };

  const importProgress = () => {
    try {
      const data = JSON.parse(importData);
      if (data.completedTopics && data.completedWeeks) {
        setUserProgress(data);
        setMessage({ type: 'success', text: 'Progress imported successfully!' });
        setImportData('');
      } else {
        setMessage({ type: 'error', text: 'Invalid progress file format' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Invalid JSON format' });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImportData(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
              <Download className="text-emerald-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Backup & Restore</h3>
              <p className="text-xs text-slate-400">Export or import your progress</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Export */}
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Download size={16} className="text-blue-400" />
              Export Progress
            </h4>
            <p className="text-xs text-slate-400 mb-3">Download your progress as a JSON file</p>
            <button
              onClick={exportProgress}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Download Backup
            </button>
          </div>

          {/* Import */}
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Upload size={16} className="text-emerald-400" />
              Import Progress
            </h4>
            <p className="text-xs text-slate-400 mb-3">Restore progress from a backup file</p>
            
            <label className="block w-full py-2.5 rounded-xl bg-slate-800 border border-dashed border-slate-600 text-center text-sm text-slate-400 hover:border-blue-500/50 cursor-pointer transition-all mb-2">
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              Choose File
            </label>
            
            {importData && (
              <button
                onClick={importProgress}
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-all"
              >
                Import Backup
              </button>
            )}
          </div>

          {/* Message */}
          {message.text && (
            <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Bookmarks Panel ---
const BookmarksPanel = ({ bookmarks, roadmapData, onClose, onRemoveBookmark }) => {
  const bookmarkedItems = useMemo(() => {
    const items = [];
    roadmapData.forEach(module => {
      module.curriculum.forEach(topic => {
        if (bookmarks.includes(topic.id)) {
          items.push({ ...topic, moduleName: module.title, moduleId: module.id });
        }
      });
    });
    return items;
  }, [bookmarks, roadmapData]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-lg max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
              <BookmarkCheck className="text-pink-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Bookmarks</h3>
              <p className="text-xs text-slate-400">{bookmarkedItems.length} saved topics</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {bookmarkedItems.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark size={40} className="mx-auto mb-3 text-slate-600" />
              <p className="text-slate-400 font-medium">No bookmarks yet</p>
              <p className="text-xs text-slate-500 mt-1">Click the bookmark icon on any topic to save it</p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarkedItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-pink-500/30 transition-all">
                  <div>
                    <p className="text-sm font-medium text-white">{item.text}</p>
                    <p className="text-xs text-slate-500">{item.moduleName}</p>
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(item.id)}
                    className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-pink-400 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Learning Streak ---
const LearningStreak = ({ streak = 0, streakHistory = [] }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Get the start of current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  
  // Check if a day in the current week was active
  const isDayActive = (dayIndex) => {
    const targetDate = new Date(startOfWeek);
    targetDate.setDate(startOfWeek.getDate() + dayIndex);
    const targetDateStr = targetDate.toDateString();
    
    // Check if this date exists in streakHistory
    return streakHistory.includes(targetDateStr);
  };
  
  return (
    <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="text-orange-400" size={18} />
          <span className="text-sm font-bold text-white">{streak} Day Streak</span>
        </div>
        <Calendar className="text-slate-500" size={16} />
      </div>
      
      <div className="flex justify-between">
        {days.map((day, i) => {
          const isActive = isDayActive(i);
          const isToday = i === currentDayOfWeek;
          const isFuture = i > currentDayOfWeek;
          
          return (
            <div 
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' 
                  : isFuture
                    ? 'bg-slate-700/30 text-slate-600'
                    : 'bg-slate-700/50 text-slate-500'
              } ${isToday ? 'ring-2 ring-orange-400/50' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- COMPONENT: Module Card (Modern Timeline Style) ---
const ModuleCard = ({ module, completedTopics, completedWeeks, toggleTopic, isExpanded, onToggleExpand, index, isLast, bookmarks = [], toggleBookmark, onOpenNotes, onOpenGitHub, onOpenDartPad, onOpenCertificate }) => {
  const [activeTab, setActiveTab] = useState('curriculum');
  
  // Calculate module-specific stats
  const totalTopics = module.curriculum.length;
  const moduleCompletedTopics = module.curriculum.filter(t => completedTopics.includes(t.id)).length;
  const percent = Math.round((moduleCompletedTopics / totalTopics) * 100);
  const isWeekComplete = completedWeeks.includes(module.id);
  
  // Dynamic Styles (Modern Gradient Pills)
  const difficultyColors = {
    Beginner: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    Hard: "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30",
    Expert: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
  };

  const Icon = module.icon;

  return (
    <div className="relative pl-6 sm:pl-8 md:pl-14 pb-6 sm:pb-8">
      {/* Timeline Connector - Gradient Line */}
      {!isLast && (
        <div className="absolute left-2 sm:left-3 md:left-[23px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-slate-700 via-slate-800 to-transparent z-0"></div>
      )}
      
      {/* Timeline Node - Modern with glow */}
      <div className={`absolute left-0 sm:left-0 md:left-2 top-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 sm:border-[3px] border-[#020617] z-10 flex items-center justify-center transition-all duration-500
        ${isWeekComplete 
          ? 'bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30' 
          : 'bg-slate-800 border-slate-700'}`}>
        {isWeekComplete && <CheckCircle2 size={12} className="sm:w-[14px] sm:h-[14px] text-white" />}
      </div>

      <div className={`relative card-hover bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden group backdrop-blur-sm
        ${isExpanded ? 'ring-2 ring-blue-500/30 shadow-xl shadow-blue-500/10' : 'hover:border-slate-600'}`}>
        
        {/* Header */}
        <div 
          onClick={() => onToggleExpand(module.id)}
          className="p-4 sm:p-6 cursor-pointer relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className={`hidden sm:flex w-11 h-11 sm:w-12 sm:h-12 rounded-xl items-center justify-center shrink-0 transition-all duration-300
              ${isWeekComplete 
                ? 'bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400 shadow-lg shadow-blue-500/10' 
                : 'bg-slate-800/80 text-slate-500 group-hover:text-slate-400'}`}>
              <Icon size={22} className="sm:w-6 sm:h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase px-2 sm:px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${difficultyColors[module.difficulty]}`}>
                  {module.difficulty}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1">
                   <Clock size={10} className="sm:w-3 sm:h-3" /> {module.time}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">{module.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1 truncate">{module.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-end md:self-center w-full sm:w-auto justify-between sm:justify-end">
             <div className="text-left sm:text-right">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 block mb-1.5 uppercase tracking-wider">Progress</span>
                <div className="flex items-center gap-2.5">
                    <div className="w-20 sm:w-28 h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700 ease-out" 
                          style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold ${percent === 100 ? 'text-emerald-400' : 'text-slate-300'}`}>{percent}%</span>
                </div>
             </div>

             {/* Certificate Button - Shows when module is complete */}
             {isWeekComplete && (
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   onOpenCertificate(module.id, module.title);
                 }}
                 className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all text-xs font-bold"
                 title="Get Certificate"
               >
                 <Award size={14} />
                 <span className="hidden md:inline">Certificate</span>
               </button>
             )}
             
             <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0
               ${isExpanded 
                 ? 'rotate-180 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400' 
                 : 'bg-slate-800/80 text-slate-500 group-hover:text-slate-400'}`}>
                <ChevronDown size={18} className="sm:w-5 sm:h-5" />
             </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-900">
            {/* Tabs */}
            <div className="flex gap-1 p-2 bg-slate-900/50 overflow-x-auto">
              {[
                { id: 'curriculum', label: 'Learn', icon: CheckCircle2 },
                { id: 'examples', label: 'Code', icon: Code },
                { id: 'quiz', label: 'Quiz', icon: Brain },
                { id: 'project', label: 'Project', icon: Rocket },
                { id: 'tips', label: 'Tips', icon: Lightbulb },
                { id: 'resources', label: 'Links', icon: BookOpen }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl
                    ${activeTab === tab.id 
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-violet-500/20 shadow-lg shadow-blue-500/10' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
                >
                  <tab.icon size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  <span className="xs:hidden sm:hidden">{tab.label.slice(0, 3)}</span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              {activeTab === 'curriculum' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Topic Checklist</h4>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                      {moduleCompletedTopics}/{totalTopics} Completed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                    {module.curriculum.map(topic => {
                      const isChecked = completedTopics.includes(topic.id);
                      return (
                        <label 
                          key={topic.id}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 group/item
                            ${isChecked 
                              ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30' 
                              : 'bg-slate-800/30 border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800/50'}`}
                        >
                          <div className="relative flex items-center mt-0.5 shrink-0">
                            <input 
                              type="checkbox" 
                              className="sr-only"
                              checked={isChecked}
                              onChange={() => toggleTopic(topic.id)}
                            />
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300 border-2
                               ${isChecked 
                                 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-500 shadow-lg shadow-emerald-500/30' 
                                 : 'bg-slate-900 border-slate-600 group-hover/item:border-blue-500/50'}`}>
                              {isChecked && <CheckCircle2 size={12} className="text-white" />}
                            </div>
                          </div>
                          <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                            {topic.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  
                  <div className="relative bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4 sm:p-5 flex gap-4 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 h-fit">
                      <Zap className="text-blue-400" size={20} />
                    </div>
                    <div className="relative">
                        <h4 className="text-sm font-bold text-white mb-1.5">Learning Outcome</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{module.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'project' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{module.project.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{module.project.brief}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 shrink-0">
                        <Code size={24} className="text-violet-400" />
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 sm:p-6 rounded-2xl border border-slate-700/50">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-400" />
                      Requirements
                    </h4>
                    <ul className="space-y-3">
                      {module.project.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 mt-2 shrink-0"></div>
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Terminal size={14} className="text-blue-400" />
                      Starter Code
                    </h4>
                    <div className="relative bg-[#0a0f1a] p-4 sm:p-5 rounded-2xl border border-slate-800 overflow-x-auto group">
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <pre className="font-mono text-xs sm:text-sm text-blue-300 leading-relaxed whitespace-pre-wrap break-words sm:whitespace-pre pt-4">{module.project.snippet}</pre>
                    </div>
                  </div>

                  {/* Project Actions - GitHub & DartPad */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 p-5 rounded-2xl border border-slate-700/50">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Rocket size={14} className="text-violet-400" />
                      Project Actions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Upload to GitHub */}
                      <button
                        onClick={() => onOpenGitHub(module.id, module.title, module.project.snippet)}
                        className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-gray-500/50 hover:bg-slate-800/50 transition-all group"
                      >
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-600 group-hover:to-gray-800 transition-all">
                          <Github className="text-white" size={20} />
                        </div>
                        <div className="text-left">
                          <h5 className="text-sm font-bold text-white">Upload to GitHub</h5>
                          <p className="text-xs text-slate-500">Create repo & push code</p>
                        </div>
                        <ExternalLink className="ml-auto text-slate-600 group-hover:text-gray-400 transition-all" size={16} />
                      </button>

                      {/* Try in DartPad */}
                      <button
                        onClick={() => onOpenDartPad(module.project.snippet)}
                        className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group"
                      >
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all">
                          <FileCode className="text-blue-400" size={20} />
                        </div>
                        <div className="text-left">
                          <h5 className="text-sm font-bold text-white">Try in DartPad</h5>
                          <p className="text-xs text-slate-500">Code in browser</p>
                        </div>
                        <Play className="ml-auto text-slate-600 group-hover:text-blue-400 transition-all" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Code Examples Tab */}
              {activeTab === 'examples' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Code Examples</h4>
                    <span className="text-xs text-slate-500">{CODE_EXAMPLES[module.id]?.length || 0} examples</span>
                  </div>
                  
                  {CODE_EXAMPLES[module.id] ? (
                    <div className="space-y-4">
                      {CODE_EXAMPLES[module.id].map((example, i) => (
                        <div key={i} className="bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                            <span className="text-sm font-bold text-white">{example.title}</span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => navigator.clipboard.writeText(example.code)}
                                className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all"
                                title="Copy code"
                              >
                                <Copy size={16} />
                              </button>
                              <button 
                                onClick={() => onOpenDartPad(example.code)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-all text-xs font-medium"
                                title="Try in DartPad"
                              >
                                <Play size={14} />
                                DartPad
                              </button>
                            </div>
                          </div>
                          <div className="relative bg-[#0a0f1a] p-4 overflow-x-auto">
                            <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">{example.code}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                      <Code size={40} className="mx-auto mb-3 text-slate-600" />
                      <p className="text-slate-500">Code examples coming soon!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === 'quiz' && (
                <QuizComponent moduleId={module.id} />
              )}

              {/* Tips Tab */}
              {activeTab === 'tips' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-yellow-400" size={20} />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Pro Tips</h4>
                  </div>
                  
                  {TIPS_DATA[module.id] ? (
                    <div className="grid gap-3">
                      {TIPS_DATA[module.id].map((tip, i) => (
                        <div 
                          key={i}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-xl border border-yellow-500/20"
                        >
                          <span className="text-2xl">{tip.icon}</span>
                          <p className="text-sm text-slate-300 leading-relaxed">{tip.tip}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                      <Lightbulb size={40} className="mx-auto mb-3 text-slate-600" />
                      <p className="text-slate-500">Tips coming soon for this module!</p>
                    </div>
                  )}
                  
                  {/* Common Mistakes */}
                  <div className="mt-6">
                    <h5 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                      <AlertCircle size={16} />
                      Common Mistakes to Avoid
                    </h5>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                          <span>Don't ignore null safety warnings - they prevent runtime crashes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                          <span>Avoid using 'var' everywhere - explicit types improve readability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                          <span>Don't forget to dispose controllers in StatefulWidgets</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recommended Materials</h4>
                  <div className="grid gap-3">
                    {module.resources.map((res, i) => (
                      <a 
                        key={i}
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-300 group gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0
                            ${res.type === 'video' 
                              ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 text-red-400 group-hover:from-red-500/30 group-hover:to-orange-500/30' 
                              : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 group-hover:from-blue-500/30 group-hover:to-cyan-500/30'}`}>
                            {res.type === 'video' ? <PlayCircle size={20} /> : <FileText size={20} />}
                          </div>
                          <div className="min-w-0 flex-1">
                             <span className="text-sm font-bold text-white group-hover:text-blue-400 block truncate transition-colors">{res.title}</span>
                             <span className="text-xs text-slate-500 capitalize">{res.type} Resource</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-700/30 group-hover:bg-blue-500/20 transition-all">
                          <ExternalLink size={16} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT: Footer (Modern Gradient with Firebase Newsletter) ---
const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState({ text: '', type: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubscribeMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsSubscribing(true);
    setSubscribeMessage({ text: '', type: '' });

    try {
      const result = await subscribeToNewsletter(email);
      setSubscribeMessage({ 
        text: result.message, 
        type: result.success ? 'success' : 'error' 
      });
      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      setSubscribeMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-[#020617] text-slate-400 pt-12 sm:pt-20 pb-8 border-t border-slate-800/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Featured Package Banner */}
        <div className="mb-10 sm:mb-14">
          <a 
            href="https://pub.dev/packages/smart_review_prompter" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block glass rounded-2xl border border-cyan-500/20 p-5 sm:p-6 hover:border-cyan-500/40 transition-all group"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                <Rocket className="text-cyan-400" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Featured Package</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-400 rounded-full">pub.dev</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">smart_review_prompter</h4>
                <p className="text-sm text-slate-400">A Flutter package to intelligently prompt users for app reviews at the right moment. Boost your app ratings!</p>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-bold hidden sm:inline">View on pub.dev</span>
                <ExternalLink size={18} />
              </div>
            </div>
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-10 sm:gap-16 mb-12 sm:mb-16">
          <div className="space-y-5 max-w-sm">
            <div className="flex items-center gap-2.5">
              <img 
                src={AppLogo} 
                alt="FlutterOrbit Logo" 
                className="w-10 h-10 rounded-xl shadow-lg shadow-blue-500/20"
              />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">FLUTTER</span><span className="gradient-text">ORBIT</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              The premium industry-standard curriculum for aspiring Flutter architects. Built for scale, performance, and career growth.
            </p>
            
            {/* Creator Info */}
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-3">Created by <span className="text-white font-semibold">Satish Parmar</span></p>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/satish-parmar-ak978312" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://github.com/SatishParmar1/60daysofcode" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-900 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>
                <a 
                  href="https://instagram.com/satish_parmar_978" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                  title="Instagram"
                >
                  <Heart size={16} />
                </a>
                <a 
                  href="https://who-is-satish.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  title="Portfolio"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm tracking-wider uppercase flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              Newsletter
            </h4>
            <p className="text-sm text-slate-500 mb-4">Get the latest Flutter patterns, tips & resources delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full md:w-64 bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-slate-500"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
              {subscribeMessage.text && (
                <p className={`text-sm flex items-center gap-2 ${
                  subscribeMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {subscribeMessage.type === 'success' ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  {subscribeMessage.text}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div>© 2024 FlutterOrbit Academy. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
export default function App() {
  // State Management
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('flutterOrbitData_scaler_dark_v3');
    return saved ? JSON.parse(saved) : { 
      completedWeeks: [], 
      completedTopics: [], 
      streak: 0, 
      lastVisit: null,
      streakHistory: [], // Array of date strings for active days
      bookmarks: [],
      notes: {},
      reviewedFlashcards: [],
      completedChallenges: []
    };
  });

  const [expandedId, setExpandedId] = useState(1);
  const [search, setSearch] = useState('');
  const [showAchievements, setShowAchievements] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [notesModal, setNotesModal] = useState({ show: false, moduleId: null, moduleName: '' });
  const [showDartPad, setShowDartPad] = useState(false);
  const [dartPadCode, setDartPadCode] = useState('');
  const [githubModal, setGithubModal] = useState({ show: false, moduleId: null, moduleName: '', code: '' });
  const [certificateModal, setCertificateModal] = useState({ show: false, moduleId: null, moduleName: '' });
  const [showPackages, setShowPackages] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showShareProgress, setShowShareProgress] = useState(false);
  const [communityStats, setCommunityStats] = useState({
    totalLearners: 1247,
    modulesCompleted: 5893,
    hoursLearned: 12450,
    averageStreak: 7
  });

  // Fetch community stats and track new learner
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Track new learner
        await trackNewLearner();
        
        // Fetch community stats
        const stats = await getCommunityStats();
        setCommunityStats(stats);
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    };
    
    initializeFirebase();
  }, []);

  // Calculate streak and track daily activity
  useEffect(() => {
    const today = new Date().toDateString();
    const existingHistory = userProgress.streakHistory || [];
    
    // Only process if we haven't visited today yet
    if (userProgress.lastVisit !== today) {
      // Add today to streak history if not already present
      const updatedHistory = existingHistory.includes(today) 
        ? existingHistory 
        : [...existingHistory, today];
      
      // Keep only last 30 days of history to prevent unlimited growth
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const filteredHistory = updatedHistory.filter(dateStr => {
        const date = new Date(dateStr);
        return date >= thirtyDaysAgo;
      });
      
      // Calculate the actual streak from history
      const calculateStreak = (history) => {
        if (history.length === 0) return 1; // Today counts as 1
        
        // Sort history by date (most recent first)
        const sortedDates = history
          .map(d => new Date(d))
          .sort((a, b) => b - a);
        
        let streak = 1; // Today counts as 1
        const todayDate = new Date(today);
        
        // Check if the most recent date is today or yesterday
        const mostRecent = sortedDates[0];
        const daysSinceMostRecent = Math.floor((todayDate - mostRecent) / (1000 * 60 * 60 * 24));
        
        if (daysSinceMostRecent > 1) {
          // Streak broken - more than 1 day gap
          return 1;
        }
        
        // Count consecutive days backwards from most recent
        for (let i = 0; i < sortedDates.length - 1; i++) {
          const current = sortedDates[i];
          const prev = sortedDates[i + 1];
          const diffDays = Math.floor((current - prev) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            streak++;
          } else if (diffDays > 1) {
            break; // Streak broken
          }
          // diffDays === 0 means same day, continue
        }
        
        return streak;
      };
      
      const newStreak = calculateStreak(filteredHistory);
      
      setUserProgress(prev => ({
        ...prev,
        streak: newStreak,
        lastVisit: today,
        streakHistory: filteredHistory
      }));
    }
  }, []);

  // Persist State
  useEffect(() => {
    localStorage.setItem('flutterOrbitData_scaler_dark_v3', JSON.stringify(userProgress));
  }, [userProgress]);

  // Handlers
  const toggleTopic = (topicId) => {
    setUserProgress(prev => {
      const isCompleted = prev.completedTopics.includes(topicId);
      const newTopics = isCompleted 
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      
      // Determine week completion
      let weekId = parseInt(topicId.split('-')[0]);
      const weekModule = ROADMAP_DATA.find(m => m.id === weekId);
      
      const allWeekTopics = weekModule.curriculum.map(c => c.id);
      const allCompleted = allWeekTopics.every(id => newTopics.includes(id));
      
      let newWeeks = prev.completedWeeks;
      if (allCompleted && !newWeeks.includes(weekId)) {
        newWeeks = [...newWeeks, weekId];
      } else if (!allCompleted && newWeeks.includes(weekId)) {
        newWeeks = newWeeks.filter(id => id !== weekId);
      }

      return { ...prev, completedTopics: newTopics, completedWeeks: newWeeks };
    });
  };

  const toggleBookmark = (topicId) => {
    setUserProgress(prev => ({
      ...prev,
      bookmarks: prev.bookmarks?.includes(topicId)
        ? prev.bookmarks.filter(id => id !== topicId)
        : [...(prev.bookmarks || []), topicId]
    }));
  };

  const resetData = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setUserProgress({ 
        completedWeeks: [], 
        completedTopics: [], 
        streak: 0, 
        lastVisit: null,
        streakHistory: [],
        bookmarks: [],
        notes: {},
        reviewedFlashcards: [],
        completedChallenges: []
      });
    }
  };

  // Stats Calculation
  const stats = useMemo(() => {
    let totalTopics = 0;
    let doneTopics = 0;
    ROADMAP_DATA.forEach(m => {
      totalTopics += m.curriculum.length;
      doneTopics += m.curriculum.filter(c => userProgress.completedTopics.includes(c.id)).length;
    });
    const percent = totalTopics === 0 ? 0 : Math.round((doneTopics / totalTopics) * 100);
    
    let rank = "Beginner";
    if(percent >= 10) rank = "Junior Dev";
    if(percent >= 30) rank = "Developer";
    if(percent >= 60) rank = "Senior Dev";
    if(percent >= 90) rank = "Master Architect";

    return { 
      percent, 
      rank, 
      doneWeeks: userProgress.completedWeeks.length, 
      doneTopics,
      totalTopics
    };
  }, [userProgress]);

  // Filtering
  const filteredModules = ROADMAP_DATA.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) || 
    m.curriculum.some(c => c.text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen animated-gradient font-sans text-slate-400">
      <Header stats={stats} resetData={resetData} onOpenResources={() => setShowPackages(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-20">
        
        {/* Welcome Section - Modern Hero */}
        <div className="mb-10 sm:mb-14 pt-6 sm:pt-10 relative">
          <div className="absolute -top-10 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
              🚀 15 Modules • 200+ Hours of Content
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-5 leading-tight">
              Your Path to <br className="sm:hidden" /><span className="gradient-text">Flutter Mastery</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              A structured, industry-vetted curriculum designed to take you from complete beginner to professional Flutter architect.
            </p>
          </div>
        </div>

        {/* Community Stats */}
        <CommunityStatsCard 
          communityStats={communityStats} 
          onOpenFeedback={() => setShowFeedback(true)} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Left Column: Dashboard (Sticky) */}
          <aside className="lg:col-span-4 space-y-5 sm:space-y-6 order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
            {/* Progress Card */}
            <div className="glass rounded-2xl shadow-xl border border-white/5 p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20">
                  <BarChart3 className="text-blue-400" size={18} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Your Progress</h3>
              </div>
              
              {/* Circular Progress */}
              <div className="flex items-center justify-center mb-6">
                 <div className="relative w-36 h-36 sm:w-44 sm:h-44">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                        <path 
                          className="text-blue-500 transition-all duration-1000 ease-out" 
                          strokeDasharray={`${stats.percent}, 100`} 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                          fill="none" 
                          stroke="url(#progressGradient)" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">{stats.percent}%</span>
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</span>
                    </div>
                 </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/30">
                    <span className="text-sm font-medium text-slate-400">Modules</span>
                    <span className="text-sm font-bold text-white">{stats.doneWeeks}<span className="text-slate-600">/15</span></span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/30">
                    <span className="text-sm font-medium text-slate-400">Current Rank</span>
                    <span className="text-sm font-bold gradient-text">{stats.rank}</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="glass rounded-2xl border border-white/5 p-1.5">
                <div className="relative flex items-center">
                    <Search className="absolute left-4 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search modules..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm text-white focus:outline-none placeholder-slate-500 rounded-xl"
                    />
                </div>
            </div>

            {/* Learning Streak */}
            <LearningStreak streak={userProgress.streak || 0} streakHistory={userProgress.streakHistory || []} />

            {/* Achievements Button */}
            <button 
              onClick={() => setShowAchievements(true)}
              className="w-full glass rounded-2xl border border-white/5 p-4 hover:border-yellow-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all">
                    <Award className="text-yellow-400" size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white">Achievements</h3>
                    <p className="text-xs text-slate-500">
                      {ACHIEVEMENTS.filter(a => {
                        if (a.condition === 'topics') return stats.doneTopics >= a.value;
                        if (a.condition === 'modules') return stats.doneWeeks >= a.value;
                        if (a.condition === 'streak') return (userProgress.streak || 0) >= a.value;
                        if (a.condition === 'percent') return stats.percent >= a.value;
                        if (a.condition === 'bookmarks') return (userProgress.bookmarks?.length || 0) >= a.value;
                        if (a.condition === 'flashcards') return (userProgress.reviewedFlashcards?.length || 0) >= a.value;
                        if (a.condition === 'notes') return Object.keys(userProgress.notes || {}).length >= a.value;
                        return false;
                      }).length} / {ACHIEVEMENTS.length} Unlocked
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-slate-500 group-hover:text-yellow-400 transition-colors" size={18} />
              </div>
            </button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowFlashcards(true)}
                className="glass rounded-xl border border-white/5 p-4 hover:border-cyan-500/30 transition-all group text-left"
              >
                <Zap className="text-cyan-400 mb-2" size={20} />
                <h4 className="text-sm font-bold text-white">Flashcards</h4>
                <p className="text-xs text-slate-500">{FLASHCARDS_DATA.length} cards</p>
              </button>
              
              <button
                onClick={() => setShowTimer(true)}
                className="glass rounded-xl border border-white/5 p-4 hover:border-orange-500/30 transition-all group text-left"
              >
                <Timer className="text-orange-400 mb-2" size={20} />
                <h4 className="text-sm font-bold text-white">Study Timer</h4>
                <p className="text-xs text-slate-500">Pomodoro</p>
              </button>
              
              <button
                onClick={() => { setDartPadCode(''); setShowDartPad(true); }}
                className="glass rounded-xl border border-white/5 p-4 hover:border-blue-500/30 transition-all group text-left"
              >
                <FileCode className="text-blue-400 mb-2" size={20} />
                <h4 className="text-sm font-bold text-white">DartPad</h4>
                <p className="text-xs text-slate-500">Code in browser</p>
              </button>
              
              <button
                onClick={() => setShowBookmarks(true)}
                className="glass rounded-xl border border-white/5 p-4 hover:border-pink-500/30 transition-all group text-left"
              >
                <Bookmark className="text-pink-400 mb-2" size={20} />
                <h4 className="text-sm font-bold text-white">Bookmarks</h4>
                <p className="text-xs text-slate-500">{userProgress.bookmarks?.length || 0} saved</p>
              </button>
              
              <button
                onClick={() => setShowExportImport(true)}
                className="glass rounded-xl border border-white/5 p-4 hover:border-emerald-500/30 transition-all group text-left"
              >
                <Download className="text-emerald-400 mb-2" size={20} />
                <h4 className="text-sm font-bold text-white">Backup</h4>
                <p className="text-xs text-slate-500">Export data</p>
              </button>
              
              <button
                onClick={() => setShowShareProgress(true)}
                className="glass rounded-xl border border-white/5 p-4 hover:border-cyan-500/30 transition-all group text-left"
              >
                <Share2 className="text-cyan-400 mb-2" size={20} />
                <h4 className="text-sm font-bold text-white">Share</h4>
                <p className="text-xs text-slate-500">Your progress</p>
              </button>
            </div>
          </aside>

          {/* Right Column: Roadmap Timeline */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Curriculum Timeline</h2>
                  <p className="text-sm text-slate-500">Complete each module to unlock your potential</p>
                </div>
                <div className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-400 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                  {filteredModules.length} Modules
                </div>
            </div>

            <div className="relative">
               {filteredModules.map((module, index) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  completedTopics={userProgress.completedTopics}
                  completedWeeks={userProgress.completedWeeks}
                  toggleTopic={toggleTopic}
                  isExpanded={expandedId === module.id}
                  onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                  index={index}
                  isLast={index === filteredModules.length - 1}
                  onOpenGitHub={(moduleId, moduleName, code) => setGithubModal({ show: true, moduleId, moduleName, code })}
                  onOpenDartPad={(code) => { setDartPadCode(code); setShowDartPad(true); }}
                  onOpenCertificate={(moduleId, moduleName) => setCertificateModal({ show: true, moduleId, moduleName })}
                />
              ))}
            </div>

            {filteredModules.length === 0 && (
              <div className="text-center py-20 glass rounded-2xl border border-white/5">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                  <Trophy size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-400 font-medium mb-2">No modules found</p>
                <p className="text-sm text-slate-500">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {showAchievements && (
        <AchievementsPanel 
          completedTopics={userProgress.completedTopics}
          completedWeeks={userProgress.completedWeeks}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {showFlashcards && (
        <FlashcardsModal
          onClose={() => setShowFlashcards(false)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      )}

      {showTimer && (
        <StudyTimer onClose={() => setShowTimer(false)} />
      )}

      {showExportImport && (
        <ExportImportModal
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onClose={() => setShowExportImport(false)}
        />
      )}

      {showBookmarks && (
        <BookmarksPanel
          bookmarks={userProgress.bookmarks || []}
          roadmapData={ROADMAP_DATA}
          onClose={() => setShowBookmarks(false)}
          onRemoveBookmark={toggleBookmark}
        />
      )}

      {notesModal.show && (
        <NotesModal
          moduleId={notesModal.moduleId}
          moduleName={notesModal.moduleName}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onClose={() => setNotesModal({ show: false, moduleId: null, moduleName: '' })}
        />
      )}

      {showDartPad && (
        <DartPadEmbed
          initialCode={dartPadCode}
          onClose={() => setShowDartPad(false)}
        />
      )}

      {githubModal.show && (
        <GitHubProjectModal
          moduleId={githubModal.moduleId}
          moduleName={githubModal.moduleName}
          projectCode={githubModal.code}
          onClose={() => setGithubModal({ show: false, moduleId: null, moduleName: '', code: '' })}
        />
      )}

      {certificateModal.show && (
        <CertificateModal
          moduleId={certificateModal.moduleId}
          moduleName={certificateModal.moduleName}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onClose={() => setCertificateModal({ show: false, moduleId: null, moduleName: '' })}
        />
      )}

      {showPackages && (
        <PackagesResourcesModal
          onClose={() => setShowPackages(false)}
        />
      )}

      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
        />
      )}

      {showShareProgress && (
        <ShareProgressModal
          onClose={() => setShowShareProgress(false)}
          userProgress={userProgress}
          stats={stats}
        />
      )}
    </div>
  );
}