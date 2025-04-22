import RouteWrapper from "../appHelpers/RouteWrapper"
import DecipherSaved from "../routeComponents/DecipherSaved"

const DecipherSavedRoute = () => {
    return (
        <RouteWrapper child={<DecipherSaved />} />
    )
};

export default DecipherSavedRoute;