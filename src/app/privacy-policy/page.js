"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getPolicy } from '../services/support.service';

const page = () => {
     const [policyData, setPolicyData] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await getPolicy(); 
      if(res?.statusCode == "200"){
          setPolicyData(res.data); 
      }
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };

    fetchPolicy();
  }, []);

  return (
     <>
    <Navbar/>
      <div className='policy-page d-flex flex-column align-items-center'>
         <div className='policy-head d-flex align-items-center'>
            <div>
                 <h1>Privacy Policy</h1>
             <p>At Big Bang Crackers, we believe in transparency and clarity.
                 This policy is designed to inform you about how we operate and what you can expect from us regarding the topic covered below.</p>

            </div>
                 <img src='https://t3.ftcdn.net/jpg/13/90/31/86/360_F_1390318667_bjVdMVxUeYvCARqYuc7datD4nlhTJ86l.jpg'></img>
         </div>

         <div className='all-policies'>
              <div className='policy'>
            {policyData?.userPrivacyPolicy ? (
              <div dangerouslySetInnerHTML={{ __html: policyData.userPrivacyPolicy }} />
            ) : (
              <p>Loading privacy policy...</p>
            )}
          </div>
         </div>
      </div>
      <Footer/>
    </>
  )
}

export default page