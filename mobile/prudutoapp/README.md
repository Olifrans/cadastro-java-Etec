
## Instalar dependencias do Projeto

npm i expo
npm i expo-router
npm i react
npm i expo-status-bar
npm i react-native
npm i @expo/vector-icons
npm i @react-navigation/native
npm i @babel/core
npm i @types/react
npm i typescript
npm i  @react-navigation/bottom-tabs
npm i  react-native-screens
npm i  react-native-safe-area-context
npm i react-native-gesture-handler
npm i  axios



# Estrutura do Projeto
text
expo-produtos-app/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   ├── useCategories.ts
│   │   └── useModal.ts
│   ├── components/
│   │   ├── ProductList.tsx
│   │   ├── ProductForm.tsx
│   │   ├── CategoryList.tsx
│   │   ├── CategoryForm.tsx
│   │   ├── Dashboard.tsx
│   │   └── Modal.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ProductsScreen.tsx
│   │   ├── CategoriesScreen.tsx
│   │   └── ReportsScreen.tsx
│   └── navigation/
│       └── AppNavigator.tsx
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json

# package.json
{
  "name": "produtos-app",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.3",
    "@expo/vector-icons": "^13.0.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "react-native-screens": "~3.22.0",
    "react-native-safe-area-context": "4.6.0",
    "react-native-gesture-handler": "~2.12.0",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.14",
    "typescript": "^5.1.3"
  }
}

