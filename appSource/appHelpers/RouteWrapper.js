import { View, Dimensions } from 'react-native';
import OjoNavPanel from '../routeComponents/OjoNavPanel';
import { ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

const RouteWrapper = ({ child, main, back }) => {
    const image = back === 'main' ? require('../appAssets/AppBackground.png') : require('../appAssets/decipherBackground.png');

    return (
        <ImageBackground source={image} style={{flex: 1}}>
            <View style={{ width: '100%', height: '100%', padding: 20, paddingTop: height * 0.08, alignItems: 'center' }}>
                <View style={{ width: '100%', height: '100%' }}>{child}</View>
                {
                    main &&
                    (
                        <View style={{ width: '100%', position: 'absolute', bottom: 35 }}>
                            <OjoNavPanel />
                        </View>
                    )
                }
            </View>
        </ImageBackground>
    )
};

export default RouteWrapper;