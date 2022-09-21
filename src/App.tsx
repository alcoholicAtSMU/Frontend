import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import axios from "axios";

function App() {
  useEffect(() => {
    const expiration = localStorage.getItem("expiration");
    if (expiration !== null) {
      // token을 저장한 시간보다 현재 시간이 크다는 것은, 접속 후 1시간(설정시간)이 지나지 않았다는 것을 의미한다.
      if (new Date(expiration) < new Date()) {
        axios({
          method: "GET",
          url: `/auth/refresh`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            console.log(res.data);
            const ACCESS_TOKEN = res.data.jwtToken;
            localStorage.setItem("token", ACCESS_TOKEN);
            localStorage.setItem(
              "expiration",
              new Date(new Date().getTime() + 60 * 1000 * 60 * 3).toISOString()
            );
            console.log("token is refreshed");
          })
          .catch((err) => {
            console.log("token refresh error", err);
          });
      }
    }
  });
  return <AppRouter />;
}

export default App;
