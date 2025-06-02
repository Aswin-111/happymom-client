"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import interceptor from "../utils/interceptor";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { phone, password } = formData;
    if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await interceptor.post("/auth/login", formData);
      toast.success("Login successful!");
      localStorage.setItem("happymom_acc_token", response.data.token);
      router.push("/user/dashboard");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#141414] justify-between overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-[#141414] p-4 pb-2 justify-end">
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
            </button>
          </div>
        </div>

        <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Phone Number",
              name: "phone",
              placeholder: "Enter your phone number",
              type: "tel",
            },
            {
              label: "Password",
              name: "password",
              placeholder: "Enter your password",
              type: "password",
            },
          ].map(({ label, name, placeholder, type }, i) => (
            <div
              key={i}
              className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
            >
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  {label}
                </p>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#303030] focus:border-none h-14 placeholder:text-[#ababab] p-4 text-base font-normal leading-normal"
                />
              </label>
            </div>
          ))}

          <div className="flex px-4 py-3">
            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-black text-white text-base font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>
          </div>
        </form>
      </div>

      <div>
        <p
          className="text-[#ababab] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
          onClick={() => router.push("/signup")}
        >
          Don’t have an account? Sign up
        </p>
        <div className="h-5 bg-[#141414]" />
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default LoginPage;
