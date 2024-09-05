

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
//   import Navigation from "./navigation/Navigation";

// const App = () => {
//   return ( 

//     <NavigationContainer>
//       <Navigation/>
//     </NavigationContainer>

//   );
// };

// export default App;



import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import SplashScreen from "./components/SplashScreen/SplashScreen"; 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />; 
  }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;




