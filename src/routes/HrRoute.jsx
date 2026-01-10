import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ForbiddenAccess from "../Components/ForbiddenAccess/ForbiddenAccess";


const HrRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = useRole();

  //jodi data na thake tahole "loading" show hobe
  if (loading || roleLoading) {
    return (
      <div>
        {/* <span className="loading loading-spinner text-success"></span> */}
        <span className="loading loading-spinner text-blue-700 mr-2"></span>
      </div>
    );
  }

  //akhane jeheto "role" dea condition set kora hocce,tai:
  if (role !== "hr") {
    return <ForbiddenAccess></ForbiddenAccess>;
  }

  //   rr jodi "role" -->"hr" hoa,tahole "children[mane jei page aa jete chai]" aa chole jabe
  return children;
};

export default HrRoute;
