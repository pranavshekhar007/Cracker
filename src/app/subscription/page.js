"use client";

import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import AccountDetails from "../Components/AccountDetails";
import Footer from "../Components/Footer";
import { LoggedDataContext } from "../context/context";
// import { subscriptionListServ } from "../services/product.service"; 
import { toast } from "react-toastify";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = () => {
  const { loggedUserData } = useContext(LoggedDataContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [showLoaderSubs, setShowLoaderSubs] = useState(false);

  // const getSubscriptions = async () => {
  //   setShowLoaderSubs(true);
  //   const userId = loggedUserData?._id;

  //   try {
  //     const res = await subscriptionListServ(userId);
  //     if (res?.statusCode === 200) {
  //       setSubscriptions(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to fetch subscriptions");
  //   }
  //   setShowLoaderSubs(false);
  // };

  // useEffect(() => {
  //   if (loggedUserData?._id) {
  //     getSubscriptions();
  //   }
  // }, [loggedUserData]);

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="profile-section d-flex gap-3">
          <AccountDetails />

          <div className="profile-right mt-lg-5 pt-lg-4">
            <div className="my-details">
              <h3>My Subscriptions</h3>

              <div className="allOrders d-none d-md-block" style={{ whiteSpace: "nowrap" }}>
                <div className="row py-3 border-bottom" style={{ minWidth: "600px" }}>
                  <div className="col-2"><h6 className="fw-bold">Sub Id</h6></div>
                  <div className="col-2"><h6 className="fw-bold">Amount</h6></div>
                  <div className="col-2"><h6 className="fw-bold">Monthly</h6></div>
                  <div className="col-2"><h6 className="fw-bold">Enrol Date</h6></div>
                  <div className="col-2"><h6 className="fw-bold">Months Paid</h6></div>
                  <div className="col-2"><h6 className="fw-bold">Status</h6></div>
                </div>

                {showLoaderSubs
                  ? [1, 2, 3].map((v, i) => (
                      <div key={`skeleton-${i}`} className="row py-3 border-bottom" style={{ minWidth: "600px" }}>
                        {[...Array(6)].map((_, j) => (
                          <div key={j} className="col-2">
                            <Skeleton width="100%" height={30} />
                          </div>
                        ))}
                      </div>
                    ))
                  : subscriptions.map((sub) => (
                      <div key={sub._id} className="row py-3 border-bottom" style={{ minWidth: "600px" }}>
                        <div className="col-2">{sub._id.slice(0, 5)}</div>
                        <div className="col-2">₹{sub.totalAmount}</div>
                        <div className="col-2">₹{sub.monthlyAmount}</div>
                        <div className="col-2">{format(new Date(sub.enrolmentDate), "dd MMM yyyy")}</div>
                        <div className="col-2">{sub.paidMonths?.length} / {sub.totalMonths}</div>
                        <div className="col-2">{sub.status}</div>
                      </div>
                    ))}
              </div>

              {/* mobile view */}
              <div className="d-block d-md-none">
                <div className="row">
                  <div className="col-12">
                    {subscriptions.map((sub) => (
                      <div key={sub._id} className="border shadow-sm p-3 mb-3">
                        <p>Sub Id: {sub._id.slice(0, 5)}</p>
                        <p>Total: ₹{sub.totalAmount}</p>
                        <p>Monthly: ₹{sub.monthlyAmount}</p>
                        <p>Enrolled: {format(new Date(sub.enrolmentDate), "dd MMM yyyy")}</p>
                        <p>Paid: {sub.paidMonths?.length} / {sub.totalMonths}</p>
                        <p>Status: {sub.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
