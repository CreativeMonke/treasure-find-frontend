// routeConfig.js
import Home from '../pages/Home';
import POI from '../pages/POI';
import About from '../pages/About';
import HuntTimeline from '../pages/HuntTimeline';
import LoginPage from '../pages/Auth Pages/Login/Login';
import RegisterPage from '../pages/Auth Pages/Register/Register';
import AccountPage from '../pages/Account';
import LocationsTable from '../pages/Locations/Table/LocationsTable.jsx';
import UserRolesHomePage from '../pages/User/Admin/UserRolesHomePage.jsx';
import GlobalSettingsPage from '../pages/Settings/HuntSettings/GlobalSettingsPage.jsx';
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
    path: '/about',
    element: About,
    protected: true,
    permissionLevel : "0x01"

  },
  {
    path: '/huntTimeline',
    element: HuntTimeline,
    protected: true, // Assuming this is a protected route
    permissionLevel : "0x01"

  },
  {
    path: '/login',
    element: LoginPage,
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
    protected: false,
    permissionLevel : null,

  },
];

export default routeConfig;
