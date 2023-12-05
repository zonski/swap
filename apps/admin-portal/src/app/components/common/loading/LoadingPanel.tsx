import {ReactElement} from "react";
import {LoadingSpinner} from "./LoadingSpinner";

interface Params {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  children: ReactElement | ReactElement[];
}

export const LoadingPanel = (params: Params) => {

  const {
    isLoading,
    children
  } = params;

  if (isLoading) {
    return (<LoadingSpinner/>)
  }

  return (
    <div>
      {children}
    </div>
  );
}
