import RouteWrapper from "../appHelpers/RouteWrapper"
import OjoFavorites from "../routeComponents/OjoFavorites"

const OjoFavoritesRoute = () => {
    return (
        <RouteWrapper child={<OjoFavorites />} back={'main'} />
    )
};

export default OjoFavoritesRoute;