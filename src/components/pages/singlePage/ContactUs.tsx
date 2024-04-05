import { QText } from "../../common/Fonts";
import { ContactUsIcon } from "../../icons/ContactUs";
import { QuickImmi } from "../../icons/Logo";
import "./ContactUs.css";

export function ContactUs() {
  return (
    <div className="contact-us">
      <h1>Contact us</h1>
      <div className="contact-us-icon">
        <ContactUsIcon />
        <div className="contact-us-line" />
      </div>
      <div className="contact-us-icon quickimmi">
        <QuickImmi />
      </div>
      <div className="contact-us-content">
        <div>
          <h3>
            <QText level="large" color="primary">
              Email
            </QText>
          </h3>
          <p>contactus@quickimmi.ai</p>
        </div>
        <div className="phone">
          <h3>
            <QText level="large" color="primary">
              Phone
            </QText>
          </h3>
          <p>333-333-3333</p>
        </div>
        <div>
          <h3>
            <QText level="large" color="primary">
              Address
            </QText>
          </h3>
          <p>1234 123th street, Redmond, WA 98066</p>
        </div>
      </div>
    </div>
  );
}
