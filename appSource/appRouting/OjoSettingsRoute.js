import RouteWrapper from "../appHelpers/RouteWrapper"
import OjoSettings from "../routeComponents/OjoSettings"

const OjoSettingsRoute = () => {
    return (
        <RouteWrapper child={<OjoSettings />} main={true} back={'main'} />
    )
};

export default OjoSettingsRoute;