// components/Common/Layout/ContainerLayout.js
import { Outlet } from "react-router-dom";

function ContainerLayout() {
  return (
    <div className="container pt-[75px]">
      <Outlet />
    </div>
  );
}

export default ContainerLayout;
