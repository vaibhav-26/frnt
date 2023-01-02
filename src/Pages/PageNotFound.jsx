import React from "react";

function PageNotFound() {
  return (
    <>
      <div
        id="wrapper"
        style={{
          display: "flex",
          flexDirectionL: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ width: "600px" }} src="https://i.imgur.com/qIufhof.png" />
        <div id="info">
          <h3>This page could not be found</h3>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
