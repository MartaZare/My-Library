import React, { ReactNode } from "react";

const LibraryLayout = ({ children }: { children: ReactNode }) => {
  return <div className="library">{children}</div>;
};

export default LibraryLayout;
