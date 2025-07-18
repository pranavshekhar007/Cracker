"use client";

import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import AccountDetails from "../Components/AccountDetails";
import Footer from "../Components/Footer";
import {
  ChitLoggedDataContext,
  ChitLoggedDataProvider,
} from "../context/context2";
import { LoggedDataContext } from "../context/context";
import { getMyChitSubscriptionsServ } from "../services/subscription.services";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

const SubscriptionPageContent = () => {
  const { chitLoggedUserData } = useContext(ChitLoggedDataContext);
  const { loggedUserData } = useContext(LoggedDataContext);
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([]);
  const [showLoaderSubs, setShowLoaderSubs] = useState(false);

  useEffect(() => {
    if (!chitLoggedUserData) {
      router.push("/chit-login");
    }
  }, [chitLoggedUserData, router]);

  const getSubscriptions = async () => {
    setShowLoaderSubs(true);
    try {
      const res = await getMyChitSubscriptionsServ({
        userId: chitLoggedUserData?._id,
      });
      if (res?.data?.statusCode === 200) {
        setSubscriptions(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch subscriptions");
    }
    setShowLoaderSubs(false);
  };

  useEffect(() => {
    if (chitLoggedUserData?._id) {
      getSubscriptions();
    }
  }, [chitLoggedUserData]);

  if (!chitLoggedUserData || !loggedUserData) {
    return (
      <div className="loading-div">
        <p>
          Please login with your chit subscription account to view your
          subscriptions.
        </p>
      </div>
    );
  }

  // ✅ filter subscriptions by loggedUserData._id
  const filteredSubscriptions = subscriptions.filter(
    (sub) => sub.userId && sub.userId._id === loggedUserData._id
  );

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="profile-section d-flex gap-3">
          <AccountDetails />

          <div className="profile-right mt-lg-5 pt-lg-4">
            <div className="my-details">
              <h3>My Subscriptions</h3>

              {showLoaderSubs ? (
                <Skeleton count={5} />
              ) : filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((sub) => (
                  <div key={sub._id} className="mb-4">
                    <div className="border p-3 mb-3">
                      <h5>Basic Details</h5>
                      <p>
                        <strong>Name:</strong> {sub.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {sub.phone}
                      </p>
                      <p>
                        <strong>Scheme Start:</strong>{" "}
                        {sub.schemeStartDate
                          ? format(new Date(sub.schemeStartDate), "dd MMM yyyy")
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Scheme End:</strong>{" "}
                        {sub.schemeEndDate
                          ? format(new Date(sub.schemeEndDate), "dd MMM yyyy")
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Enrolment Date:</strong>{" "}
                        {sub.enrolmentDate
                          ? format(new Date(sub.enrolmentDate), "dd MMM yyyy")
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ₹{sub.totalAmount}
                      </p>
                      <p>
                        <strong>Total Months:</strong> {sub.totalMonths}
                      </p>
                    </div>

                    <div>
                      <h6>Paid Months</h6>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Month</th>
                              <th>Year</th>
                              <th>Payment Date</th>
                              <th>Monthly Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sub.paidMonths && sub.paidMonths.length > 0 ? (
                              sub.paidMonths.map((pm) => (
                                <tr key={pm._id}>
                                  <td>{pm.monthNumber}</td>
                                  <td>{pm.monthYear}</td>
                                  <td>
                                    {format(
                                      new Date(pm.paymentDate),
                                      "dd MMM yyyy"
                                    )}
                                  </td>
                                  <td>₹{sub.monthlyAmount}</td>
                                  <td>{pm.status}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5">No paid months yet</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center my-5">
                  <div
                    className="text-center p-4 p-sm-5 shadow rounded"
                    style={{
                      backgroundColor: "#ffffff",
                      maxWidth: "500px",
                      width: "100%",
                      border: "1px solid #eee",
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png"
                      alt="No Subscriptions"
                      style={{
                        width: "80px",
                        marginBottom: "20px",
                        opacity: 0.8,
                      }}
                    />
                    <h4 className="fw-bold mb-3" style={{ color: "#444" }}>
                      No Active Subscriptions
                    </h4>
                    <p className="text-muted">
                      You don’t have any active subscriptions right now. Sign in
                      to explore and subscribe easily.
                    </p>
                    <button
                      className="btn btn-primary mt-3 px-4 py-2"
                      style={{ borderRadius: "30px" }}
                      onClick={() => router.push("/chit-login")}
                    >
                      Sign In to Subscribe
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const SubscriptionPage = () => {
  return (
    <ChitLoggedDataProvider>
      <SubscriptionPageContent />
    </ChitLoggedDataProvider>
  );
};

export default SubscriptionPage;
