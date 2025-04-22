import AppLoader from "../routeComponents/AppLoader"
import { View } from 'react-native';

const AppLoaderRoute = () => {
    return (
        <View style={{flex: 1}}>
            <AppLoader />
        </View>
    )
};

export default AppLoaderRoute;