import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAuthSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { FaCheckCircle, FaUsers } from 'react-icons/fa';


const HrPackageUpgrade = () => {
    const axiosSecure = useAxiosSecure();

    //hr data:
   

    //1: packageCollection theke data get
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages/forHr");
      return res.data;
    },
  });


  //2:userCollection theke hr data get:
  // 2️: HR user data (userCollection)
  const { data: hrData, isLoading: hrLoading } = useQuery({
    queryKey: ["hrProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/hr");
  
      
      return res.data;
    },
  });

    if (isLoading || hrLoading) {
    return <div className="flex justify-center text-secondary py-10">
      <span className="loading loading-dots loading-sm "></span>
    </div>;
  }

  //akhn button ke condional korar code set korbo:
    const currentSubscription = hrData?.subscription?.toLowerCase();
    console.log("HR subscription:", currentSubscription);


      const packageOrder = {
    basic: 1,
    standard: 2,
    premium: 3,
  };

  const getButtonInfo = (pkgName) => {
     if (!currentSubscription) {
    return { text: "Loading...", disabled: true };
  }
    const current = packageOrder[currentSubscription];
    const target = packageOrder[pkgName.toLowerCase()];

    if (current === target) {
      return { text: "You are currently on this plan", disabled: true };
    }

    if (target > current) {
      return { text: "Upgrade", disabled: false };
    }

    return { text: " Downgrades are not allowed in this system", disabled: true };
  };


//   Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
  };


  //payment process: step:3
   //format:2 (data post korbo)...tikh vabe post hole akti url link back pabo
  const handlePayment = async(packageData) =>{
    //akti object aa data gulu set kore post korbo:
    const paymentInfo = {
        amount: packageData.price,
        hrId: hrData._id,  //["hrData" userCollection theke noa data]ai id dea userCollection ar data--> "update korbo payment success hole"
        // hrEmail: userData.email,   //ai data "paymentCollection" aa lagbe
        packageName: packageData.name.toLowerCase(),  //"paymentCollection" and "userCollection(subscription)" 2jaigai drkr hobe
        employeeLimit: parseInt(packageData.employeeLimit), ////"paymentCollection" and "userCollection(packageLimit)" 2jaigai drkr hobe

       
        // trackingId: ---- atar kaj drkr hole kora hobe
    }
    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

    // console.log(res.data.url); //out:https://checkout.stripe.com/c/pay/cs_test_a1m39c1aARox5pDfJXr2UEwyCJEqKrGZqYvNG4xNFGNhmQcz1KX3wkzGeN#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdkdWxOYHwnPyd1blpxYHZxWjA0VmdLaDxMUl1EYUhscHxVfVc3MG9SfVZqNl1JTEBIS19JX182SmhhM29%2FUXZvSzRMSWg9U3VVPGRcSDc3an1cT048YkpqVjdEUDdvX0YxPGcydm42Y3RPNTVdUlZpfFVVYScpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl   ---->aita payment korar page ar link

    //amr react ar page ai ai "payment" ar page jeno show kore,tar jonno...ai line ta korlam:
    window.location.assign(res.data.url)


    //client side ar web-page ar link ar jaigai je link paoa gece:http://localhost:5173/dashboard/payment-success?session_id=cs_test_a1I6mhXfjcQL9LvKU56aHR76oB3xNkhkCzrGwCdIYZzY8kNPRcbE0TMnfR  --->ai khane session_id ta paoa grce
  }


    return (
         <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-primary">Pricing Plans</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-secondary">
            Choose a plan that fits your company size and asset management
            needs.
          </p>
        </div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {packages.map((pkg) => {

            //button conditional korar code:
            const btn = getButtonInfo(pkg.name);
            console.log('btn', btn);
            return(
                <motion.div
              key={pkg._id}
              variants={card}
              whileHover="hover"
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="card-body flex flex-col flex-1">
                {/* Package Name */}
                <h3 className="text-2xl font-bold text-center mb-2 text-blue-800">
                  {pkg.name}
                </h3>

                {/* Price */}
                <p className="text-center text-blue-700 text-4xl font-extrabold my-4">
                  ${pkg.price}
                  <span className="text-base font-medium text-blue-700">
                    /month
                  </span>
                </p>

                {/* Employee Limit */}
                <div className="flex justify-center items-center gap-2 mb-6 text-gray-600">
                  <FaUsers className="text-primary" />
                  <span className="text-blue-600">
                    Up to <strong>{pkg.employeeLimit}</strong> employees
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 flex-1">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-blue-500"
                    >
                      <FaCheckCircle className="text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                  {/* conditional button */}
                  <button
                  onClick={()=>handlePayment(pkg)}
                disabled={btn.disabled}
                className={`btn mt-6 w-full ${
                  btn.text === "Upgrade"
                    ? "btn-primary"
                    : btn.text === "Current Plan"
                    ? "btn-success"
                    : "btn-disabled"
                }`}
              >
                {btn.text}
              </button>

                {/* Optional Text */}
                <p className="text-center text-sm text-cyan-600 mt-6">
                  Upgrade from HR dashboard
                </p>
              </div>
            </motion.div>
            )
})}
        </motion.div>
      </div>
    </section>

   
    );
};

export default HrPackageUpgrade;