"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import interceptor from "../utils/interceptor"; // make sure this is correctly set

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referral_id = searchParams.get("referral_id");

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!referral_id) {
        toast.error("Referral ID missing. Redirecting to home...");
        setTimeout(() => router.push("/"), 4000);
        return;
      }

      try {
        const res = await interceptor.get(
          `/auth/fetchreferraldata/${referral_id}`
        );
        setReferralData(res.data.referral_data);
      } catch (err) {
        toast.error("Invalid referral link. Redirecting to home...");
        setTimeout(() => router.push("/"), 4000);
      }
    };

    fetchReferralData();
  }, [referral_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { full_name, phone, email, password, confirm_password } = formData;

    if (!full_name.trim()) return "Name is required.";
    if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits.";
    if (!email.includes("@") || !email.includes(".")) return "Invalid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm_password) return "Passwords do not match.";

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        referred_by: referral_id || null,
      };

      await interceptor.post("/auth/signup", payload);
      toast.success("Signup successful! 🎉");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed";
      toast.error(message);
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
        <h1 className="text-white text-[22px] font-bold px-4 text-left pb-3 pt-5">
          Create your account
        </h1>

        {referralData && (
          <div className="px-4 pb-2 text-sm text-green-400 font-medium">
            Referred by: {referralData.full_name}
          </div>
        )}

        {[
          {
            label: "Full name",
            name: "full_name",
            placeholder: "Enter your full name",
          },
          {
            label: "Phone number",
            name: "phone",
            placeholder: "Enter your phone number",
          },
          { label: "Email", name: "email", placeholder: "Enter your email" },
          {
            label: "Password",
            name: "password",
            placeholder: "Enter your password",
            type: "password",
          },
          {
            label: "Confirm password",
            name: "confirm_password",
            placeholder: "Confirm your password",
            type: "password",
          },
        ].map(({ label, name, placeholder, type = "text" }, i) => (
          <div
            key={i}
            className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
          >
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium pb-2">{label}</p>
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="form-input w-full rounded-xl text-white bg-[#303030] h-14 placeholder:text-[#ababab] p-4 text-base"
              />
            </label>
          </div>
        ))}

        <div className="flex px-4 py-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full justify-center rounded-full h-12 bg-black text-white text-base font-bold hover:bg-[#222] transition"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </div>
      </div>

      <div>
        <p
          className="text-[#ababab] text-sm text-center underline pb-3 px-4 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Already have an account? Sign in
        </p>
        <div className="h-5 bg-[#141414]" />
      </div>

      <Toaster />
    </div>
  );
}
