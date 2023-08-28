import React, { ReactNode } from "react";

const BookCard = ({ children }: { children: ReactNode }) => {
  return <div className="book">{children}</div>;
};

export default BookCard;
