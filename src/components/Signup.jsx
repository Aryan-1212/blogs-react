import React, { useState } from "react";
import { Logo, Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as StateLogin } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userRegister = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createAccount(data);
      console.log(session);
      if (session) {
        const userData = await authService.getUser();
        console.log(userData);
        if (userData) dispatch(StateLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(userRegister)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              placeholder="Create password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              // children="Create Account"
              children={loading ? "Validating Credentials" : "Create Account"}
              type="submit"
              className={`w-full ${loading ? "bg-gray-300" : ""}`}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
