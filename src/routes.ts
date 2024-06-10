import { LogInPage } from "./components/pages/LogInPage";
import { ModsPage } from "./components/pages/ModesPage";
import { SignUpPage } from "./components/pages/SignUpPage/SignUpPage";
import { SimpleModePage } from "./components/pages/SimpleModePage";
import {
  ACCOUNT_ROUTE,
  LOGIN_ROUTE,
  MODES_ROUTE,
  RAIN_MODE_ROUTE,
  RATINGS_ROUTE,
  SIGNUP_ROUTE,
  SIMPLE_MODE_ROUTE,
} from "./utils/constants/routes";
import { AccountPage } from "./components/pages/AccountPage/AccountPage";
import { RainModePage } from "./components/pages/RainModePage";
import { RatingsPage } from "./components/pages/RatingsPage";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LogInPage,
  },
  {
    path: SIGNUP_ROUTE,
    Component: SignUpPage,
  },

  {
    path: RATINGS_ROUTE,
    Component: RatingsPage,
  },
];

export const privateRoutes = [
  {
    path: MODES_ROUTE,
    Component: ModsPage,
  },
  {
    path: SIMPLE_MODE_ROUTE,
    Component: SimpleModePage,
  },
  {
    path: RAIN_MODE_ROUTE,
    Component: RainModePage,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: AccountPage,
  },
  {
    path: RATINGS_ROUTE,
    Component: RatingsPage,
  },
];
