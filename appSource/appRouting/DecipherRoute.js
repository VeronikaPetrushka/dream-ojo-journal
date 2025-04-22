import RouteWrapper from "../appHelpers/RouteWrapper"
import Decipher from "../routeComponents/Decipher"

const DecipherRoute = () => {
    return (
        <RouteWrapper child={<Decipher />} main={true} />
    )
};

export default DecipherRoute;