import {FC} from "react";

interface Props {
  isLoading?: boolean;
}

export const LoadingPage: FC<Props> = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div>
      Loading...
    </div>
  );
};

export default LoadingPage;
