import RouteWrapper from "../appHelpers/RouteWrapper"
import Decipher from "../routeComponents/Decipher"

const DecipherRoute = () => {
    return (
        <RouteWrapper child={<Decipher />} main={true} back={'decipher'} />
    )
};

export default DecipherRoute;