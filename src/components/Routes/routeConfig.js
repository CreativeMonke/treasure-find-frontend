// routeConfig.js
import Home from '../pages/Home';
import POI from '../pages/POI';
import About from '../pages/About';
import HuntTimeline from '../pages/HuntTimeline';
import LoginPage from '../pages/Auth Pages/Login/Login';
import RegisterPage from '../pages/Auth Pages/Register/Register';
import AccountPage from '../pages/Account';
import LocationsTable from '../pages/Locations/Table/LocationsTable.jsx';
const routeConfig = [
  {
    path: '/account',
    element: AccountPage,
    protected: true,
  },
  {
    path: '/',
    element: Home,
    protected: true,
  },
  {
    path: '/poi',
    element: POI,
    protected: true, // Assuming this is a protected route
  },
  {
    path: '/locations/admin',
    element: LocationsTable,
    protected: true,
  },
  {
    path: '/about',
    element: About,
    protected: true,
  },
  {
    path: '/huntTimeline',
    element: HuntTimeline,
    protected: true, // Assuming this is a protected route
  },
  {
    path: '/login',
    element: LoginPage,
    protected: false,
  },
  {
    path: '/register',
    element: RegisterPage,
    protected: false,
  },
];

export default routeConfig;
