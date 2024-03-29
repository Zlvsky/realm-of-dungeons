import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../client/appClient";
import Form from "../../components/common/forms/Form";
import Input from "../../components/common/forms/Input";
import Header from "../../components/common/text/Header";
import FullWrapper from "../../components/layouts/page-wrappers/FullWrapper";
import { fetchUser } from "../../utils/fetchers/fetchUser";
import { useDispatch } from "react-redux";
import { displayGlobalError } from "../../utils/notifications/errors";
import Footer from "../../components/footer/Footer";

function SignIn() {
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const data = {
      accountname: accountName,
      password: password
    };
    const response = await login(data);
    if(response.status !== 200) return displayGlobalError(dispatch, response);
    fetchUser(dispatch)
    navigate("/start");
  };

  return (
    <FullWrapper>
      <div className="flex flex-col justify-center items-center max-w-lg mx-auto min-h-screen px-2">
        <div className="w-full text-center mt-28">
          <p className="text-secondary font-sans text-lg">
            LOGIN TO YOUR ACCOUNT
          </p>
          <Header>SignIn</Header>
        </div>
        <div className="w-full">
          <Form id="signup" submitBtn={"LOGIN"} onSubmit={onSubmit}>
            <Input
              label="Account name:"
              name="accountname"
              type="text"
              placeholder="Enter your account name"
              divClassName="my-8"
              value={accountName}
              onChange={(e: any) => setAccountName(e.target.value)}
              // error={errors?.fullName}
              required
            />
            <Input
              label="Password:"
              name="password"
              placeholder="Enter your password"
              divClassName="my-8"
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              // error={errors?.fullName}
              required
            />
            <p className="text-primaryLight text-right font-sans text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-primary">
                SignUp
              </Link>
            </p>
          </Form>
        </div>
      </div>
      <Footer />
    </FullWrapper>
  );
}

export default SignIn;
