import { Collapse, CollapseProps } from "antd";
import { QText } from "../../common/Fonts";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "./PrivacyPolicy.css";

export function PrivacyPolicy() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <QText level="normal bold">General</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            This policy describes the ways in which [Quickimmi] and its affiliates and subsidiaries (collectively,
            “[Quickimmi] ,” “we,” “our,” or “us”) collect, process, use, and disclose information about you in the
            course of operating our business, and supporting our products and features offered by [Quickimmi]
            (“[Quickimmi] Products” or “Products”), including when you use the Quickimmi app, visit
            https://quickimmi.ai/ and any other websites and applications that link to this policy (collectively, the
            “Services”). This Privacy Policy does not apply to websites, apps, destinations, or other offerings that we
            do not own or control, even if they are linked to from the Services.
          </QText>
          <QText level="normal" color="gray">
            Before you start using our products and services, you must carefully read and understand this policy,
            especially the terms marked in bold / italics / underline, to ensure that you fully understand and agree
            before you start using. We try our best to explain the professional vocabulary involved in this policy to
            you in concise and common expressions for your understanding. If you have any questions, comments or
            suggestions on the contents of this policy, you can contact us through various contact methods provided in
            this policy.
          </QText>
        </>
      ),
    },
    {
      key: "2",
      label: <QText level="normal bold">Privacy Policy</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Welcome to [Quickimmi] (the “Platform”). The Platform is provided and controlled by [Quickimmi].
            (“[Quickimmi]”, “we” or “us”). We are committed to protecting and respecting your privacy. This Privacy
            Policy covers the experience we provide for users age 13 and over on our Platform. For information about our
            under-13 experience (“Children&#39;s Platform”) and our practices in the United States regarding
            children&#39;s privacy, please refer to our Privacy Policy for Younger Users.
          </QText>
          <QText level="normal" color="gray">
            Capitalized terms that are not defined in this policy have the meaning given to them in the Terms of
            Service.
          </QText>
        </>
      ),
    },
    {
      key: "3",
      label: <QText level="normal bold">I. Information We Collect</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            FROM YOU: We collect information from you. For example, when you download our app, create an account,
            interact with the Services, or otherwise contact us with a question, comment, or request. THIRD PARTY: We
            also collect information you share with us from third-party social network providers, and technical and
            behavioral information about your use of the Platform. Please keep in mind that any information provided to
            us by a third party may also be subject to that third party&#39;s privacy policy. FROM YOUR DEVICES: We also
            collect information contained in the messages you send through our Platform and, if you grant us access,
            information from your phone book on your mobile device.
          </QText>
          <QText level="normal" color="gray">
            More information about the categories and sources of information is provided below.
          </QText>
        </>
      ),
    },
    {
      key: "4",
      label: <QText level="normal">Information you choose to provide</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            For certain activities, such as when you register, upload content to the Platform, or contact us directly,
            you may provide some or all of the following information:
          </QText>
          <QText level="normal" color="gray">
            <ul>
              <li>Registration information, such as age, username and password, email or phone number.</li>
              <li>Profile information, such as name, social media account information, and profile image.</li>
              <li>
                Content, including text, images, and video, found in your device’s clipboard, with your permission. For
                example, if you choose to initiate content sharing with a third-party platform, or choose to paste
                content from the clipboard into the [Quickimmi] App, we access this information stored in your clipboard
                in order to fulfill your request.
              </li>
              <li>
                Payment information, including payment card numbers or other third-party payment information (such as
                PayPal).
              </li>
              <li>Your opt-in choices and communication preferences.</li>
              <li>
                User-generated content, including comments, photographs, livestreams, audio recordings, videos, and
                virtual item videos that you choose to create with or upload to the Platform (“User Content”). We
                collect User Content through pre-loading at the time of creation, import, or upload, regardless of
                whether you choose to save or upload that User Content, in order to recommend audio options and provide
                other personalized recommendations. If you apply an effect to your User Content, we may collect a
                version of your User Content that does not include the effect.
              </li>
              <li>Information to verify an account such as proof of identity or age.</li>
              <li>Information in correspondence you send to us.</li>
              <li>
                Information you share through surveys or your participation in challenges, sweepstakes, or contests such
                as your gender, age, likeness, and preferences.
              </li>
            </ul>
          </QText>
        </>
      ),
    },
    {
      key: "5",
      label: <QText level="normal">Information we obtain from other sources</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We may receive the information described in this Privacy Policy from other sources (such as other users of
            the Services and vendors, like web hosting providers, analytics providers, attribution providers, or
            advertisers), including:
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            <strong>Social Media and Login Services.</strong> If you choose to link or sign up using a third-party
            social network or login service, we may collect information from these services, including your contact
            lists for these services and information relating to your use of the Platform in relation to these services.
            If you link your [Quickimmi] account to another service, we may receive information about your use of that
            service.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            <strong>Third-Party Services.</strong> We may collect information about you from third-party services, such
            as advertising partners, data providers, and analytics providers.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            <strong>Other Users of the Platform.</strong> Sometimes other users of the Platform may provide us
            information about you, including through customer service inquiries.
          </QText>
          <QText level="normal" color="gray">
            <strong>Other Sources.</strong> We may collect information about you from other publicly available sources.
          </QText>
        </>
      ),
    },
    {
      key: "6",
      label: <QText level="normal">Information automatically collecting</QText>,
      children: (
        <QText level="normal" color="gray">
          We and our service providers may automatically collect certain technical information from your computer or
          mobile device once you have downloaded the app or use the Services, such as your Internet Protocol address,
          your geographic location, battery level, your browser type, your operating system, app and file names and
          types, model of your device, time zone setting, unique device identifiers, language, the pages you view
          immediately before and after you access the Services, geolocation-related data (as described below), unique
          device identifiers, browsing and search history (including content you have viewed in the Platform), and
          Cookies (as defined below) and the search terms you enter on the Services, network type. This information
          allows us to recognize you and personalize your experience if you return to the Services, and to improve the
          Services.
        </QText>
      ),
    },
    {
      key: "7",
      label: <QText level="normal">Usage Information</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We collect information regarding your use of the Platform and any other User Content that you generate
            through or upload to our Platform.
          </QText>
        </>
      ),
    },
    {
      key: "8",
      label: <QText level="normal">Device Information</QText>,
      children: (
        <QText level="normal" color="gray">
          We collect certain information about the device you use to access the Platform, such as your IP address, user
          agent, mobile carrier, time zone settings, identifiers for advertising purposes, model of your device, the
          device system, network type, device IDs, your screen resolution and operating system, app and file names and
          types, keystroke patterns or rhythms, battery state, audio settings and connected audio devices. Where you
          log-in from multiple devices, we will be able to use your profile information to identify your activity across
          devices. We may also associate you with information collected from devices other than those you use to log-in
          to the Platform.
        </QText>
      ),
    },
    {
      key: "9",
      label: <QText level="normal">Location Information</QText>,
      children: (
        <>
          <QText level="normal" color="gray">
            We collect information about your approximate location, including location information based on your SIM
            card and/or IP address. With your permission, we may also collect precise location data (such as GPS).
          </QText>
        </>
      ),
    },
    {
      key: "10",
      label: <QText level="normal">Image and Audio Information</QText>,
      children: (
        <QText level="normal" color="gray">
          We may collect information about the images and audio that are a part of your User Content, such as
          identifying the objects and scenery that appear, the existence and location within an image of face and body
          features and attributes, the nature of the audio, and the text of the words spoken in your User Content. We
          may collect this information to enable special video effects, for content moderation, for demographic
          classification, for content and ad recommendations, and for other non-personally- identifying operations. We
          may collect biometric identifiers and biometric information as defined under US laws, such as faceprints and
          voiceprints, from your User Content. Where required by law, we will seek any required permissions from you
          prior to any such collection.
        </QText>
      ),
    },
    {
      key: "11",
      label: <QText level="normal">Messages</QText>,
      children: (
        <QText level="normal" color="gray">
          We collect and process, which includes scanning and analyzing, information you provide when you compose, send,
          or receive messages through the Platform&#39;s messaging functionality. That information includes the content
          of the message and information about when the message has been sent, received and/or read, as well as the
          participants of the communication. Please be aware that messages sent to other users of the Platform will be
          accessible by those users and that we are not responsible for the manner in which those users use or disclose
          messages.
        </QText>
      ),
    },
    {
      key: "12",
      label: <QText level="normal">Metadata</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            When you upload or create User Content, you automatically upload certain metadata that is connected to the
            User Content. Metadata describes other data and provides information about your User Content that will not
            always be evident to the viewer. In connection with your User Content the metadata can describe how, when,
            where, and by whom the piece of User Content was created, collected, or modified and how that content is
            formatted. It also includes information, such as your account name, that enables other users to trace back
            the User Content to your user account. Additionally, metadata includes data that you choose to provide with
            your User Content, e.g. any hashtags used to mark keywords to the video and captions.
          </QText>
        </>
      ),
    },
    {
      key: "13",
      label: <QText level="normal">Cookies</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We and our service providers and business partners use cookies and other similar technologies (e.g. web
            beacons, flash cookies, etc.) (“Cookies”) to automatically collect information, measure and analyze which
            web pages and advertisements you click on and how you use the Platform, for a number of purposes associated
            with providing and improving the Services, provide you with advertising on the Platform and elsewhere across
            your devices, and measure the effectiveness of advertisements. Cookies enable the Platform to provide
            certain features and functionality. Web beacons are very small images or small pieces of data embedded in
            images, also known as “pixel tags” or “clear GIFs,” that can recognize Cookies, the time and date a page is
            viewed, a description of the page where the pixel tag is placed, and similar information from your computer
            or device. To learn how to disable Cookies, see the “Your choices” section below.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We and our service providers and business partners may link your contact or account information with your
            activity on and off our Platform across all your devices, using your email or other log-in or device
            information. Our service providers and business partners may use this information to display advertisements
            on our Platform and elsewhere online and across your devices tailored to your interests, preferences, and
            characteristics. We are not responsible for the privacy practices of these service providers and business
            partners, and the information practices of these service providers and business partners are not covered by
            this Privacy Policy.
          </QText>
          <QText level="normal" color="gray">
            We may aggregate or de-identify the information described above. Aggregated or de- identified data is not
            subject to this Privacy Policy.
          </QText>
        </>
      ),
    },
    {
      key: "14",
      label: <QText level="normal bold">II. Information We Use</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            As explained below, we use your information to improve, support and administer the Platform, to allow you to
            use its functionalities, and to fulfill and enforce our Users Service. We may also use your information to,
            among other things, show you suggestions, promote the Platform, and customize your ad experience. We
            generally use the information we collect including:
          </QText>
          <QText level="normal" color="gray">
            <ul>
              <li>
                Verifying your identity when you access and use our Services, or otherwise engaging with us, and
                protecting the security of your personal information.
              </li>
              <li>
                Fulfilling requests for products, services, Platform functionality, support and information for internal
                operations, such as troubleshooting, data analysis, testing, research, statistical, and survey purposes
                and soliciting your feedback.
              </li>
              <li>
                Customizing the content you see when you use the Platform. For example, we may provide you with services
                based on the country settings you have chosen or show you content that is similar to content that you
                like or interacted with.
              </li>
              <li>Making suggestions and providing a customized ad experience.</li>
              <li>
                Supporting the social functions of the Platform, such as to permit you and other users to connect with
                each other through the Platform and for you and other users to share, download, and otherwise interact
                with User Content posted through the Platform.
              </li>
              <li>Using User Content as part of our advertising and marketing campaigns to promote the Platform.</li>
              <li>Understanding how you use the Platform, such as across your devices.</li>
              <li>Sending promotional materials from us or on behalf of our affiliates and trusted third parties.</li>
              <li>Improving and developing our Platform and conduct product development.</li>
              <li>
                Measuring and understanding the effectiveness of the advertising we serve to you and others and to
                deliver advertising.
              </li>
              <li>Inferring additional information about you, such as your age, gender, and interests.</li>
              <li>Helping us detect abuse, fraud, and illegal activity on the Platform.</li>
              <li>
                Proving your identity in order to use certain features, such as livestream or verified accounts, or when
                you apply for a Pro Account, ensure that you are old enough to use the Platform (as required by law), or
                in other instances where verification may be required.
              </li>
              <li>
                Announcing you as a winner of our contest, sweepstakes, or promotions if permitted by the promotion
                rule, and to send you any applicable prizes.
              </li>
              <li>Enforcing our terms, conditions, and policies.</li>
              <li>Communicating with you, such as to notify you about changes in our services.</li>
              <li>
                Consistent with your permissions, to provide you with location-based services, such as advertising and
                other personalized content.
              </li>
              <li>Informing our algorithms.</li>
              <li>Combining all the information we collect or receive about you for any of the foregoing purposes.</li>
              <li>
                For any other purposes disclosed to you at the time we collect your information or pursuant to your
                consent.
              </li>
              <li>Facilitating sales, promotion, and purchases of goods and services and to provide user support.</li>
            </ul>
          </QText>
        </>
      ),
    },
    {
      key: "15",
      label: <QText level="normal bold">III. Information We Share</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We are committed to maintaining your trust, and while [Quickimmi] does not sell personal information to
            third parties. We may share the information we collect from you:
          </QText>
        </>
      ),
    },
    {
      key: "16",
      label: <QText level="normal">Service Providers and Business Partners</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We share the personal information listed above with service providers and business partners to help us
            perform business operations and for business purposes, including research, administering contests and
            special offers, technology services, payment processing and transaction fulfillment, advertising, analytics,
            measurement, database maintenance, deliveries, sending communications, data storage and hosting, disaster
            recovery, search engine optimization, marketing, and data processing and transferring. These service
            providers and business partners may include:
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Payment processors and transaction fulfillment providers, who may receive the information you choose to
            provide, the information we obtain from other sources, and the information we collect automatically but who
            do not receive your message data. For example, we may partner with companies to process secure payments,
            optimize services, analyze information including personal information, improve the services, send marketing
            communications, support email and messaging services, and detect fraud. When you access our social media
            services, we also share your personal information with third parties who support social media login.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Customer and technical support providers, who may receive the information you choose to provide, the
            information we obtain from other sources, and the information we collect automatically.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Research providers, who may receive the information you choose to provide, the information we obtain from
            other sources, and the information we collect automatically but would not receive your payment information
            or message data.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Cloud providers, who may receive the information you choose to provide, the information we obtain from other
            sources, and the information we collect automatically.
          </QText>
          <QText level="normal" color="gray">
            Advertising, marketing, and analytics vendors, who may receive the information you choose to provide, the
            information we obtain from other sources, and the information we collect automatically but would not receive
            your payment information or message data.
          </QText>
        </>
      ),
    },
    {
      key: "17",
      label: <QText level="normal">Within Our Corporate Group</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We may share all of the information we collect with a parent, subsidiary, or other affiliate of our
            corporate group.
          </QText>
        </>
      ),
    },
    {
      key: "18",
      label: (
        <QText level="normal">
          In the context of a transaction including a Sale, Merger, or Other Business Transfer
        </QText>
      ),
      children: (
        <>
          <QText level="normal" color="gray">
            We may share all of the information we collect in connection with a substantial corporate transaction,
            including the sale of a website, a merger, consolidation, asset sales, or in the unlikely event of
            bankruptcy.
          </QText>
        </>
      ),
    },
    {
      key: "19",
      label: <QText level="normal">Where required by law</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We may disclose any of the information we collect to respond to warrant, subpoenas, court orders, legal
            process, law enforcement requests, legal claims, or government inquiries, and to protect and defend the
            rights, interests, safety, and security of [Quickimmi], the Platform, our affiliates, users, or the public.
            We may also share any of the information we collect to enforce any terms applicable to the Platform, to
            exercise or defend any legal claims, and comply with any applicable law.
          </QText>
          <QText level="normal" color="gray">
            In addition, we may share or disclose information to anyone when it has been aggregated or otherwise
            de-identified.
          </QText>
        </>
      ),
    },
    {
      key: "20",
      label: <QText level="normal">With Your Consent</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            We may share your information for other purposes pursuant to your consent or at your direction.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            If you access third-party services, such as Facebook, Google, or Twitter, to login to the Platform or to
            share information about your usage on the Platform with others, these third-party services may be able to
            collect information about you, including information about your activity on the Platform, and they may
            notify your connections on the third-party services about your use of the Platform, in accordance with their
            privacy policies. If you choose to allow a third-party service to access your account, we will share certain
            information about you with the third party. Depending on the permissions you grant, the third party may be
            able to obtain your account information and other information you choose to provide.
          </QText>
          <QText level="normal" color="gray">
            If you choose to engage in public activities on the Platform, you should be aware that any information you
            share may be read, collected, or used by other users. You should use caution in disclosing personal
            information while using the Platform. We are not responsible for the information you choose to submit.
          </QText>
        </>
      ),
    },
    {
      key: "21",
      label: <QText level="normal bold">IV. Your Rights</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            You may request to access or delete the information we have collected about you by sending your request to
            us at the email or physical address provided in the Contact section at the bottom of this policy. You may be
            entitled, in accordance with applicable law, to submit a request through an authorized agent. To nominate an
            authorized agent to exercise choices on your behalf, please provide evidence that you have given such agent
            power of attorney or that the agent otherwise has valid written authority to submit requests to exercise
            rights on your behalf. We will respond to your request within applicable law and subject to proper
            verification. We will verify your request by asking you to send it from the email address associated with
            your account or to provide information necessary to verify your account. We do not discriminate based on the
            exercise of any privacy rights that you might have.
          </QText>
          <QText level="normal" color="gray">
            The metrics for requests to access and requests to delete received by [Quickimmi] during the previous
            calendar year can be found here.
          </QText>
        </>
      ),
    },
    {
      key: "22",
      label: <QText level="normal">Your Choices</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            You are able to review, modify, and delete certain personal information you submit to us, such as your
            account profile information. In general, you can browse, modify, and delete account profile information at
            any time, but you may not be able to modify certain of the initial registration information and verification
            information provided at the time of registration.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            You are also be able to close your account. We verify account closure requests using information that we
            maintain about you. Please note that the closing of your account may be irreversible. Also, please note that
            your deletion of our app from your mobile device will not necessarily delete your account and closing your
            account will not automatically result in the deletion of your information. See the Data Retention section
            above. Please also see the “Additional Information for California Residents” section below if you are a
            California resident.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            You may be able to control some of the information we collect by adjusting your browser settings to refuse
            or disable Cookies. Because each browser is different, please consult the instructions provided by your
            browser. Please note that you may need to take additional steps to refuse or disable certain types of
            Cookies. In addition, your choice to disable cookies is specific to the particular browser or device that
            you are using when you disable cookies, so you may need to separately disable cookies for each type of
            browser or device. If you choose to refuse, disable, or delete Cookies, some of the functionality of the
            Platform may no longer be available to you. Without this information, we are not able to provide you with
            all the requested services.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Your device may have controls that determine what information we collect or how we can use that information.
            For example, you can control whether we can use your mobile advertising identifier for advertising through
            settings on your Apple and Android devices.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            You can opt out of marketing or advertising emails by using the “unsubscribe” link or mechanism noted in
            marketing or advertising emails.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            If you previously chose to share precise location information, you can prevent your device from sharing
            precise location information (e.g. GPS location information) with the Platform at any time through your
            device’s operating system settings.
          </QText>
          <QText level="normal" color="gray">
            Some browsers transmit “do-not-track” signals to websites. Because of differences in how browsers
            incorporate and activate this feature, we currently do not take action in response to these signals.
          </QText>
        </>
      ),
    },
    {
      key: "23",
      label: <QText level="normal bold">V. Data Security and Storage</QText>,
      children: (
        <>
          <QText level="normal" color="gray">
            We take reasonable security measures to protect against loss, theft, misuse and unauthorized access,
            disclosure, alteration, and destruction of your personal information. You should understand that no data
            storage system or transmission of data over the Internet or any other public network can completely secure,
            and no system of physical or electronic security is impenetrable. Please note that information collected by
            third parties may not have the same security protections as information you submit to us, and we are not
            responsible for protecting the security of such information. Therefore, we encourage you to use caution when
            sharing personal information with the Services.
          </QText>
        </>
      ),
    },
    {
      key: "24",
      label: <QText level="normal bold">VI. Children</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            The privacy of users under the age of 13 (“Younger Users”) is important to us. We provide a separate
            experience for Younger Users in the United States on the Children&apos;s Platform, in which we collect only
            limited information. For more information on our United States data collection practices for Younger Users,
            please visit the Privacy Policy for Younger Users.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            In addition, please note that, due to age restrictions imposed by PayPal, users over 13 years of age who are
            under the age of majority in their state may be unable to use PayPal and therefore will be unable to collect
            certain cash rewards earned through the use of the Services without the assistance of their adult parent or
            guardian.
          </QText>
          <QText level="normal" color="gray">
            The Platform otherwise is not directed at children under the age of 13. If we become aware that personal
            information has been collected on the Platform from a person under the age of 13 we will delete this
            information and terminate the person’s account. If you become aware that your child under 13 or any child
            under 13 who is under your care has provided us with information, please contact us at the contact
            information listed below: https://quickimmi.ai/.
          </QText>
        </>
      ),
    },
    {
      key: "25",
      label: <QText level="normal bold">VII. Other Rights</QText>,
      children: (
        <>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            If you are a California resident, the policy will also apply consistent with California law. California law
            requires that a business provide in its privacy policy a list of the categories of personal information it
            has in the preceding 12 months (1) disclosed for a business purpose, and (2) disclosed in exchange for
            valuable consideration (considered a “sale” under California law), as well as the categories of third
            parties to whom each category of personal information was disclosed or sold.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            <table className="privacy-policy-table">
              <tr>
                <th>Categories of personal information that may be disclosed for our business purposes</th>
                <th>Categories of third parties to whom this information may be disclosed</th>
              </tr>
              <tr>
                <td>Identifiers</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Demographic information</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Protected characteristics</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Commercial information</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Financial information</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Internet or other electronic network activity information</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Geolocation data</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Audio, electronic, video or visual, thermal, olfactory, or similar information</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
              <tr>
                <td>Inferences drawn from the above categories</td>
                <td>Affiliates, Service providers, Business partners</td>
              </tr>
            </table>
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            California law also grants its residents certain rights regarding the collection and use of their personal
            information. Subject to certain limitations, California residents have the following rights:
            <ul>
              <li>
                Right to know.
                <div>
                  You have the right to know and request information about the categories and specific pieces of
                  personal information we have collected about you within the last 12 months, as well as the categories
                  of sources from which such information is collected, the purpose for collecting such information, and
                  the categories of third parties with whom we share such information. You also have the right to know
                  if we have sold or disclosed your personal information.
                </div>
              </li>
              <li>
                Right to delete.
                <div>
                  You have the right to request the deletion of the personal information we have collected from you,
                  subject to certain exceptions. If you are a California resident and would like to exercise the delete
                  right, please submit your request to us at the contact information listed below: contact@quickimmi.ai.
                </div>
              </li>
              <li>
                Right to opt-out.
                <div>
                  You have the right to opt out of certain disclosers of your personal information for valuable
                  consideration. However, we do not “sell” personal information as that term is defined under relevant
                  California law.
                </div>
              </li>
              <li>
                Right to non-discrimination.
                <div>
                  You have the right to not be discriminated against for exercising any of the above- listed rights. We
                  may, however, provide a different level of service or charge a different rate reasonably relating to
                  the value of your personal information.
                </div>
              </li>
            </ul>
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            If you are a California resident and would like to exercise any of the above rights, please send an email to
            contact@quickimmi.ai. When we receive your request, we will attempt to verify the authenticity of your
            request through normal account authentication practices unless we are concerned with fraud or you are
            seeking sensitive personal information in which case we may require additional verification steps.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            Please note that we may require additional information from you in order to fulfill your request, and there
            may be circumstances where we will not be able to fulfill your request. For example, if you request
            deletion, we may need to retain certain personal information in order to comply with our legal obligations
            or for other permitted purposes. We will only use personal information provided in a verifiable consumer
            request to verify your identity or authority to make the request.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            If you are submitting a request through an authorized agent, the authorized agent should use the process
            described above. However, the agent must also provide us with your signed written permission stating that
            the agent is authorized to make the request on your behalf. We may also require that you verify your
            identity with us and may reach out to you directly to confirm that you have provided the agent with your
            permission to submit the request on your behalf.
          </QText>
          <QText level="normal" color="gray" margin="margin-bottom-10">
            California law requires operators of certain websites and online services to allow registered users who are
            under the age of 18 and residents of California to request removal of certain content they post. California
            users who are under 18 may exercise this right by sending an Email to contact@quickimmi.ai. All requests
            must be labeled “California Removal Request” on the email subject line. All requests must provide a
            description of the user Content you want removed and information reasonably sufficient to permit us to
            locate that User Content. We do not accept California Removal Requests via postal mail, telephone, or
            facsimile. We are not responsible for notices that are not labeled or sent properly, and we may not be able
            to respond if you do not provide adequate information. Please note that your request does not ensure
            complete or comprehensive removal of the material. For example, materials that you have posted may be
            republished or reposted by another user or third party. that allow users to delete their content or
            information. Please note that in certain cases, as permitted by law, these deletion mechanisms may not
            result in complete removal of your content or information.
          </QText>
          <QText level="normal" color="gray">
            We do not have actual knowledge that we “sell” the personal information of consumers under age 16.
          </QText>
        </>
      ),
    },
    {
      key: "26",
      label: <QText level="normal">Amendments</QText>,
      children: (
        <>
          <QText level="normal" color="gray">
            We may update this Privacy Policy from time to time. When we update the Privacy Policy, we will notify you
            by updating the “Last Updated” date at the top of this policy and posting the new Privacy Policy and
            providing any other notice required by applicable law. We recommend that you review the Privacy Policy each
            time you visit the Platform to stay informed of our privacy practices.
          </QText>
        </>
      ),
    },
    {
      key: "27",
      label: <QText level="normal">Contact</QText>,
      children: (
        <>
          <QText level="normal" color="gray">
            Questions, comments and requests regarding this policy should be addressed to:
            <ul>
              <li>Mailing Address: 525 WASHINGTON BOULEVARD, FLOOR 3, JERSEY CITY, NJ 07310</li>
              <li>Attn: Quickimmi Inc.</li>
              <li>
                Contact us: https://quickimmi.ai/ for your reasonable requests we will reply within 15 working days.
              </li>
            </ul>
          </QText>
        </>
      ),
    },
  ];

  const expandIcon = (props: any) => {
    if (props?.isActive) {
      return <UpOutlined className="privacy-outlined active" />;
    }
    return <DownOutlined className="privacy-outlined" />;
  };

  return (
    <div className="privacy">
      <h1>
        <QText level="large">Privacy Policy</QText>
      </h1>
      <QText level="normal" color="gray">
        Version 1.0
      </QText>
      <QText level="normal" color="gray">
        Release date: 04/03/2024
      </QText>
      <QText level="normal" color="gray">
        Latest update date: 04/03/2024
      </QText>
      <QText level="normal" color="gray">
        Effective date: 04/03/2024
      </QText>
      <Collapse
        className="privacy-collapse"
        defaultActiveKey={["1"]}
        items={items}
        expandIcon={expandIcon}
        expandIconPosition="start"
        ghost
      />
    </div>
  );
}
