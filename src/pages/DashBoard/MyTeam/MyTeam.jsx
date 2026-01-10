import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";
import { Building2, Users, Cake } from "lucide-react";



const BirthdayCakeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-pink-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4m0 4h.01M7 20h10a2 2 0 002-2v-7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z"
    />
  </svg>
);

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  // Companies
  const { data: companies = [] } = useQuery({
    queryKey: ["myCompanies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee/my-companies");
      return res.data;
    },
  });

  // Team
  const { data: team = [] } = useQuery({
    queryKey: ["myTeam", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-team/employee?companyName=${selectedCompany}`
      );
      return res.data;
    },
  });

  // Birthdays
  const { data: birthdays = [], isLoading } = useQuery({
    queryKey: ["upcomingBirthdays"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-birthdays/employee");
      return res.data;
    },
  });




  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        My Team
      </h2>

      {/* Company Select */}
      <select
        className="select select-bordered select-warning w-full max-w-sm mb-8 border-amber-300"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="" disabled className="text-secondary">
          Select Company
        </option>
        {companies.map((c) => (
          <option key={c} value={c} className="text-primary">
            {c}
          </option>
        ))}
      </select>

    

      {/* TEAM SECTION */}
      {!selectedCompany ? (
        
      
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        //   className="border border-dashed rounded-xl p-10 text-center bg-base-100"
        className="border border-dashed border-orange-400 hover:border-orange-500 transition-colors duration-200 rounded-xl p-10 text-center bg-base-100"

        >
            
          <div className="flex justify-center mb-4">
            <Building2 size={48} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Select a Company
          </h3>
          <p className="text-secondary max-w-md mx-auto">
            Choose a company from the dropdown to view your colleagues
            and team members associated with that organization.
          </p>
        </motion.div>
       
      ) :


       team.length === 0 ? (
        <div className="text-center text-secondary mt-10">
          {/* No team members found */}
           <span className="loading loading-dots loading-sm text-primary"></span>
        </div>
      ) 

      :
      
      (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="rounded-xl  bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-md"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src={member.photo || "/avatar.png"}
                  className="w-20 h-20 rounded-full border-2 border-amber-200 mb-3"
                  alt={member.name}
                />
                <h3 className="font-semibold text-lg text-orange-400">{member.name}</h3>
                <p className="text-sm text-secondary">{member.email}</p>
                <span className="mt-3 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  {member.position}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

       


      {/* UPCOMING BIRTHDAYS */}
     

      {/* new vabe with "loading" */}
      <div className="mt-14">
  <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-secondary">
    <Cake className="text-pink-500" />
    Upcoming Birthdays
  </h3>

  {/* 1️: Loading */}
  {isLoading && (
    <div className="flex justify-center py-10">
      <span className="loading loading-dots loading-sm text-primary"></span>
    </div>
  )}

  {/* 2️: Data loaded kinto empty */}
  {/* ai line mane data asche but empty...rr data asuk ba empty asuk..jetai asuk tokhn "isLoading" off hoa jabe */}
  {!isLoading && birthdays.length === 0 && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-dashed border-orange-400 rounded-xl p-8 text-center"
    >
      <Cake size={40} className="mx-auto text-secondary mb-3" />
      <p className="text-secondary">
        No upcoming birthdays this month
      </p>
    </motion.div>
  )}

  {/* 3️:Data thakle*/}
  {!isLoading && birthdays.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {birthdays.map((b, i) => (
       
         <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 bg-gradient-to-r from-pink-50 via-yellow-50 to-green-50 p-4 rounded-xl shadow-md border border-gray-200 max-w-sm"
              >
                <img
                  src={b.photo || "/avatar.png"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-400"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-lg  text-orange-400">
                    {b.name}
                  </p>
                  <p className="text-sm  flex items-center gap-2 text-secondary">
                    Birthday:
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="inline-flex items-center gap-1"
                    >
                    
                      <Cake size={14} />
                      {/* <span className="text-indigo-600 font-medium text-md">
                        {new Date(b.dateOfBirth).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span> */}

                      {/* new vabe */}
                      <span className="text-indigo-600 font-medium text-md">
  {new Date(
    new Date(b.dateOfBirth).setHours(0, 0, 0, 0) // 12:00 AM
  ).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</span>

                    </motion.span>
                  </p>
                </div>
              </motion.div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default MyTeam;
