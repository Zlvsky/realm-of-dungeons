import FullWrapper from '../../components/layouts/page-wrappers/FullWrapper';
import Footer from '../../components/footer/Footer';

function PrivacyPolicy() {
    return (
      <FullWrapper>
        <div className="clean-style flex flex-col max-w-5xl mx-auto min-h-screen px-2 py-10 md:py-40">
          <h1>Privacy Policy for Realm of Dungeons</h1>
          <h4>Last Updated: 20.12.2023</h4>
          <p>
            This Privacy Policy describes how Krzysztof Zaleski, the creator of
            the Realm of Dungeons website and online game, collects, uses, and
            shares personal information obtained from users of the Project. By
            accessing or using the Project, you agree to the terms of this
            Privacy Policy.
            <br />
            If you do not agree with the terms of this Privacy Policy, please do
            not use the Project.
          </p>
          <ol>
            <li>Information We Collect:</li>
            <ol>
              <li>
                Cookies <br /> We use cookies to handle login sessions. These
                cookies are essential for the proper functioning of the Project
                and are used solely for the purpose of user authentication.
              </li>
              <li>
                <li>
                  Personal Information: <br />
                  When you register and log in, we collect and store the email
                  address you provide for authentication purposes. Additionally,
                  on our backend server, we store user nicknames and hashed
                  passwords using the bcrypt library.
                </li>
              </li>
            </ol>
            <li>
              How We Use Your Information:
              <ol>
                <li>
                  Authentication: <br /> We use your email address, nickname and
                  hashed password to authenticate your identity and allow access
                  to your account.
                </li>
                <li>
                  User Experience: <br /> We may use cookies to enhance your
                  user experience and provide personalized content during your
                  visit to the Project.
                </li>
              </ol>
            </li>
            <li>
              Data Security:
              <ol>
                <li>
                  Password Protection: <br />
                  User passwords are hashed using the bcrypt library, ensuring a
                  high level of security. We do not store or have access to
                  plain-text passwords.
                </li>
                <li>
                  Server Security: <br />
                  Our backend server is secured to protect against unauthorized
                  access and data breaches.
                </li>
              </ol>
            </li>
            <li>
              Information Sharing:
              <ol>
                <li>
                  Internal Use Only: <br /> We do not sell, trade, or otherwise
                  transfer your personal information to outside parties. Your
                  information is used solely for the operation of the Project.
                </li>
                <li>
                  Legal Compliance: <br /> We may disclose your information in
                  response to a legal request, such as a court order or
                  subpoena, or to comply with applicable laws and regulations.
                </li>
              </ol>
            </li>
            <li>
              Your Choices:
              <ol>
                <li>
                  Cookie Settings: <br />
                  You can manage your cookie preferences through your browser
                  settings. However, disabling cookies may affect the
                  functionality of the Project.
                </li>
                <li>
                  {" "}
                  Account deletion: <br /> If you wish to delete your account
                  and personal information, please contact us at{" "}
                  <a
                    href="mailto:webzaleski@gmail.com"
                    className="text-primary"
                  >
                    webzaleski@gmail.com
                  </a>
                </li>
              </ol>
            </li>
          </ol>
          <p>
            By using the Realm of Dungeons website and online game, you
            acknowledge that you have read and understood this Privacy Policy
            and agree to its terms.
          </p>
        </div>
        <Footer />
      </FullWrapper>
    );
}

export default PrivacyPolicy;