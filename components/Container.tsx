import React from "react";

export const Container = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return <div className="mx-auto w-full max-w-6xl p-6 md:p-10">{children}</div>;
};
