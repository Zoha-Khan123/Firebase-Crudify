import Home from "./Home"
import Signup from "./Auth/Signup"
import Login from "./Auth/Login"
import Dashboard from "./Auth/Dashboard"
import AppRoute from "../AppRoutes"
import {app} from "../Firebase/FirebaseConfig"
import {db} from "../Firebase/FirebaseConfig"
import CreateProject from "./CreateProject"
import Edit from "../screen/Edit"
import ProjectForm from "../components/ProjectForm"
import Loader from "../components/Loader/loader"


export {Home, Signup, Login, Dashboard, AppRoute , CreateProject , Edit  ,ProjectForm, Loader, app, db}