import FullWrapper from "../../components/layouts/page-wrappers/FullWrapper";
import Footer from "../../components/footer/Footer";

function Terms() {
  return (
    <FullWrapper>
      <div className="clean-style flex flex-col max-w-5xl mx-auto min-h-screen px-2 py-10 md:py-40">
        <h1>Terms of Service for Realm of Dungeons</h1>
        <h4>Last Updated: 20.12.2023</h4>
        <p>
          By accessing or using the Realm of Dungeons website and online game,
          you agree to comply with and be bound by the following Terms of
          Service. If you do not agree with these terms, please do not use the
          Project.
        </p>
        <ol>
          <li>
            Acceptance of Terms:
            <br />
            By using the Project, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service.
          </li>
          <li>
            User Eligibility:
            <br />
            You must be at least 18 years old to use the Project. If you are
            under the age of 18, you may only use the Project under the
            supervision of a parent or legal guardian.
          </li>
          <li>
            Account Registration:
            <ol>
              <li>
                You are required to create an account to access certain features
                of the Project.
              </li>
              <li>
                You agree to provide accurate, current, and complete information
                during the registration process.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials.
              </li>
            </ol>
          </li>

          <li>
            User Conduct:
            <ol>
              <li>
                You agree to use the Project in accordance with all applicable
                laws and regulations.
              </li>
              <li>
                You will not engage in any activity that disrupts, damages, or
                interferes with the functioning of the Project.
              </li>
            </ol>
          </li>
          <li>
            Intellectual Property:
            <ol>
              <li>
                All content and materials on the Project, including but not
                limited to text, graphics, and logos, are the property of
                Krzysztof Zaleski.
              </li>
              <li>
                You may not use, reproduce, or distribute any content from the
                Project without the express written permission of Krzysztof
                Zaleski.
              </li>
            </ol>
          </li>
          <li>
            Privacy:
            <ol>
              <li>
                The collection and use of personal information are governed by
                our <a href="/legal/privacy-policy">Privacy Policy</a>.
              </li>
              <li>
                By using the Project, you consent to the collection and use of
                your personal information as described in the{" "}
                <a href="/legal/privacy-policy">Privacy Policy</a>.
              </li>
            </ol>
          </li>
          <li>
            Termination:
            <br />
            Krzysztof Zaleski reserves the right to terminate or suspend your
            account and access to the Project at any time, with or without
            cause.
          </li>
          <li>
            Disclaimer of Warranties:
            <br />
            The Project is provided "as is" and without warranties of any kind,
            whether express or implied.
          </li>
          <li>
            Limitation of Liability:
            <br />
            Krzysztof Zaleski shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits
            or revenues.
          </li>
          <li>
            Changes to Terms:
            <br />
            Krzysztof Zaleski reserves the right to update or modify these Terms
            of Service at any time without prior notice. Your continued use of
            the Project after the changes become effective constitutes
            acceptance of the revised terms.
          </li>
          <li>
            Governing Law:
            <br />
            These Terms of Service are governed by and construed in accordance
            with the laws of Poland.
          </li>
          <li>
            Contact Information:
            <br />
            If you have any questions, concerns, or inquiries regarding these
            Terms of Service, please contact us at{" "}
            <a href="mailto:webzaleski@gmail.com" className="text-primary">
              webzaleski@gmail.com
            </a>
          </li>
        </ol>
        <p>
          By using the Realm of Dungeons website and online game, you
          acknowledge that you have read and understood these Terms of Service
          and agree to abide by them.
        </p>
      </div>
      <Footer />
    </FullWrapper>
  );
}

export default Terms;
