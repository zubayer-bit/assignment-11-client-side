import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";

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

  // Get companies
  const { data: companies = [] } = useQuery({
    queryKey: ["myCompanies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee/my-companies");
      return res.data;
    },
  });

  // Get team (only when company selected)
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

  // Upcoming birthdays
  const { data: birthdays = [] } = useQuery({
    queryKey: ["upcomingBirthdays"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-birthdays/employee");
      return res.data;
    },
  });

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold text-primary mb-6">My Team</h2>

      {/* Company Select */}
      <select
        className="select select-bordered mb-6 w-full max-w-xs"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="" disabled>
          Select Company Name
        </option>
        {companies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Team Section */}
      {!selectedCompany ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center mt-10 text-center"
        >
          <img
            src="https://i.ibb.co/1tqX4CVF/Chat-GPT-Image-Jan-3-2026-11-12-20-AM.jpg"
            alt="Select Company"
            className="w-190 mb-4"
          />
          <p className="text-secondary text-lg">
            Please select a company to view your team
          </p>
        </motion.div>
      ) : team.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-10 text-secondary"
        >
          No team members found
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="card bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-xl p-5"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={member.photo || "/avatar.png"}
                  className="w-20 h-20 rounded-full mb-3 border-2 border-indigo-500"
                />
                <h3 className="font-semibold text-lg text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.email}</p>
                <span className="badge badge-outline mt-2 bg-indigo-50 text-indigo-700">
                  {member.position}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upcoming Birthdays */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-primary mb-4">
          🎉 Upcoming Birthdays ({birthdays.length})
        </h3>

        {birthdays.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center mt-6"
          >
            <img
              src="https://i.ibb.co/PvzD93QY/Chat-GPT-Image-Jan-3-2026-11-17-35-AM.jpg"
              alt="No Birthday"
              className="w-64 mb-4"
            />
            <p className="text-secondary text-lg">
              No upcoming birthdays this month
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-6">
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
                  <p className="font-semibold text-lg text-gray-800">
                    {b.name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    Birthday:
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="inline-flex items-center gap-1"
                    >
                      <BirthdayCakeIcon />
                      <span className="text-indigo-600 font-medium text-md">
                        {new Date(b.dateOfBirth).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
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
