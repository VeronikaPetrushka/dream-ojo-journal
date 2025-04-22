import RouteWrapper from "../appHelpers/RouteWrapper"
import DairyDetails from "../routeComponents/DairyDetails"

const DairyDetailsRoute = ({ route }) => {
    const { item } = route.params || {};

    return (
        <RouteWrapper child={<DairyDetails item={item} />} />
    )
};

export default DairyDetailsRoute;