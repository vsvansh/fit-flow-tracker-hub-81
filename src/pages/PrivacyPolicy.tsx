
import React from 'react';
import { motion } from "framer-motion";
import BackToHome from "@/components/BackToHome";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
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
            Privacy Policy
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
                
                <h2>Introduction</h2>
                <p>
                  FitFlow ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fitness tracking application and related services (collectively, the "Service").
                </p>
                <p>
                  Please read this Privacy Policy carefully. By using the Service, you consent to the practices described in this policy.
                </p>
                
                <h2>Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>We may collect the following types of personal information:</p>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, password, and profile picture when you create an account.</li>
                  <li><strong>Health and Fitness Data:</strong> Steps taken, distance traveled, calories burned, sleep patterns, heart rate, and other fitness metrics.</li>
                  <li><strong>User Content:</strong> Photos, comments, and other content you choose to share.</li>
                  <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
                  <li><strong>Location Data:</strong> With your permission, we may collect precise location data to track your routes and activities.</li>
                </ul>
                
                <h3>How We Use Your Information</h3>
                <p>We use your personal information for various purposes, including:</p>
                <ul>
                  <li>Providing and improving our Service</li>
                  <li>Personalizing your experience</li>
                  <li>Communicating with you about your account or the Service</li>
                  <li>Processing transactions</li>
                  <li>Sending you marketing communications</li>
                  <li>Monitoring and analyzing usage and trends</li>
                  <li>Detecting, preventing, and addressing technical issues</li>
                </ul>
                
                <h2>Sharing Your Information</h2>
                <p>We may share your information in the following circumstances:</p>
                <ul>
                  <li><strong>With Other Users:</strong> If you choose to participate in social features, your activity information and profile information may be visible to other users.</li>
                  <li><strong>Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests.</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
                </ul>
                
                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
                </p>
                
                <h2>Your Choices</h2>
                <p>You have several choices regarding the information you provide to us:</p>
                <ul>
                  <li>Update or correct your account information from your profile settings</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Adjust your privacy settings to control what information is visible to other users</li>
                  <li>Request deletion of your account</li>
                </ul>
                
                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                
                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at: privacy@fitflow.com
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
