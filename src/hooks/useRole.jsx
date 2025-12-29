import React from "react";
import useAuthSecure from "./useAuthSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAuthSecure();

  //jodi 'role' ar moddhe kono value na ase,tahole by default value hobe-->'user'...rr server side theke jodi "role" ar onno kono value ase,seta tokhon role ar moddhe set hoa jabe...default value problem korbe na...
  //server side aa user ar "email" send kore oi user ar data "get" korbo...data-base theke
  const { roleLoading, data: role = "employee" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      //server side aa email/id ke diff kore bujte parbe na,je kon ta email/id...amera 'email' dea condition set korte ci, like-->email jabe,role jabe...then cai 2 ta dea condition set korbo
      const res = await axiosSecure.get(`/users/${user.email}/role`);

      //akhn return korte hobe-->"res.data.role"...ata dile role ar data hr(string)
      //rr jodi amra only "res.data" ata return kortam, tahole value petam object-->{role: 'hr'}...but ame "dashboardLayout" ar moddhe "role=== 'admin(string)" hisebe condition set koreci
      return res.data?.role || 'employee';
    },
  });

  console.log('role data:', role); //out:{role: 'hr'}
//   jeheto ata akta "hook" ar value gulu ke amra diff page theke use korbo, tai value gulu ke "return" korte hobe
  return {role, roleLoading};
};

export default useRole;
