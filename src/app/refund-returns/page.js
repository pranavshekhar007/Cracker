import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const page = () => {
  return (
     <>
    <Navbar/>
      <div className='policy-page d-flex flex-column align-items-center'>
         <div className='policy-head d-flex align-items-center'>
            <div>
                 <h1>Cancellation and Refunds</h1>
             <p>At Gustosa, we believe in transparency and clarity.
                 This policy is designed to inform you about how we operate and what you can expect from us regarding the topic covered below.</p>

            </div>
                 <img src='https://t3.ftcdn.net/jpg/13/90/31/86/360_F_1390318667_bjVdMVxUeYvCARqYuc7datD4nlhTJ86l.jpg'></img>
         </div>

         <div className='all-policies'>
            <div className='policy'>
                <p> Welcome to Gustosa Foods! These Terms of Use (“Terms”) govern your access to and use of our website, products, 
                    and services. By accessing or using our platform, you agree to be bound by these Terms. If you disagree with
                     any part of these Terms, you may not access the platform.</p>
            </div>
            <div className='policy'>
                <h3> Use of the Platform</h3>
                <p>You must be at least 18 years old to use our platform.</p>
                <p>You agree to provide accurate and complete information when using our services.</p>
                <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</p>
            </div>
             <div className='policy'>
                <h3> Intellectual Property</h3>
                <p>All content on our platform, including but not limited to text, graphics, logos, images, and software, is the property of Gustosa Foods or its licensors and is protected by copyright laws.</p>
                <p>You may not reproduce, distribute, modify, or republish any content from our platform without our prior written consent.</p>
            </div>
             <div className='policy'>
                <h3> User Conduct</h3>
                <p>You agree not to use our platform for any unlawful purpose or to engage in any activity that violates these Terms.</p>
                <p>You may not transmit any viruses, malware, or other harmful code through our platform.</p>
                <p>You may not attempt to gain unauthorized access to any part of our platform or to interfere with its operation.</p>
            </div>
            <div className='policy'>
                <h3> Third-Party Links</h3>
                <p>Our platform may contain links to third-party websites or services that are not owned or controlled by Gustosa Foods.</p>
                <p>We do not endorse or assume any responsibility for the content or practices of third-party sites or services. You access third-party sites at your own risk.</p>
            </div>
            <div className='policy'>
                <h3> Limitation of Liability</h3>
                <p>In no event shall Gustosa Foods, its officers, directors, employees, or agents be liable for any indirect, incidental,
                     special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or
                      other intangible losses, resulting from (i) your access to or use of or inability to access or use the platform;
                       (ii) any conduct or content of any third party on the platform; (iii) any content obtained from the platform; and
                        (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract,
                         tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of
                          such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
            </div>
            <div className='policy'>
                <h3> Indemnification</h3>
                <p>You agree to indemnify and hold harmless Gustosa Foods, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including without limitation, reasonable legal and accounting fees, 
                    arising out of or in any way connected with your access to or use of the platform or your violation of these Terms.</p>
                
            </div>
            <div className='policy'>
                <h3> Governing Law</h3>
                <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its
                     conflict of law provisions.</p>
    
            </div>
            <div className='policy'>
                <h3>Changes to Terms</h3>
                <p>Gustosa Foods reserves the right to modify or replace these Terms at any time. Your continued use of the platform after
                     any such changes constitutes your acceptance of the new Terms. Please review these Terms periodically for changes.</p>           
            </div>
            <div className='policy'>
                <h3>Contact Us</h3>
                <p>If you have any questions about these Terms, please contact us at hello@gustosafoods.com.</p>
            </div>
         </div>
      </div>
      <Footer/>
    </>
  )
}

export default page