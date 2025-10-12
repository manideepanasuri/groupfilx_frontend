import {Helmet} from "react-helmet-async";


function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Story Dumps</title>
        <meta name="description" content="This page explains how Story Dumps collects, uses, and protects your data. Read our privacy practices here." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy | Story Dumps" />
        <meta property="og:description" content="Read about how we handle your data and protect your privacy." />
        <meta property="og:url" content="https://www.storydumps/privacy-policy" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.storydumps/privacy-policy" />
      </Helmet>
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Effective Date: 10th June 2025</p>

      <p className="mb-4">
        <strong>Story Dumps</strong> operates the website
        <a href="https://storydumps.xyz" className="text-blue-600 dark:text-blue-400 underline ml-1">
          storydumps.xyz
        </a>. This Privacy Policy outlines how we collect, use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Name</li>
        <li>Email address</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">We use your data to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Create and manage user accounts</li>
        <li>Personalize your experience</li>
        <li>Send service updates</li>
        <li>Improve our services</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies & Tracking</h2>
      <p className="mb-4">We may use cookies or similar technologies to enhance your experience and analyze traffic.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">We implement security measures, but no method is 100% secure.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">We use Kokoro TTS. These services may have their own privacy policies.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Children’s Privacy</h2>
      <p className="mb-4">We do not knowingly collect data from children under 13.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <p className="mb-4">Contact us at manideepanasuri@gmail.com to access or delete your data.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes</h2>
      <p className="mb-4">We may update this policy. Continued use means you accept the changes.</p>
    </div>
    </>
  );
}

export default PrivacyPolicy;