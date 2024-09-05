


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons"; 
import WallpapersScreen from "../components/Wallpapers/WallpapersScreen";
import MoreScreen from "../components/MoreScreen/MoreScreen";
import AllImageScreen from "../components/Wallpapers/AllImageScreen";
import SearchTab from "../components/SearchTab/SearchTab";
import CardDetails from "../components/Wallpapers/CardDetails";
import SearchImage from "../components/SearchTab/SearchImage";
import CategoryScreen from "../components/CategoryTab/CategoryScreen";
import CategoryImages from "../components/CategoryTab/CategoryImages";
import CategoryImageCarousel from "../components/CategoryTab/CategoryImageCarousel";
import ImageCarousel from "../components/SearchTab/ImageCarousel";
import HomeImageCarousel from "../components/Wallpapers/HomeImageCarousel";
import FavoritesScreen from "../components/MoreScreen/FavoritesScreen";
import DownloadsScreen from "../components/MoreScreen/DownloadsScreen";


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const SearchStack=createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();


const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Wallpapers" component={WallpapersScreen} options={{ headerShown: false,  }}/>
    <HomeStack.Screen name="AllImages" component={AllImageScreen} options={{headerShown: false}}/> 
    <HomeStack.Screen name="FullImage" component={SearchImage} options={{ headerShown: false, }} /> 
    <HomeStack.Screen name="HomeImageCarousel" component={HomeImageCarousel} options={{headerShown: false}} /> 
</HomeStack.Navigator>
);

const CategoryStackScreen = () => (
  <CategoryStack.Navigator>
    <CategoryStack.Screen name="CategoryHome" component={CategoryScreen} options={{headerShown:false}} />
    <CategoryStack.Screen name="CategoryImages" component={CategoryImages} options={{headerShown:false}} /> 
    <CategoryStack.Screen name="CategoryImageCarousel" component={CategoryImageCarousel} options={{headerShown:false}} /> 
  </CategoryStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="SearchHome" component={SearchTab} options={{ headerShown: false }} />
    <SearchStack.Screen name="SearchImages" component={SearchImage} options={{ headerShown: false }} />
    
  </SearchStack.Navigator>
);

const MoreStackScreen = () => (
  <MoreStack.Navigator>
    <MoreStack.Screen name="Profile" component={MoreScreen} options={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
            fontSize:24,
          },
        }} />
    <MoreStack.Screen name="Favorites" component={FavoritesScreen} options={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
            fontSize:24,
          },
        }}/>
    <MoreStack.Screen name="Downloads" component={DownloadsScreen} options={{
          headerStyle: {
            backgroundColor: 'black', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
            fontSize:24,
          },
        }}/>
  </MoreStack.Navigator>
);




const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'; 
          } else if (route.name === 'Category') {
            iconName = 'options-sharp'; 
          } else if (route.name === 'Search') {
            iconName = 'search'; 
          } else if (route.name === 'My Profile') {
            iconName = 'person'; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
          
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen}/>
      <Tab.Screen name="Category" component={CategoryStackScreen}/>
      <Tab.Screen name="Search" component={SearchStackScreen}/>
      <Tab.Screen name="My Profile" component={MoreStackScreen}/>
    </Tab.Navigator>
  );
};

export default Navigation;

