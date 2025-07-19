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
import ChitPayment from "../Components/ChitPayment";

const SubscriptionPageContent = () => {
  const { chitLoggedUserData } = useContext(ChitLoggedDataContext);
  const { loggedUserData } = useContext(LoggedDataContext);
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([]);
  const [showLoaderSubs, setShowLoaderSubs] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedChitId, setSelectedChitId] = useState(null);
  const [selectedMonthNumber, setSelectedMonthNumber] = useState(null);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);

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
          Please login with your chit subscription account to view your subscriptions.
        </p>
      </div>
    );
  }

  const filteredSubscriptions = subscriptions.filter(
    (sub) => sub.userId && sub.userId._id === loggedUserData._id
  );

  const getRemainingMonths = (enrolmentDate, schemeEndDate, paidMonths) => {
    const months = [];
    let current = new Date(
      enrolmentDate.getFullYear(),
      enrolmentDate.getMonth(),
      1
    );
    const end = new Date(
      schemeEndDate.getFullYear(),
      schemeEndDate.getMonth(),
      1
    );

    while (current <= end) {
      const monthName = current.toLocaleString("default", { month: "long" });
      const year = current.getFullYear().toString();

      const paidEntry = paidMonths.find(
        (pm) => pm.monthNumber === monthName && pm.monthYear === year
      );

      months.push({
        monthName,
        year,
        isPaid: !!paidEntry,
        status: paidEntry ? paidEntry.status : null,
      });

      current.setMonth(current.getMonth() + 1);
    }

    return months;
  };

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
                filteredSubscriptions.map((sub) => {
                  const enrolmentDate = new Date(sub.enrolmentDate);
                  const schemeEndDate = new Date(sub.schemeEndDate);

                  const remainingMonths = getRemainingMonths(
                    enrolmentDate,
                    schemeEndDate,
                    sub.paidMonths || []
                  );

                  return (
                    <div key={sub._id} className="mb-4">
                      <div className="border p-3 mb-3">
                        <h5>Basic Details</h5>
                        <p><strong>Name:</strong> {sub.name}</p>
                        <p><strong>Phone:</strong> {sub.phone}</p>
                        <p><strong>Scheme Start:</strong> {format(new Date(sub.schemeStartDate), "MMMM yyyy")}</p>
                        <p><strong>Scheme End:</strong> {format(new Date(sub.schemeEndDate), "MMMM yyyy")}</p>
                        <p><strong>Enrolment Month:</strong> {format(new Date(sub.enrolmentDate), "MMMM yyyy")}</p>
                        <p><strong>Total Amount:</strong> ₹{sub.totalAmount}</p>
                        <p><strong>Total Months:</strong> {sub.totalMonths}</p>
                      </div>

                      <div>
                        <h6>Remaining Months</h6>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Monthly Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {remainingMonths.map((month) => (
                                <tr key={month.monthName + month.year}>
                                  <td>{month.monthName}</td>
                                  <td>{month.year}</td>
                                  <td>₹{sub.monthlyAmount}</td>
                                  <td>
                                    {month.isPaid ? (
                                      month.status === "approved" ? (
                                        <span className="text-success">Paid</span>
                                      ) : month.status === "rejected" ? (
                                        <span className="text-danger">Rejected</span>
                                      ) : (
                                        <span className="text-warning">Pending Approval</span>
                                      )
                                    ) : (
                                      <span className="text-danger">Pending</span>
                                    )}
                                  </td>
                                  <td>
                                    {month.isPaid ? (
                                      month.status === "approved" ? (
                                        <button className="btn btn-success btn-sm" disabled>
                                          Paid
                                        </button>
                                      ) : month.status === "rejected" ? (
                                        <button
                                          className="btn btn-primary btn-sm"
                                          onClick={() => {
                                            setSelectedChitId(sub._id);
                                            setSelectedMonthNumber(month.monthName);
                                            setSelectedMonthYear(month.year);
                                            setShowPaymentPopup(true);
                                          }}
                                        >
                                          Pay Now
                                        </button>
                                      ) : (
                                        <span className="text-warning">Waiting for approval</span>
                                      )
                                    ) : (
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                          setSelectedChitId(sub._id);
                                          setSelectedMonthNumber(month.monthName);
                                          setSelectedMonthYear(month.year);
                                          setShowPaymentPopup(true);
                                        }}
                                      >
                                        Pay Now
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })
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
                      You don’t have any active subscriptions right now. Sign in to explore and subscribe easily.
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

      <ChitPayment
        showPaymentPopup={showPaymentPopup}
        setShowPaymentPopup={setShowPaymentPopup}
        chitId={selectedChitId}
        monthNumber={selectedMonthNumber}
        monthYear={selectedMonthYear}
        refreshFunction={getSubscriptions}
      />

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
