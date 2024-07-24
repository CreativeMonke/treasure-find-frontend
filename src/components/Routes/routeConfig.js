// routeConfig.js
import Home from "../pages/Home";
import POI from "../pages/POI";
import About from "../pages/About";
import LoginPage from "../pages/Auth Pages/Login/Login";
import RegisterPage from "../pages/Auth Pages/Register/Register";
import AccountPage from "../pages/Account";
import LocationsTable from "../pages/Locations/Table/LocationsTable.jsx";
import UserRolesHomePage from "../pages/User/Admin/UserRolesHomePage.jsx";
import GlobalSettingsPage from "../pages/Settings/HuntSettings/GlobalSettingsPage.jsx";
import UserAnswersPage from "../pages/UserAnswers/userView/userAnswersPage.jsx";
import AdminAnswersLandingPage from "../pages/UserAnswers/adminView/answersAdminLandingPage.jsx";
import LandingPage from "../pages/Landing/LandingPage.jsx";
import VerifyEmailPage from "../pages/Auth Pages/VerifyEmail/VerifyEmailPage.jsx";
import SupportPage from "../pages/Support/SupportPage.jsx";
import DocsSupportPage from "../Docs/Support/DocsSupportPage.jsx";
import HuntsPage from "../pages/Hunts/HuntsPage.jsx";
import Hunts from "../pages/Hunts/Hunts.jsx";
import HuntDetailsPage from "../pages/Hunts/Other Pages/HuntDetailsPage.jsx";
import CurrentHuntDetails from "../pages/Hunts/Other Pages/CurrentHuntDetails.jsx";
import GeneralHuntDetails from "../pages/Hunts/Other Pages/GeneralHuntDetails.jsx";
import MyHunts from "../pages/Hunts/Other Pages/MyHunts/MyHunts.jsx";
import UserSettingPage from "../pages/Settings/UserSetting/UserSettingPage.jsx";
import ChangeEmailPage from "../pages/Settings/ChangeEmail/ChangeEmailPage.jsx";
import ChangePasswordPage from "../pages/Settings/ChangePassword/ChangePasswordPage.jsx";
import ResetPasswordPage from "../pages/Settings/ResetPassword/ResetPasswordPage.jsx";
const routeConfig = [
  {
    path: "/user",
    element: AccountPage,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/user/roles",
    element: UserRolesHomePage,
    protected: true,
    permissionLevel: "0x60",
  },
  {
    path: "/",
    element: Home,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/poi",
    element: POI,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/locations/myLocations/edit",
    element: LocationsTable,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/answers/myAnswers",
    element: UserAnswersPage,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/answers/adminView",
    element: AdminAnswersLandingPage,
    protected: true,
    permissionLevel: "0x60",
  },
  {
    path: "/about",
    element: About,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/login",
    element: LoginPage,
    protected: false,
    permissionLevel: null,
  },
  {
    path: "/landing",
    element: LandingPage,
    protected: false,
    permissionLevel: null,
  },
  {
    path: "/register",
    element: RegisterPage,
    protected: false,
    permissionLevel: null,
  },
  {
    path: "/verifyEmail",
    element: VerifyEmailPage,
    protected: false,
    permissionLevel: null,
  },
  {
    path: "/globalSettings",
    element: GlobalSettingsPage,
    protected: true,
    permissionLevel: "0x60",
  },
  {
    path: "/support",
    element: SupportPage,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "docs/support",
    element: DocsSupportPage,
    protected: false,
    permissionLevel: null,
  },
  {
    path: "/hunts",
    element: Hunts,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/hunts/myHunts",
    element: MyHunts,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: "/hunts/details/:id",
    element: GeneralHuntDetails,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: `/hunts/currentHuntDetails`,
    element: CurrentHuntDetails,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: `/settings/account`,
    element: UserSettingPage,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: `/settings/changeEmail`,
    element: ChangeEmailPage,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: `/settings/changePassword`,
    element: ChangePasswordPage,
    protected: true,
    permissionLevel: "0x01",
  },
  {
    path: `/settings/resetPassword`,
    element: ResetPasswordPage,
    protected: false,
    permissionLevel: "0x00",
  },
];

export default routeConfig;
