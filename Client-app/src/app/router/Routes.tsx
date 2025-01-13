import {createBrowserRouter,RouteObject} from "react-router-dom"
import App from "../layout/App"
import Homepage from "../features/Home/HomePage"
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard"
import ActivityForm from "../features/activities/form/ActivityForm"
import ActivityDetails from "../features/activities/details/ActivityDetails"

export const route:RouteObject[]=[
    {
        path:'/',
        element:<App/>,
        children:[           
            {path:'activities', element:<ActivityDashboard/>},
            {path:'activities/:id', element:<ActivityDetails/>},
            {path:'createActivity', element:<ActivityForm key='create'/>},
            {path:'manage/:id', element:<ActivityForm key='update'/>}
        ]
    }

]
export const router =createBrowserRouter(route)
