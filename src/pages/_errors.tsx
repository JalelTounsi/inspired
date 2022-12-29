import type { ReactElement } from "react";
import type { NextPageContext } from "next";
import Error, { ErrorProps } from "next/error";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

function CustomError({ statusCode }: ErrorProps) {
  return <Error statusCode={statusCode} />;
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

CustomError.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default CustomError;
