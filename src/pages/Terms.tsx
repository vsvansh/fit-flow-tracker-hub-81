
import React from 'react';
import { motion } from "framer-motion";
import BackToHome from "@/components/BackToHome";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <BackToHome />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mt-6 mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow">
            <CardContent className="pt-6">
              <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <p>Last Updated: April 9, 2025</p>
                
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the FitFlow application and related services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
                </p>
                
                <h2>2. Description of Service</h2>
                <p>
                  FitFlow provides a fitness tracking platform that allows users to monitor their physical activity, set goals, and interact with other users. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                </p>
                
                <h2>3. User Accounts</h2>
                <p>
                  To use certain features of the Service, you must create an account. You are responsible for:
                </p>
                <ul>
                  <li>Providing accurate and complete registration information</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                </ul>
                <p>
                  You must be at least 13 years of age to create an account. If you are under 18, you represent that you have your parent's or legal guardian's permission to use the Service.
                </p>
                
                <h2>4. User Content</h2>
                <p>
                  The Service allows you to upload, post, and share content ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such User Content for the purpose of providing and improving the Service.
                </p>
                <p>
                  You represent and warrant that:
                </p>
                <ul>
                  <li>You own or have the necessary rights to the User Content</li>
                  <li>The User Content does not violate the rights of any third party</li>
                  <li>The User Content complies with these Terms and all applicable laws</li>
                </ul>
                
                <h2>5. Prohibited Conduct</h2>
                <p>
                  You agree not to:
                </p>
                <ul>
                  <li>Use the Service for any illegal purpose</li>
                  <li>Upload content that is offensive, harmful, or violates others' rights</li>
                  <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                  <li>Interfere with the proper functioning of the Service</li>
                  <li>Engage in data mining or scraping of the Service</li>
                  <li>Impersonate another person or entity</li>
                </ul>
                
                <h2>6. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are owned by FitFlow and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our Service without our express written permission.
                </p>
                
                <h2>7. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                
                <h2>8. Limitation of Liability</h2>
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, FITFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE SERVICE.
                </p>
                
                <h2>9. Health Disclaimer</h2>
                <p>
                  The Service is not intended to provide medical advice. Always consult a physician before beginning any exercise program. By using the Service, you acknowledge and agree that you do so at your own risk.
                </p>
                
                <h2>10. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your account at any time for any reason without notice. Upon termination, your right to use the Service will immediately cease.
                </p>
                
                <h2>11. Governing Law</h2>
                <p>
                  These Terms shall be governed by the laws of the United States of America, without regard to its conflict of law principles.
                </p>
                
                <h2>12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by updating the "Last Updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                </p>
                
                <h2>13. Contact</h2>
                <p>
                  If you have any questions about these Terms, please contact us at: terms@fitflow.com
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
