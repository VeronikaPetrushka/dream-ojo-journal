import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppLoaderRoute from './appSource/appRouting/AppLoaderRoute';
import DreamDairyRoute from './appSource/appRouting/DreamDairyRoute';
import AddDairyRoute from './appSource/appRouting/AddDairyRoute';
import DairyDetailsRoute from './appSource/appRouting/DairyDetailsRoute';
import OjoFavoritesRoute from './appSource/appRouting/OjoFavoritesRoute';
import OjoImagesRoute from './appSource/appRouting/OjoImagesRoute';
import DecipherRoute from './appSource/appRouting/DecipherRoute';
import DecipherSavedRoute from './appSource/appRouting/DecipherSavedRoute';
import OjoSettingsRoute from './appSource/appRouting/OjoSettingsRoute';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName={"AppLoaderRoute" }>    
                  <Stack.Screen 
                        name="AppLoaderRoute" 
                        component={AppLoaderRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="DreamDairyRoute" 
                        component={DreamDairyRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="AddDairyRoute" 
                        component={AddDairyRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="DairyDetailsRoute" 
                        component={DairyDetailsRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="OjoFavoritesRoute" 
                        component={OjoFavoritesRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="OjoImagesRoute" 
                        component={OjoImagesRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="DecipherRoute" 
                        component={DecipherRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="DecipherSavedRoute" 
                        component={DecipherSavedRoute} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="OjoSettingsRoute" 
                        component={OjoSettingsRoute} 
                        options={{ headerShown: false }} 
                  />
            </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
