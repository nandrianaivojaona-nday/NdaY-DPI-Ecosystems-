# NdaY'Internal setup

1. Firebase console (project `nday-website`): enable Authentication > Email/Password and create Firestore Database.
2. Project settings > Your apps > Web app: copy the config into `.env.local`:
   NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID
3. Authentication > Users: add yourself (email + password).
4. Firestore > create collection `staff`, document ID = your user UID, fields: role = "admin", active = true (boolean), email.
   Roles: admin, manager, finance, viewer. Staff documents can only be created in the console.
5. Publish rules: `firebase deploy --only firestore:rules` (or paste firestore.rules into the console).
6. Restart `npm run dev` and open /ecosystem/internal.
