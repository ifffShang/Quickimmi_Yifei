import { Col, Row } from "antd";
import { Logo, QuickImmiLight } from "../../icons/Logo";
import "./Footer.css";

export function Footer() {
  return (
    <div className="footer">
      <div className="footer-brand">
        <QuickImmiLight />
        <div className="footer-logo-text">
          Fast-Track Your American Dream with AI
        </div>
      </div>
      <FooterLinks />
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="footer-links">
      <div>
        <h3>About us</h3>
        <ul>
          <li>Home</li>
          <li>About Quickimmi</li>
          <li>Send an email</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div>
        <h3>Compare</h3>
        <ul>
          <li>移民局网站</li>
        </ul>
      </div>
      <div>
        <h3>Policies</h3>
        <ul>
          <li>Terms of service</li>
          <li>Privacy policy</li>
        </ul>
      </div>
    </div>
  );
}
