import React from "react";
import './PrivacyPolicy.scss'; // Ensure this line is present to apply your SCSS styles

export const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy text-start">
      {/* <h1 className="privacy-policy__title">ova2 etoken Privacy Policy</h1> */}
      {/* <p className="privacy-policy__paragraph">Effective Date: [Insert Date]</p> */}

      <h2 className="privacy-policy__section-title">1. Introduction</h2>
      <p className="privacy-policy__paragraph">
        Welcome to ova2 etoken, a product of Ova2 consultants India Pvt Ltd. Your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our services. It also outlines your rights and choices with respect to your personal data.
      </p>
      <p className="privacy-policy__paragraph">
        This policy applies only to ova2 etoken’s services and platforms, and does not apply to any third-party services, websites, or personnel that ova2 etoken does not own, employ, or manage.
      </p>

      <h2 className="privacy-policy__section-title">2. Information We Collect</h2>
      <ul className="privacy-policy__list">
        <li>Account & Profile Information (e.g., mobile number, name, optional profile picture)</li>
        <li>Contact Upload & Connections (with permission)</li>
        <li>Communications and diagnostics</li>
        <li>Usage & Log Data</li>
        {/* <li>Location Data (if granted)</li> */}
      </ul>

      <h2 className="privacy-policy__section-title">3. How We Use Your Information</h2>
      <ul className="privacy-policy__list">
        <li>Operate and improve services</li>
        <li>Customer support and technical assistance</li>
        <li>Communication between users and providers</li>
        <li>Testing new features</li>
        <li>Internal analysis and safety enforcement</li>
      </ul>

      <h2 className="privacy-policy__section-title">4. Information Sharing</h2>
      <p className="privacy-policy__paragraph">
        We do <span className="privacy-policy__highlight">not</span> sell or rent your data. 
        {/* We may share data: */}
      </p>
      {/* <ul className="privacy-policy__list">
        <li>With your consent</li>
        <li>With users/service providers for connecting purposes</li>
        <li>With third-party service vendors (e.g., analytics, cloud hosting)</li>
        <li>To comply with laws or protect rights/safety</li>
      </ul> */}

      <h2 className="privacy-policy__section-title">5. How We Protect Your Data</h2>
      <p className="privacy-policy__paragraph">
        We use secure encryption, access controls, audits, and secure server infrastructure to keep your data safe and confidential.
      </p>

      <h2 className="privacy-policy__section-title">6. Your Rights & Choices</h2>
      <ul className="privacy-policy__list">
        <li>Edit profile or account anytime</li>
        <li>Control app permissions</li>
        <li>Opt out of optional communications</li>
      </ul>

      <h2 className="privacy-policy__section-title">7. Deletion of Personal Data</h2>
      <p className="privacy-policy__paragraph">
        You may request account deletion by emailing us at <span className="privacy-policy__highlight">hr@ova2consultancy.com</span>. We process requests within 7 days and remove all personal data unless retention is required by law.
      </p>

      <h2 className="privacy-policy__section-title">8. User Reports & Moderation</h2>
      <p className="privacy-policy__paragraph">
        Users can report inappropriate interactions. We may review reported content to ensure compliance and protect our users.
      </p>

      <h2 className="privacy-policy__section-title">9. Policy Updates</h2>
      <p className="privacy-policy__paragraph">
        We may update this policy periodically. Changes will be announced, and the effective date will reflect the latest version.
      </p>

      <h2 className="privacy-policy__section-title">10. Contact Us</h2>
      <p className="privacy-policy__paragraph">For questions, reach us at:</p>
      <p className="privacy-policy__paragraph">
        {/* <strong>ova2 etoken India Pvt Ltd</strong><br />
        4th Floor, JVR Towers, Near Omni Hospital,<br />
        Kothapet, Dilshuknagar, Hyderabad - 500035,<br />
        INDIA<br /> */}
        📧 <span className="privacy-policy__highlight">hr@ova2consultancy.com</span>
      </p>

      {/* <p className="privacy-policy__paragraph" style={{ fontSize: "0.85rem", color: "#888", marginTop: "32px" }}>
        © 2025 ova2 etoken.com – All Rights Reserved
      </p> */}
    </div>
  );
};

export default PrivacyPolicy;
