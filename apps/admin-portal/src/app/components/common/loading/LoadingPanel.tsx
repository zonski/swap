import {ReactElement} from "react";
import {LoadingSpinner} from "./LoadingSpinner";
import {ErrorMessage} from "../error/ErrorMessage";
import {ApiError} from "@swap/server-api";

interface Params {
  isLoading: boolean;
  isError: boolean;
  error?: ApiError | null;
  children: ReactElement | ReactElement[];
}

export const LoadingPanel = (params: Params) => {

  const {
    isLoading,
    isError,
    error,
    children
  } = params;

  if (isLoading) {
    return (<LoadingSpinner/>)
  }

  if (isError) {
    return (<ErrorMessage error={error}/>);
  }

  return (
    <div>
      {children}
    </div>
  );
}
