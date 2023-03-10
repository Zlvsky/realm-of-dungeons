import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from "../../components/common/forms/Checkbox";
import Form from "../../components/common/forms/Form";
import Input from "../../components/common/forms/Input";
import Header from "../../components/common/text/Header";
import FullWrapper from "../../components/layouts/page-wrappers/FullWrapper";

function SignIn() {
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const onSubmit = () => {};

  return (
    <FullWrapper>
      <div className="flex flex-col justify-center items-center max-w-lg mx-auto min-h-screen">
        <div className="w-full text-center mt-28">
          <p className="text-secondary font-sans text-lg">
            LOGIN TO YOUR ACCOUNT
          </p>
          <Header>SignIn</Header>
        </div>
        <div className="w-full">
          <Form id="signup" submitBtn={"CREATE ACCOUNT"} onSubmit={onSubmit}>
            <Input
              label="Account name:"
              name="accountname"
              type="text"
              placeholder="Enter your account name"
              divClassName="my-8"
              value={accountName}
              onChange={(e: any) => setAccountName(e.target.value)}
              // onKeyPress={inputOnlyLetters}
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
              // onKeyPress={inputOnlyLetters}
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
    </FullWrapper>
  );
}

export default SignIn;
