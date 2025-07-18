'use client';

import React, { createContext, useState } from 'react';

export const ChitLoggedDataContext = createContext();

export const ChitLoggedDataProvider = ({ children }) => {
  // Initialize state immediately from localStorage for SSR safety and first render consistency
  const [chitLoggedUserData, setChitLoggedUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem('chitUser');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const updateChitLoggedUserData = (data) => {
    setChitLoggedUserData(data);
    if (data) {
      localStorage.setItem('chitUser', JSON.stringify(data));
    } else {
      localStorage.removeItem('chitUser');
    }
  };

  return (
    <ChitLoggedDataContext.Provider value={{ chitLoggedUserData, updateChitLoggedUserData }}>
      {children}
    </ChitLoggedDataContext.Provider>
  );
};
