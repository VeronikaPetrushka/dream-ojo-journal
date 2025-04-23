import RouteWrapper from "../appHelpers/RouteWrapper"
import AddDiary from "../routeComponents/AddDairy"

const AddDairyRoute = ({ route }) => {
    const { item } = route.params || {};

    return (
        <RouteWrapper child={<AddDiary item={item} />} back={'main'} />
    )
};

export default AddDairyRoute;