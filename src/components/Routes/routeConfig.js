// routeConfig.js
import Home from '../pages/Home';
import POI from '../pages/POI';
import About from '../pages/About';
import HuntTimeline from '../pages/UserAnswers/userView/HuntTimeline.jsx';
import LoginPage from '../pages/Auth Pages/Login/Login';
import RegisterPage from '../pages/Auth Pages/Register/Register';
import AccountPage from '../pages/Account';
import LocationsTable from '../pages/Locations/Table/LocationsTable.jsx';
import UserRolesHomePage from '../pages/User/Admin/UserRolesHomePage.jsx';
import GlobalSettingsPage from '../pages/Settings/HuntSettings/GlobalSettingsPage.jsx';
import UserAnswersPage from '../pages/UserAnswers/userView/userAnswersPage.jsx';
import AdminAnswersLandingPage from '../pages/UserAnswers/adminView/answersAdminLandingPage.jsx';
import LandingPage from '../pages/Landing/LandingPage.jsx';
const routeConfig = [
  {
    path: '/user',
    element: AccountPage,
    protected: true,
    permissionLevel : "0x01"
  },
  {
    path: '/user/roles',
    element: UserRolesHomePage,
    protected: true,
    permissionLevel : "0x60"

  },
  {
    path: '/',
    element: Home,
    protected: true,
    permissionLevel : "0x01"

  },
  {
    path: '/poi',
    element: POI,
    protected: true, 
    permissionLevel : "0x01"

  },
  {
    path: '/locations/admin',
    element: LocationsTable,
    protected: true,
    permissionLevel : "0x60"

  },
  {
    path: "/answers/myAnswers",
    element: UserAnswersPage,
    protected: true,
    permissionLevel : "0x01",
  },
  {
    path: "/answers/adminView",
    element: AdminAnswersLandingPage,
    protected: true,
    permissionLevel : "0x60",
  },
  {
    path: '/about',
    element: About,
    protected: true,
    permissionLevel : "0x01"

  },
  {
    path: '/login',
    element: LoginPage,
    protected: false,
    permissionLevel : null,

  },
  {
    path: '/landing',
    element: LandingPage,
    protected: false,
    permissionLevel : null,

  },
  {
    path: '/register',
    element: RegisterPage,
    protected: false,
    permissionLevel : null,

  },
  {
    path: '/globalSettings',
    element: GlobalSettingsPage,
    protected: true,
    permissionLevel : "0x60",

  },
  
];

export default routeConfig;
