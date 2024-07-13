import { Collapse, CollapseProps } from "antd";
import { QText } from "../../common/Fonts";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import "./TermsOfService.css";

export function TermsOfService() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <QText level="normal bold">General</QText>,
      children: (
        <QText level="small" color="gray">
          You must register for our Services using accurate information, provide your current mobile phone number or
          email address, and, if you change it, update your mobile phone number or email address using our change number
          feature. You agree to receive text messages and phone calls (from us or our third-party providers) or emails
          with codes to register for our Services. We also support third-party account access, you may link our service
          with other accounts, as applicable.
        </QText>
      ),
    },
    {
      key: "2",
      label: <QText level="normal bold">Contacts and Address Book</QText>,
      children: (
        <QText level="small" color="gray">
          You can use the contact upload feature and provide us, if permitted by applicable laws, with the phone numbers
          in your mobile address book on a regular basis, including those of both the users of our Services and your
          other contacts. We ask your permission before syncing your contacts.
        </QText>
      ),
    },
    {
      key: "3",
      label: <QText level="normal bold">Access to Quickimmi services</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You must be at least 13 years old to register for and use our Services (or the minimum age required in your
            country or territory for you to be authorized to register for and use our Services without parental
            approval). You cannot use our services if we have previously disabled your account for violations of our
            Terms or Policies, or you are prohibited from receiving our products, services, or software under applicable
            laws.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You may not upload viruses or malicious code or do anything that could disable, overburden, or impair the
            proper working or appearance of our Products.
          </QText>
          <QText level="small" color="gray">
            You may not access or collect data from our Products using automated means (without our prior permission) or
            attempt to access data you do not have permission to access.
          </QText>
        </>
      ),
    },
    {
      key: "4",
      label: <QText level="normal bold">Devices and Software</QText>,
      children: (
        <QText level="small" color="gray">
          It is your responsibility to provide certain devices, software, and data connections to use our Services. In
          order to use our Services, you consent to manually or automatically download and install updates to our
          Services. You also consent to our sending you notifications via our Services from time to time, as necessary
          to provide our Services to you.
        </QText>
      ),
    },
    {
      key: "5",
      label: <QText level="normal bold">Fees and Taxes</QText>,
      children: (
        <QText level="small" color="gray">
          You are responsible for all carrier data plans, Internet fees, and other fees and taxes associated with your
          use of our Services. By using our Products, you agree that we can show you ads that we think will be relevant
          to you and your interests. We use your personal data to help determine which ads to show you.
        </QText>
      ),
    },
    {
      key: "6",
      label: <QText level="normal bold">Privacy Policy and User Data</QText>,
      children: (
        <QText level="small" color="gray">
          Quickimmi cares about your privacy. We only store the data it needs to function properly. Quickimmi&apos;s
          Privacy Policy describes our data practices, including the types of information we receive and collect from
          you, how we use and share this information, and your rights in relation to the processing of information about
          you.
        </QText>
      ),
    },
    {
      key: "7",
      label: <QText level="normal bold">Account safety</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Quickimmi is dedicated to protecting your account safety. It&#39;s especially important to have a strong
            password. Do make your password hard to guess even if someone knows a lot about you (avoid names and
            birthdays of your family or your favorite band). Do make the new password significantly different from
            previous passwords. Don&#39;t use the same password for different accounts. Do use a sentence or phrase
            converted into a string of initials, numbers, and symbols.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You acknowledge that it is your responsibility to keep your device safe, If you lose or give away a device
            that you use to sign in the platform, please make sure adequate measures are done in a timely manner, such
            as changing the password, log out or reporting to us.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You also acknowledge that there are virtual items in the platforms that have monetary value, it is your
            responsibility to pay attention to your virtual items and make sure they are safe.
          </QText>
          <QText level="small" color="gray">
            You understand and agree that you will not transfer your account to anyone else without our permission.
          </QText>
        </>
      ),
    },
    {
      key: "8",
      label: <QText level="normal bold">Compliance with legal authority</QText>,
      children: (
        <QText level="small" color="gray">
          If Quickimmi receives a court order that confirms you’re a terror suspect, we may disclose your IP address and
          phone number to the relevant authorities without taking your consent in advance.
        </QText>
      ),
    },
    {
      key: "9",
      label: <QText level="normal bold">Acceptable Use of Our Services</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You must use our Services according to our Terms and policies. If you violate our Terms or policies, we may
            take necessary action with respect to your account, including disabling or suspending your account and, if
            we do, you agree not to create another account without our permission. Disabling or suspending your account
            will be in accordance with the &quot;Termination&quot; section below.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You must access and use our Services only for legal, authorized, and acceptable purposes. You will not use
            (or assist others in using) our Services in ways that:
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (a) violate, misappropriate, or infringe the rights of Quickimmi, our users, or others, including privacy,
            publicity, intellectual property, or other proprietary rights;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (b) are illegal, obscene, defamatory, threatening, intimidating, harassing, hateful, racially or ethnically
            offensive, or instigate or encourage conduct that would be illegal or otherwise inappropriate, such as
            promoting violent crimes, endangering or exploiting children or others, or coordinating harm;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (c) involve publishing falsehoods, misrepresentations, or misleading statements;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (d) impersonate someone;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (e) involve sending illegal or impermissible communications such as bulk messaging, auto- messaging,
            auto-dialing, and the like; or
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (f) involve any non-personal use of our Services unless otherwise authorized by us.
          </QText>
          <QText level="small" color="gray">
            You must not (or assist others to) directly, indirectly, through automated or other means, access, use,
            copy, adapt, modify, prepare derivative works based upon, distribute, license, sublicense, transfer,
            display, perform, or otherwise exploit our Services in impermissible or unauthorized manners, or in ways
            that burden, impair, or harm us, our Services, systems, our users, or others, including that you must not
            directly or through automated means:
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (a) reverse engineer, alter, modify, create derivative works from, decompile, or extract code from our
            Services;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (b) send, store, or transmit viruses or other harmful computer code through or onto our Services;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (c) gain or attempt to gain unauthorized access to our Services or systems;{" "}
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (d) interfere with or disrupt the safety, security, confidentiality, integrity, availability, or performance
            of our Services;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (e) create accounts for our Services through unauthorized or automated means;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (f) collect information of or about our users in any impermissible or unauthorized manner;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (g) sell, resell, rent, or charge for our Services or data obtained from us or our Services in an
            unauthorized manner;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (h) distribute or make our Services available over a network where they could be used by multiple devices at
            the same time, except as authorized through tools we have expressly provided via our Services;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (i) create software or APIs that function substantially the same as our Services and offer them for use by
            third parties in an unauthorized manner; or
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (j) misuse any reporting channels, such as by submitting fraudulent or groundless reports or appeals.
          </QText>
        </>
      ),
    },
    {
      key: "10",
      label: <QText level="normal bold">Anti-Fraud</QText>,
      children: (
        <QText level="small" color="gray">
          We strongly suggest that you do not disclose or share your personal information with other users, or click any
          external links before you have done enough verification. The platform is actively fighting against fraud or
          other activities that may harm our community, however, you also need to take due care to make sure you will
          not suffer from such fraud or possible harmful activities.
        </QText>
      ),
    },
    {
      key: "11",
      label: <QText level="normal bold">Third-Party Services</QText>,
      children: (
        <QText level="small" color="gray">
          Our Services may allow you to access, use, or interact with third-party websites, apps, content, other
          products and services. When you use third-party products or services, their terms and privacy policies will
          govern your use of those products or services.
        </QText>
      ),
    },
    {
      key: "12",
      label: <QText level="normal bold">Licenses and Intellectual Property Rights</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Quickimmi does not claim ownership of the information that you submit for your Quickimmi account or through
            our Services. Some content that you share or upload, such as photos or videos, may be protected by
            intellectual property laws. You own the intellectual property rights in any such content that you create and
            share on Quickimmi. Nothing in these Terms takes away the rights you have to your own content. You are free
            to share your content with anyone else, wherever you want.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            However, to provide our services we need you to give us some legal permissions (known as a
            &#39;license&#39;) to use this content. This is solely for the purposes of providing and improving our
            Products and services. To be specific, when you share, post, or upload content that is covered by
            intellectual property rights on or in connection with our Products, you grant us a non-exclusive,
            transferable, sub-licensable, royalty-free, and worldwide license to host, use, distribute, modify, run,
            copy, publicly perform or display, translate, and create derivative works of your content. This means, for
            example, that if you share a photo on Quickimmi, you give us permission to store, copy, and share it with
            others such as service providers that support our services. This license will end when your content is
            deleted from our systems. The rights you grant in this license are for the limited purpose of operating and
            providing our Services.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Quickimmi owns all copyrights, trademarks, domains, logos, trade dress, trade secrets, patents, and other
            intellectual property rights associated with our Services. You may not use our copyrights, trademarks (or
            any similar marks), domains, logos, trade dress, trade secrets, patents, and other intellectual property
            rights unless you have our express permission. You may use the trademarks of our affiliated companies only
            with their permission.
          </QText>
          <QText level="small" color="gray">
            Quickimmi grants you a limited, revocable, non-exclusive, non-sublicensable, and non- transferable license
            to use our Services, subject to and in accordance with our Terms of service and policies. This license is
            for the sole purpose of enabling you to use our Services in the manner permitted by our Terms and policies.
            No licenses or rights are granted to you by implication or otherwise, except for the licenses and rights
            expressly granted to you.
          </QText>
        </>
      ),
    },
    {
      key: "13",
      label: (
        <QText level="normal bold">
          Reporting Third-Party Copyright, Trademark, And Other Intellectual Property Infringement
        </QText>
      ),
      children: (
        <QText level="small" color="gray">
          We encourage you to report claims of third-party copyright, trademark, or other intellectual property
          infringement as Quickimmi is committed to intellectual property rights protection. We may take necessary
          action with respect to your account, including disabling or suspending your account, if you clearly, seriously
          or repeatedly infringe the intellectual property rights of others or where we are required to do so for legal
          reasons. Disabling or suspending your account will be in accordance with the &quot;Termination&quot; section
          below.
        </QText>
      ),
    },
    {
      key: "14",
      label: <QText level="normal bold">Disclaimers and Release</QText>,
      children: (
        <QText level="small" color="gray">
          YOU USE OUR SERVICES AT YOUR OWN RISK AND SUBJECT TO THE FOLLOWING DISCLAIMERS. WE ARE PROVIDING OUR SERVICES
          ON AN “AS IS” BASIS WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND FREEDOM FROM COMPUTER VIRUS OR
          OTHER HARMFUL CODE. WE DO NOT WARRANT THAT ANY INFORMATION PROVIDED BY US IS ACCURATE, COMPLETE, OR USEFUL,
          THAT OUR SERVICES WILL BE OPERATIONAL, ERROR FREE, SECURE, OR SAFE, OR THAT OUR SERVICES WILL FUNCTION WITHOUT
          DISRUPTIONS, DELAYS, OR IMPERFECTIONS. WE DO NOT CONTROL, AND ARE NOT RESPONSIBLE FOR, CONTROLLING HOW OR WHEN
          OUR USERS USE OUR SERVICES OR THE FEATURES, SERVICES, AND INTERFACES OUR SERVICES PROVIDE. WE ARE NOT
          RESPONSIBLE FOR AND ARE NOT OBLIGATED TO CONTROL THE ACTIONS OR INFORMATION (INCLUDING CONTENT) OF OUR USERS
          OR OTHER THIRD-PARTIES. YOU RELEASE US, OUR SUBSIDIARIES, AFFILIATES, AND OUR AND THEIR DIRECTORS, OFFICERS,
          EMPLOYEES, PARTNERS, AND AGENTS (TOGETHER, THE “QUICKIMMI PARTIES”) FROM ANY CLAIM, COMPLAINT, CAUSE OF
          ACTION, CONTROVERSY, DISPUTE, OR DAMAGES (TOGETHER, “CLAIM”), KNOWN AND UNKNOWN, RELATING TO, ARISING OUT OF,
          OR IN ANY WAY CONNECTED WITH ANY SUCH CLAIM YOU HAVE AGAINST ANY THIRD-PARTIES. YOUR RIGHTS WITH RESPECT TO
          THE QUICKIMMI PARTIES ARE NOT MODIFIED BY THE FOREGOING DISCLAIMER IF THE LAWS OF YOUR COUNTRY OR TERRITORY OF
          RESIDENCE, APPLICABLE AS A RESULT OF YOUR USE OF OUR SERVICES, DO NOT PERMIT IT. IF YOU ARE A UNITED STATES
          RESIDENT, YOU WAIVE ANY RIGHTS YOU MAY HAVE UNDER CALIFORNIA CIVIL CODE §1542, OR ANY OTHER SIMILAR APPLICABLE
          STATUTE OR LAW OF ANY OTHER JURISDICTION, WHICH SAYS THAT: A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS THAT
          THE CREDITOR OR RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING
          THE RELEASE, AND THAT IF KNOWN BY HIM OR HER WOULD HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE
          DEBTOR OR RELEASED PARTY.
        </QText>
      ),
    },
    {
      key: "15",
      label: <QText level="normal bold">Limitation of Liability</QText>,
      children: (
        <QText level="small" color="gray">
          THE QUICKIMMI PARTIES WILL NOT BE LIABLE TO YOU FOR ANY LOST PROFITS OR CONSEQUENTIAL, SPECIAL, PUNITIVE,
          INDIRECT, OR INCIDENTAL DAMAGES RELATING TO, ARISING OUT OF, OR IN ANY WAY IN CONNECTION WITH OUR TERMS, US,
          OR OUR SERVICES (HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, INCLUDING NEGLIGENCE), EVEN IF THE QUICKIMMI
          PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR AGGREGATE LIABILITY RELATING TO, ARISING OUT
          OF, OR IN ANY WAY IN CONNECTION WITH OUR TERMS, US, OR OUR SERVICES WILL NOT EXCEED THE GREATER OF ONE HUNDRED
          DOLLARS ($100) OR THE AMOUNT YOU HAVE PAID US IN THE PAST TWELVE MONTHS. THE FOREGOING DISCLAIMER OF CERTAIN
          DAMAGES AND LIMITATION OF LIABILITY WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW. THE LAWS OF
          SOME STATES OR JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OR ALL OF
          THE EXCLUSIONS AND LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU. NOTWITHSTANDING ANYTHING TO THE CONTRARY
          IN OUR TERMS, IN SUCH CASES, THE LIABILITY OF THE QUICKIMMI PARTIES WILL BE LIMITED TO THE FULLEST EXTENT
          PERMITTED BY APPLICABLE LAW.
        </QText>
      ),
    },
    {
      key: "16",
      label: <QText level="normal bold">Indemnification</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            If anyone brings a claim (&quot;Third-Party Claim&quot;) against us related to your actions, information, or
            content on Quickimmi, or any other use of our Services by you, you will, to the maximum extent permitted by
            applicable law, indemnify, and hold the Quickimmi Parties harmless from and against all liabilities,
            damages, losses, and expenses of any kind (including reasonable legal fees and costs) relating to, arising
            out of, or in any way in connection with any of the following:
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (a) your access to or use of our Services, including information and content provided in connection
            therewith;
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (b) your breach of our Terms or applicable law; or
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            (c) any misrepresentation made by you. You will cooperate as fully as required by us in the defense or
            settlement of any Third-Party Claim.
          </QText>
          <QText level="small" color="gray">
            Your rights with respect to Quickimmi are not modified by the foregoing indemnification if the laws of your
            country or territory of residence, applicable as a result of your use of our Services, do not permit it.
          </QText>
        </>
      ),
    },
    {
      key: "17",
      label: <QText level="normal bold">Dispute Resolution</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            This Section includes an arbitration agreement and an agreement that all claims will be brought only in an
            individual capacity (and not as a class action or other representative proceeding). Please read it
            carefully. You may opt out of the arbitration agreement by following the opt out procedure described below.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Informal Process First. You agree that in the event of any dispute between you and Quickimmi, you will ﬁrst
            contact Quickimmi and make a good faith sustained eﬀort to resolve the dispute before resorting to more
            formal means of resolution, including without limitation any court action or arbitration. After the informal
            dispute resolution process any remaining dispute, controversy, or claim (collectively, “Claim”) relating in
            any way to your use of Quickimmi’s services and/or products, including the Services, or relating in any way
            to the communications between you and Quickimmi or any other user of the Services, will be ﬁnally resolved
            by binding arbitration. This mandatory arbitration agreement applies equally to you and Quickimmi. However,
            this arbitration agreement does not (a) govern any Claim by Quickimmi for infringement of its intellectual
            property or access to the Services that is unauthorized or exceeds authorization granted in these Terms or
            (b) bar you from making use of applicable small claims court procedures in appropriate cases. If you are an
            individual you may opt out of this arbitration agreement within thirty (30) days of the ﬁrst of the date you
            access or use this Services by following the procedure described below.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You agree that the U.S. Federal Arbitration Act governs the interpretation and enforcement of this
            provision, and that you and Quickimmi are each waiving the right to a trial by jury or to participate in a
            class action. This arbitration provision will survive any termination of these Terms.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            If you wish to begin an arbitration proceeding, after following the informal dispute resolution procedure,
            you must send a letter requesting arbitration and describing your claim to: Email: contact@quickimmi.ai
          </QText>
          <QText level="small" color="gray">
            The arbitration will be administered by the American Arbitration Association (AAA) under its rules
            including, if you are an individual, the AAA&#39;s Supplementary Procedures for Consumer-Related Disputes.
            If you are not an individual or have used the Services on behalf of an entity, the AAA&#39;s Supplementary
            Procedures for Consumer-Related Disputes will not be used. The AAA&#39;s rules are available at www.adr.org.
          </QText>
          <QText level="small" color="gray">
            Payment of all ﬁling, administration and arbitrator fees will be governed by the AAA&#39;s rules. If you are
            an individual and have not accessed or used the Services on behalf of an entity, we will reimburse those
            fees for claims where the amount in dispute is less than $10,000, unless the arbitrator determines the
            claims are frivolous, and we will not seek attorneys’ fees and costs in arbitration unless the arbitrator
            determines the claims are frivolous.
          </QText>
          <QText level="small" color="gray">
            The arbitrator, and not any federal, state, or local court, will have exclusive authority to resolve any
            dispute relating to the interpretation, applicability, unconscionability, arbitrability, enforceability, or
            formation of this arbitration agreement, including any claim that all or any part of this arbitration
            agreement is void or voidable. However, the preceding sentence will not apply to the “Class Action Waiver”
            section below.
          </QText>
          <QText level="small" color="gray">
            If you do not want to arbitrate disputes with Quickimmi and you are an individual, you may opt out of this
            arbitration agreement by sending an email to contact@quickimmi.ai within thirty (30) days of the ﬁrst of the
            date you access or use the Services.
          </QText>
        </>
      ),
    },
    {
      key: "18",
      label: <QText level="normal bold">Class Action Waiver</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Any Claim must be brought in the respective party’s individual capacity, and not as a plaintiﬀ or class
            member in any purported class, collective, representative, multiple plaintiﬀ, or similar proceeding (“Class
            Action”). The parties expressly waive any ability to maintain any Class Action in any forum. If the Claim is
            subject to arbitration, the arbitrator will not have authority to combine or aggregate similar claims or
            conduct any Class Action nor make an award to any person or entity not a party to the arbitration. Any claim
            that all or part of this Class Action Waiver is unenforceable, unconscionable, void, or voidable may be
            determined only by a court of competent jurisdiction and not by an arbitrator. The parties understand that
            any right to litigate in court, to have a judge or jury decide their case, or to be a party to a class or
            representative action, is waived, and that any claims must be decided individually, through arbitration.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            If this class action waiver is found to be unenforceable, then the entirety of the Arbitration Agreement, if
            otherwise eﬀective, will be null and void. The arbitrator may award declaratory or injunctive relief only in
            favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by
            that party&#39;s individual claim. If for any reason a claim proceeds in court rather than in arbitration,
            you and Quickimmi each waive any right to a jury trial.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            If a counter-notice is received by Quickimmi’s Copyright Agent, we may send a copy of the counter- notice to
            the original complaining party informing that person that we may replace the removed content or cease
            disabling it. Unless the original complaining party ﬁles an action seeking a court order against the Content
            Provider, member or user, the removed content may be replaced, or access to it restored, in ten business
            days or more after receipt of the counter-notice, at Quickimmi’s sole discretion.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Please understand that ﬁling a counter-notiﬁcation may lead to legal proceedings between you and the
            complaining party to determine ownership. Be aware that there may be adverse legal consequences in your
            country if you make a false or bad faith allegation by using this process.
          </QText>
        </>
      ),
    },
    {
      key: "19",
      label: <QText level="normal bold">Termination</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Improving our Services and user satisfaction are our eternal goal. That means we may expand, add, or remove
            our Services, features, functionalities, and the support of certain devices and platforms. Our Services may
            be interrupted, including for maintenance, repairs, upgrades, or network or equipment failures. We may
            discontinue some or all of our Services, including certain features and the support for certain devices and
            platforms, at any time. Events beyond our control may affect our Services, such as events in nature and
            other force majeure events. Although we hope you remain a Quickimmi user, you can terminate your
            relationship with Quickimmi anytime for any reason by deleting your account.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            We may modify, suspend, or terminate your access to or use of our Services anytime for any reason, such as
            if you violate the letter or spirit of our Terms or create harm, risk, or possible legal exposure for us,
            our users, or others. We may also disable or delete your account if it does not become active after account
            registration or if it remains inactive for an extended period of time. The following provisions will survive
            any termination of your relationship with Quickimmi: &quot;Licenses,&quot; &quot;Disclaimers and
            Release,&quot; &quot;Limitation Of Liability,&quot; &quot;Indemnification,&quot; &quot;Dispute
            Resolution,&quot; &quot;Termination &quot; &quot; Miscellaneous&quot;.
          </QText>
        </>
      ),
    },
    {
      key: "20",
      label: <QText level="normal bold">Miscellaneous</QText>,
      children: (
        <>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Unless a mutually executed agreement between you and us states otherwise, our Terms make up the entire
            agreement between you and us regarding Quickimmi and our Services, and supersede any prior agreements.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            We reserve the right to designate in the future that certain of our Services are governed by separate terms
            (where, as applicable, you may separately consent).
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Our Services are not intended for distribution to or use in any country or territory where such distribution
            or use would violate local law or would subject us to any regulations in another country or territory. We
            reserve the right to limit our Services in any country or territory.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You will comply with all applicable United States and non-United States export control and trade sanctions
            laws (&quot;Export Laws&quot;). You will not, directly or indirectly, export, re- export, provide, or
            otherwise transfer our Services: (a) to any individual, entity, territory, or country prohibited by Export
            Laws; (b) to anyone on United States or non-United States government restricted parties lists; or (c) for
            any purpose prohibited by Export Laws, including nuclear, chemical, or biological weapons, or missile
            technology applications without the required government authorizations. You will not use or download our
            Services if you are located in a restricted country or territory, if you are currently listed on any United
            States or non-United States restricted parties list, or for any purpose prohibited by Export Laws, and you
            will not disguise your location through IP proxying or other methods.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            We may amend or update these Terms. We will provide you notice of material amendments to our Terms, as
            appropriate, and update the &quot;Last modified&quot; date at the top of our Terms. Your continued use of
            our Services confirms your acceptance of our Terms, as amended. We hope you will continue using our
            Services, but if you do not agree to our Terms, as amended, you must stop using our Services by deleting
            your account.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            All of our rights and obligations under our Terms are freely assignable by us to any of our affiliates or in
            connection with a merger, acquisition, restructuring, or sale of assets, or by operation of law or
            otherwise, and we may transfer your information to any of our affiliates, successor entities, or new owner.
            In the event of such an assignment, these Terms will continue to govern your relationship with such
            third-party. We hope you will continue using our Services, but if you do not agree to such an assignment,
            you must stop using our Services by deleting your account after having been notified of the assignment.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            You will not transfer any of your rights or obligations under our Terms to anyone else without our prior
            written consent.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Nothing in our Terms will prevent us from complying with the law.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            Except as contemplated herein, our Terms do not give any third-party beneficiary rights.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            If we fail to enforce any of our Terms, it will not be considered a waiver.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            If any provision of these Terms is found to be unlawful, void, or for any reason unenforceable, then that
            provision shall be deemed amended to the minimum extent necessary to make it enforceable, and if it cannot
            be made enforceable then it shall be deemed severable from our Terms and shall not affect the validity and
            enforceability of the remaining provisions of our Terms, and the remaining portion of our Terms will remain
            in full force and effect.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            We reserve all rights not expressly granted by us to you. In certain jurisdictions, you may have legal
            rights as a consumer, and our Terms are not intended to limit such consumer legal rights that may not be
            waived by contract.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            We always appreciate your feedback or other suggestions about Quickimmi and our Services, but you understand
            that you have no obligation to provide feedback or suggestions and that we may use your feedback or
            suggestions without any restriction or obligation to compensate you for them.
          </QText>
          <QText level="small" color="gray" margin="margin-bottom-10">
            NO ACCESS TO EMERGENCY SERVICES: There are significant differences between our Services and your mobile
            phone and a fixed-line telephone and SMS services. Quickimmi does not provide access to emergency services
            or emergency services providers, including the police, fire departments, or hospitals, or otherwise connect
            to public safety answering points. You should ensure you can contact your relevant emergency services
            providers through a mobile phone, a fixed-line telephone, or other service.
          </QText>
        </>
      ),
    },
  ];

  const expandIcon = (props: any) => {
    if (props?.isActive) {
      return <UpOutlined className="terms-outlined active" />;
    }
    return <DownOutlined className="terms-outlined" />;
  };

  return (
    <div className="terms">
      <h1>
        <QText level="large">Quickimmi Terms of Service</QText>
      </h1>
      <QText level="small" color="gray">
        Version 1.0
      </QText>
      <QText level="small" color="gray">
        Release date: 04/03/2024
      </QText>
      <QText level="small" color="gray">
        Latest update date: 04/03/2024
      </QText>
      <QText level="small" color="gray">
        Effective date: 04/03/2024
      </QText>
      <Collapse
        className="terms-collapse"
        defaultActiveKey={["1"]}
        items={items}
        expandIcon={expandIcon}
        expandIconPosition="start"
        ghost
      />
    </div>
  );
}
