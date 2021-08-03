import * as React from "react";
/******
 *
 * @function:404
 *
 * *******/
function NotFound(): React.ReactElement<any> {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontSize: 24,
      }}
    >
      兄弟，404了
    </div>
  );
}

export default React.memo(NotFound);
