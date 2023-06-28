import {withAuthenticationRequired} from "@auth0/auth0-react";
import React, {ComponentType} from "react";
import {LoadingPage} from "../loading/LoadingPage";

interface AuthenticationGuardProps {
  component: ComponentType;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (<LoadingPage />),
  });
  return <Component />;
};
