import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <>
        <nav>네비바</nav>
        <div>{children}</div>
      </>
    </div>
  );
};

export default Layout;
