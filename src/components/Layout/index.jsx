import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div>
        Layout
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
