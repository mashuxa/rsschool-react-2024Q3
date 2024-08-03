"use client";

import { FC } from "react";

const ErrorPage: FC = () => {
  return (
    <div data-testid="error-page" className="text-5xl text-center mt-60">
      <h1 className="text-red-800 border text-5xl">Error: </h1>
      Some error
    </div>
  );
};

export default ErrorPage;
