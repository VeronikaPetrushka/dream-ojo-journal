import RouteWrapper from "../appHelpers/RouteWrapper"
import OjoImages from "../routeComponents/OjoImages"

const OjoImagesRoute = () => {
    return (
        <RouteWrapper child={<OjoImages />} main={true} back={'main'} />
    )
};

export default OjoImagesRoute;