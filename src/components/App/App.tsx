import { Navigate, Route, Routes } from "react-router-dom";
import { BaseLayout } from "../pages/BaseLayout/BaseLayout";
import { HomePage } from "../pages/HomePage";
import { privateRoutes, publicRoutes } from "../../routes";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export const App = () => {
  const isAuth = useContext(AuthContext);
  return (
    <BaseLayout>
      <Routes>
        <Route index element={<HomePage />} />
        {isAuth
          ? privateRoutes.map((routeProps) => (
              <Route key={routeProps.path} {...routeProps} />
            ))
          : publicRoutes.map((routeProps) => (
              <Route key={routeProps.path} {...routeProps} />
            ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BaseLayout>
  );
};
