import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../client/appClient';
import Checkbox from '../../components/common/forms/Checkbox';
import Form from '../../components/common/forms/Form';
import Input from '../../components/common/forms/Input';
import Header from '../../components/common/text/Header';
import FullWrapper from '../../components/layouts/page-wrappers/FullWrapper';

function SignUp() {
    const [accountName, setAccountName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [terms, setTerms] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async () => {
      const data = {
        accountname: accountName,
        email: email,
        password: password,
      };
      const response = await register(data);
      if (response.status !== 200) return console.log(response);
      console.log("success", response.data);
      navigate("/signin");
    };

    return (
      <FullWrapper>
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto min-h-screen">
          <div className="w-full text-center mt-28">
            <p className="text-secondary font-sans text-lg">
              CREATE YOUR ACCOUNT
            </p>
            <Header>SignUp</Header>
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
                label="Email:"
                name="email"
                type="text"
                placeholder="Enter your email address"
                divClassName="my-8"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
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
              <Input
                label="Repeat your password:"
                name="repassword"
                type="password"
                placeholder="Repeat your password"
                divClassName="my-8"
                value={repeatPassword}
                onChange={(e: any) => setRepeatPassword(e.target.value)}
                // onKeyPress={inputOnlyLetters}
                // error={errors?.fullName}
                required
              />
              <Checkbox
                id="terms"
                onChange={(e: any) => setTerms(e.target.checked)}
                required
              >
                Accept terms of Use, Privacy Notice and Cookies Notice
              </Checkbox>
              <p className='text-primaryLight text-right font-sans text-sm'>
                Already have an account? <Link to="/signin" className='underline text-primary'>SignIn</Link>
              </p>
            </Form>
          </div>
        </div>
      </FullWrapper>
    );
}

export default SignUp;