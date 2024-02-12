// Fichier App.js de l'application
// Auteur : KB
// Objet : Page principale
// MAJ 08/02, CP : ajout écrans supplémentaires, TabNavigation et Stack, 
// gestion fontGoogle MaterialCommunityIcons, suppression des imports et fonctions inutilisées
//
// --------------------------------------------------

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import for redux persistance
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

//import storage from 'redux-persist/lib/storage'; //KB : pour react "classique"
import AsyncStorage from "@react-native-async-storage/async-storage";

//import of components

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ProfilScreen from "./screens/ProfilScreen";
import PromenadeScreen from "./screens/PromenadeScreen";
import FavorisScreen from "./screens/FavorisScreen";
import RegisterScreen from "./screens/RegisterScreen";

import {Alert,StyleSheet} from "react-native";

// import font & Icons
import {
  useFonts,
  BioRhyme_400Regular,
  BioRhyme_700Bold,
} from "@expo-google-fonts/biorhyme";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";

import { MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";


// import of reducers
import user from "./reducers/user";
const reducers = combineReducers({ user });
const persistConfig = { key: "caniconnect", storage: AsyncStorage }; //ici le storage de react est remplacé par "storage: AsyncStorage" de react-native

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);



//pour la navigation "nested"
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let iconLib = "";
          
          Alert.alert("Console Log", `Info : ${route.name}`)
          switch (route.name) {
            case "Home":
              iconLib = "MI";
              iconName ="home";
              
              break;
            case "Promenade":
              iconLib = "MCI";
              iconName = focused ? "paw":"paw-outline";
              break;
            case "Favoris":
              iconLib = "AD";
              iconName = "idcard"
              break;
            case "Profil":
              iconLib = "MCI";
              iconName = "dog"
              break;
            /*
            // a activer pour rechercher un pro
            case "ContactPro":
              iconLib= "AD"
              iconName = "contacts"
              break; */
            default:
              return Alert.alert("Oups !", "Pb switch case TabNavigator : route.name ");
          }
          focused
            ? ((size = 22), (color = "#F2B872"))
            : ((size = 20), (color = "black"));
          switch (iconLib) {
            case MI:
              <MaterialIcons name={iconName} size={size} color={color} />;
              break;
            case MCI:
              <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              break;
              case AD:
              <AntDesign name={iconName} size={size} color={color} />;
              break;
            default:
              return Alert.alert("Oups !", "Pb switch iconLib TabNavigator");
              break;
          }
          
          return 
        },
        tabBarActiveTintColor: "#f2B872",
        tabBarInactiveTintColor: "#335561",
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Promenade" component={PromenadeScreen} />
      <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  // utilisation font google
  let [fontsLoaded] = useFonts({
    BioRhyme_400Regular,
    BioRhyme_700Bold,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    navigation.navigate('TabNavigator')
  } ,[])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
