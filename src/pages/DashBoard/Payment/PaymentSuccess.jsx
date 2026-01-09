import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";


const PaymentSuccess = () => {
  //jokhon payment success hobe tokhon ai page aa asbe
  //abar server-side theke je success response asbe,seta ai page ai asbe..tai success ar code ai page a korbo
  //session id paoar pore ai server-side,then ai client side aa code write korte ci


  //https://reactrouter.com/api/hooks/useSearchParams--> ai link aa ace ai hook..
  const [searchParams] = useSearchParams();

  //transaction id ar state declare korlam:
  
  const [paymentInfo, setPaymentInfo] = useState({}); //{} ar moddhe value gulu set koreci...tai ai khaneo {} dibo,na hole error show hobe

  //axios:
  const axiosSecure = useAxiosSecure();

  //payment success page ar link:http://localhost:5173/dashboard/payment-success?session_id=cs_test_a1I6mhXfjcQL9LvKU56aHR76oB3xNkhkCzrGwCdIYZzY8kNPRcbE0TMnfR

  //ai link a id ace jar key name: "session_id"...tai ai key dea amra "id" take niteci
  //searchParams.get() fixed key ar value,mane id ber kora jai।
  const sessionId = searchParams.get("session_id");
  console.log(sessionId); //out:cs_test_a1I6mhXfjcQL9LvKU56aHR76oB3xNkhkCzrGwCdIYZzY8kNPRcbE0TMnfR


   //new add:
   //  Guard (MOST IMPORTANT)
  const hasCalledRef = useRef(false);




  //akhn jodi "id" paoa jai,tahole:-->"useEffect" use korbo,jeno "sessionId" thskle active hoa
  useEffect(() => {


    //new add:
      //  already called → stop
    if (hasCalledRef.current) return;

    //  mark as called
    hasCalledRef.current = true;









    if (sessionId) {
      //id server-side aa send kora holo,jeno ai id ar data update kora jai like:(pay-->paid)
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("Server response:", res.data); 

       
          setPaymentInfo({
            transactionId: res.data.transactionId,
            // trackingId: res.data.trackingId,
          });

          
          //ata tikh moto set hole -->stripe_transaction ar moddhe gea dekhte parbo,je transaction hoace kina
          //ai link aa-->https://dashboard.stripe.com/acct_1SbzPA6j3TFOZVoI/test/payments
        });
    }
  }, [sessionId, axiosSecure]);

  return (
     <div className="min-h-[60vh] flex items-center justify-center px-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card max-w-md w-full bg-base-100 shadow-xl border border-base-200 rounded-2xl"
      >
        <div className="card-body items-center text-center space-y-3">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center"
          >
            <FaCheckCircle className="text-5xl text-primary" />
          </motion.div>

          <h1 className="text-2xl font-bold text-primary">
            Payment Successful
          </h1>

          <p className="text-base text-secondary font-semibold">
            Your Transaction ID
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-2 rounded-xl bg-base-200 text-sm font-mono"
          >
            {paymentInfo?.transactionId}
          </motion.div>

          <div className="divider my-1"></div>

          <p className="text-sm opacity-80">
            Thank you for your payment. A confirmation email will be sent shortly.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
