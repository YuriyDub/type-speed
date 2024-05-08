import { Component } from "react";
import { LogInPage } from "./components/pages/LogInPage";
import { ModesPage } from "./components/pages/ModesPage";
import { SignUpPage } from "./components/pages/SignUpPage/SignUpPage";
import { SimpleModePage } from "./components/pages/SimpleModePage";
import {
  ACCOUNT_ROUTE,
  LOGIN_ROUTE,
  MODES_ROUTE,
  SIGNUP_ROUTE,
  SIMPLE_MODE_ROUTE,
} from "./utils/constants/routes";
import { AccountPage } from "./components/pages/AccountPage/AccountPage";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LogInPage,
  },
  {
    path: SIGNUP_ROUTE,
    Component: SignUpPage,
  },
];

export const privateRoutes = [
  {
    path: MODES_ROUTE,
    Component: ModesPage,
  },
  {
    path: SIMPLE_MODE_ROUTE,
    Component: SimpleModePage,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: AccountPage,
  },
];
