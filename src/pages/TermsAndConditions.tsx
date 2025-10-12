import {Helmet} from "react-helmet-async";

const TermsAndConditions = () => {
  return (
    <>
        <Helmet>
          <title>Terms & Conditions | Story Dumps</title>
          <meta
            name="description"
            content="These terms and conditions govern your use of Story Dumps. Please read them carefully before using our services."
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Terms & Conditions | Story Dumps" />
          <meta
            property="og:description"
            content="Read the full terms and conditions for using the Story Dumps platform."
          />
          <meta
            property="og:url"
            content="https://www.storydumps/terms"
          />
          <meta property="og:type" content="website" />
          <link
            rel="canonical"
            href="https://www.storydumps/terms"
          />
        </Helmet>

        <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">Effective Date: 10th June 2025</p>

      <p className="mb-4">
        By accessing or using Story Dumps (
        <a href="https://storydumps.xyz" className="text-blue-600 dark:text-blue-400 underline">
          storydumps.xyz
        </a>), you agree to be bound by these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Service</h2>
      <p className="mb-4">You may use the service to generate AI-based brain-rot videos. You must be at least 13 years old.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibility</h2>
      <p className="mb-4">You are responsible for your login credentials and activities under your account.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Acceptable Use</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>No offensive or illegal content</li>
        <li>No harassment or abuse</li>
        <li>No interference with site functionality</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
      <p className="mb-4">
        Site content belongs to Story Dumps. You retain ownership of your input but grant us the right to process it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Modifications</h2>
      <p className="mb-4">We may update or suspend features at any time.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Disclaimer</h2>
      <p className="mb-4">Service is provided “as is” without guarantees of availability or error-free performance.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">We are not liable for any indirect or incidental damages.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Future Charges</h2>
      <p className="mb-4">
        The service is free for now, but we reserve the right to add paid features with notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Governing Law</h2>
      <p className="mb-4">These terms are governed by the laws of [Your Country/State].</p>
    </div>
    </>
  );
};

export default TermsAndConditions;
