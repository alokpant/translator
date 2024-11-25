# Project: Universal Message Translator

The Universal Message Translator app enables users to translate incoming messages (e.g., SMS) from one language to another in real-time. It provides a seamless experience for users who wish to understand messages in their preferred language. The project is designed for scalability, supporting multiple languages, data storage, and cross-platform functionality in the future.

# Tech Stack

Frontend: React Native (for cross-platform mobile development)
State Management: Redux
APIs:
    Google Translate API (translation functionality)
Authentication:
    Firebase Authentication (Google and Apple sign-in)
Backend:
    Firebase Firestore (database for storing user preferences, translations, etc.)
Cloud Storage: Firebase Storage (for storing app-related data)
Build and Deployment:
    Android Studio / Xcode (for building and testing on Android and iOS)
    App Store / Google Play Store for app distribution

# Database Diagram

+----------------------+
|       Users          |
+----------------------+
| user_id (Primary Key)|
| name                 |
| email                |
| auth_provider        |
| created_at           |
+----------------------+

+----------------------+
|    Translations      |
+----------------------+
| translation_id (PK)  |
| user_id (Foreign Key)|
| original_message     |
| translated_message   |
| source_language      |
| target_language      |
| created_at           |
+----------------------+

# Project Steps
Step 1: Create Project
- Initialize a new React Native project using npx react-native init UniversalTranslator.
- Install required dependencies such as Redux, Firebase, and Axios for API calls.

Step 2: Read Incoming Messages
- Use the React Native Permissions API and SMS Reader plugins to request permissions and read incoming SMS messages on Android.
- Parse the message content for translation.

Step 3: Connect to Google Translate API
- Obtain an API key from Google Cloud for the Google Translate API.
- Integrate the API with Axios to handle translation requests.

Step 4: Translate and Display Messages
- Translate incoming message content using the Google Translate API.
- Display the original and translated text within the app UI.

Step 5: Build and Test
- Test the app on both Android and iOS simulators/emulators.
- Fix any bugs related to permission handling, translation API integration, or UI inconsistencies.

Step 6: Add Cloud Functionality
- Set up Firebase Firestore to store translated messages and user preferences.
- Store translations with metadata like source language, target language, and timestamp.

Step 7: Build Database
- Create a Firestore database structure as per the database diagram above.
- Implement queries to retrieve and display user-specific translations.

Step 8: Add Authentication
- Use Firebase Authentication to enable Google login.
- Store user details in the database upon successful login.

Step 9: Add Apple Authentication
- Integrate Apple Sign-In for iOS users using Firebase Authentication.
- Test for compatibility with iOS devices.

Step 10: Implement Real-Time Features
- Use Firebase's real-time capabilities to sync translations across multiple devices.

Step 11: Optimize for Multi-Language Support
- Enhance the translation feature to support multiple source and target languages.
- Add a dropdown menu for users to select desired languages.

Step 12: Cross-Platform Testing
- Test the app extensively on various devices to ensure compatibility across platforms.

Step 13: Deploy the App
- Build release versions for Android and iOS.
- Publish the app to the Google Play Store and Apple App Store.

Step 14: Scale and Monitor
- Monitor app performance and user activity using Firebase Analytics.
- Scale the app infrastructure as the user base grows.

# Project Structure

```
/src
  /app
    /components
      /MessageCard          # Reusable UI components
      /TranslationButton    # Button components
    /hooks
      useAppPermissions.ts  # Custom hooks for app permissions
      useTextToSpeech.ts    # Hook for Text-to-Speech functionality
    /pages
      Home.tsx              # Home screen
      Settings.tsx          # Settings screen
      Login.tsx             # Authentication screen
  /domain
    /entities
      Message.ts            # Message entity
      Translation.ts        # Translation entity
    /repositories
      MessageRepository.ts  # Interface for message data operations
      TranslationRepository.ts # Interface for translation operations
  /infrastructure
    /api
      GoogleTranslateAPI.ts # Integration with Google Translate API
      FirebaseService.ts    # Firebase setup and interaction
    /data
      /local
        LocalMessageSource.ts   # Local data source for messages
      /remote
        RemoteTranslationSource.ts # Remote source for translations
  /usecases
    TranslateMessage.ts     # Use case for translating messages
    AuthenticateUser.ts     # Use case for authentication
    SaveTranslation.ts      # Use case for saving translations
  /utils
    constants.ts            # Constants and configuration
    helpers.ts              # Helper functions

```

Explanation of Structure
- /app: Contains UI components, hooks, and page definitions for React Native screens.
- /domain: Core application logic, including entities and repositories that define the domain model.
- /infrastructure: Implements APIs and data handling (local and remote) as defined by the repositories.
- /usecases: Contains application-specific business logic, focused on user-driven workflows.
- /utils: Stores shared utilities, constants, and helpers.
