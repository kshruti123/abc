import { Outlet } from "react-router-dom"
import UserChatComponent from "./UserChatcomponet";
const RouteWithUserChatComponent = ()=>{
    return (<>
    <UserChatComponent/>
    <Outlet/>
    </>
    )
};
export default RouteWithUserChatComponent;