// "use client";
// import Link from "next/link";

// export default function EditProfilePage() {
//   return (
//     <div className="relative flex min-h-screen flex-col justify-between bg-[#141414] overflow-x-hidden font-sans">
//       <div>
//         {/* Header */}
//         <div className="flex items-center bg-[#141414] p-4 pb-2 justify-between">
//           <div className="text-white flex size-12 shrink-0 items-center">
//             <Link href="/" className="inline-flex">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24px"
//                 height="24px"
//                 fill="currentColor"
//                 viewBox="0 0 256 256"
//               >
//                 <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
//               </svg>
//             </Link>
//           </div>
//           <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
//             Edit Profile
//           </h2>
//         </div>

//         {/* Profile Form Fields */}
//         {[
//           "Full Name",
//           "Email",
//           "Phone Number",
//           "Country",
//           "Date of Birth",
//           "Address",
//           "City",
//           "Zip Code",
//         ].map((label, index) => (
//           <div
//             key={index}
//             className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
//           >
//             <label className="flex flex-col min-w-40 flex-1">
//               <p className="text-white text-base font-medium pb-2">{label}</p>
//               <input
//                 type="text"
//                 placeholder={`Enter ${label}`}
//                 className="form-input w-full rounded-xl text-white border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base focus:outline-0 focus:ring-0 focus:border-[#474747]"
//               />
//             </label>
//           </div>
//         ))}
//       </div>

//       {/* Save Button */}
//       <div>
//         <div className="flex px-4 py-3">
//           <button className="flex flex-1 h-12 px-5 items-center justify-center rounded-full bg-black text-white text-base font-bold">
//             <span className="truncate">Save Changes</span>
//           </button>
//         </div>
//         <div className="h-5 bg-[#141414]" />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import interceptor from "@/app/utils/interceptor";
import { toast, Toaster } from "react-hot-toast";
const initialProfile = {
  full_name: "",
  phone: "",
  email: "",
  profile: {
    bank_name: "",
    bank_account_num: "",
    bank_ifsc_code: "",
    dob: "",
    address: "",
    pin_code: "",
    district: "",
    area: "",
    state: "",
    country: "",
    aadhar_num: "",
    pan_num: "",
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await interceptor.get("/profile/getprofile");
        setProfile({
          ...res.data,
          profile: {
            ...initialProfile.profile,
            ...res.data.profile,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleSaveChanges = async () => {
    try {
      const payload = {
        full_name: profile.full_name,
        phone: profile.phone,
        email: profile.email,
        profile: {
          ...profile.profile,
        },
      };
      console.log(payload);
      const res = await interceptor.put("/profile/updateprofile", payload);
      console.log(res);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-[#141414] overflow-x-hidden font-sans">
      <div>
        <div className="flex items-center bg-[#141414] p-4 pb-2 justify-between">
          <div className="text-white flex size-12 shrink-0 items-center">
            <Link href="/" className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
              </svg>
            </Link>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Edit Profile
          </h2>
        </div>

        {[
          { label: "Full Name", name: "full_name", value: profile.full_name },
          { label: "Email", name: "email", value: profile.email },
          { label: "Phone Number", name: "phone", value: profile.phone },
          { label: "Country", name: "country", value: profile.profile.country },
          { label: "Date of Birth", name: "dob", value: profile.profile.dob },
          { label: "Address", name: "address", value: profile.profile.address },
          { label: "Area", name: "area", value: profile.profile.area },
          {
            label: "District",
            name: "district",
            value: profile.profile.district,
          },
          {
            label: "State",
            name: "state",
            value: profile.profile.state,
          },
          {
            label: "Zip Code",
            name: "pin_code",
            value: profile.profile.pin_code,
          },
          {
            label: "Aadhar Number",
            name: "aadhar_num",
            value: profile.profile.aadhar_num,
          },
          {
            label: "PAN Number",
            name: "pan_num",
            value: profile.profile.pan_num,
          },
          {
            label: "Account Number",
            name: "bank_account_num",
            value: profile.profile.bank_account_num,
          },
          {
            label: "Bank Name",
            name: "bank_name",
            value: profile.profile.bank_name,
          },
          {
            label: "IFSC Code",
            name: "bank_ifsc_code",
            value: profile.profile.bank_ifsc_code,
          },
        ].map((field, index) => (
          <div
            key={index}
            className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
          >
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium pb-2">
                {field.label}
              </p>
              {/* <input
                type="text"
                name={field.name}
                value={
                  field.name in profile
                    ? profile[field.name]
                    : profile.profile[field.name]
                }
                onChange={
                  field.name in profile ? handleChange : handleProfileChange
                }
                placeholder={`Enter ${field.label}`}
                className="form-input w-full rounded-xl text-white border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base focus:outline-0 focus:ring-0 focus:border-[#474747]"
              /> */}
              <input
                type={field.name === "dob" ? "date" : "text"} // Use date input for DOB
                name={field.name}
                value={
                  field.name in profile
                    ? profile[field.name]
                    : profile.profile[field.name]
                }
                onChange={
                  field.name in profile ? handleChange : handleProfileChange
                }
                placeholder={`Enter ${field.label}`}
                className="form-input w-full rounded-xl text-white border border-[#474747] bg-[#212121] h-14 placeholder:text-[#ababab] p-[15px] text-base focus:outline-0 focus:ring-0 focus:border-[#474747]"
              />
            </label>
          </div>
        ))}
      </div>

      <div>
        <div className="flex px-4 py-3 mb-16">
          <button
            className="flex flex-1 h-12 px-5 items-center justify-center rounded-full bg-black text-white text-base font-bold"
            onClick={handleSaveChanges}
          >
            <span className="truncate">Save Changes</span>
          </button>
        </div>
        <div className="h-5 bg-[#141414]" />
      </div>
      <Toaster />
    </div>
  );
}
