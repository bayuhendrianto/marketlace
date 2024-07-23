import React from "react";
import ImageNoAccess from "../../public/no_access.png";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Oops!</h1>
      <h2>404 Not Found</h2>
      <div>Sorry, an error has occured, Requested page not found!</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={ImageNoAccess}
          style={{ width: "20rem", height: "auto" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default ErrorPage;
