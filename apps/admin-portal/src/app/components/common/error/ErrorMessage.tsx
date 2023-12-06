import {Alert, AlertDescription, AlertIcon, AlertTitle, Box} from "@chakra-ui/react";
import {ApiError} from "@swap/server-api";

interface Props {
  error?: ApiError,
  inline: boolean
}

export const ErrorMessage = ({error, inline}: Props) => {
  if (inline) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>There was an problem: </AlertTitle>
        <AlertDescription>{error?.message || "Unexpected error"}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Box>
      <h1>Something went wrong</h1>
      {error ? (
        <Box>
          <Box>Error message: {error.message}</Box>
          <Box>Error code: {error.code}</Box>
          <Box>HTTP status: {error.status}</Box>
        </Box>
      ) : (
        <Box>Error message: Unexpected error</Box>
      )}
    </Box>
  );
}
