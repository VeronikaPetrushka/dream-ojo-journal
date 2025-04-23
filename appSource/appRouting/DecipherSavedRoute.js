import RouteWrapper from "../appHelpers/RouteWrapper"
import DecipherSaved from "../routeComponents/DecipherSaved"

const DecipherSavedRoute = () => {
    return (
        <RouteWrapper child={<DecipherSaved />} back={'main'} />
    )
};

export default DecipherSavedRoute;