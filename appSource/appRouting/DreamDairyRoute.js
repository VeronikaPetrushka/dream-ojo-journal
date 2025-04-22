import RouteWrapper from "../appHelpers/RouteWrapper"
import DreamDairy from "../routeComponents/DreamDairy"

const DreamDairyRoute = () => {
    return (
        <RouteWrapper child={<DreamDairy />} main={true} />
    )
};

export default DreamDairyRoute;