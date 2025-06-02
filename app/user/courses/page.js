// import React from "react";
// import Link from "next/link";

// const courses = [
//   {
//     title: "Data Science Fundamentals",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuDh20PUPQA0nHyfT43duGD5PUsitBzUNr2S3-bCyZFa5KHTr4u7BXpf0pGf0zVAZHI8K-l5IoZ9eQB_n6KHXBC62I28Nue-WLd4o-sUKew6K5WrUX6Of-objN8brhCtNuVCHl2vYBbuhYsaPi1GDllT7s3r_bpk9KWHuthze02uwrl0Q7jMUpnbn-PrFEAVwRCsVdyjvdD3TGWsxjwCvV-u6mC5s83IfdnpBwNzaXF7kNE61RQMLnkrDNbCe97Y1HvO4PrzCXtcazI",
//   },
//   {
//     title: "Digital Marketing Mastery",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuDx70P45qXw8NcfGHNUnAROerEOra6KVjDBG0hWwByAgMHC4Ios57bX-9Skrk4JxdcocvRxf_Ij4MZaB8fDjYedyvcGPTZrW2owbdM64PdsX2SEgiD_dZWuRLN7PfMp30W_ltT0DVoeiggBRLDyO2ukYlJTbT1lg9Vezi7Vfed28mDnHKVYREOno3eRybCUweeFbLHR1bniwcWdF-0r-DhCz3ivUY2svOFHO-2Oj9SXBXA8gKLIXP4z4NyPyogE-snDD09VEJTDSJM",
//   },
//   {
//     title: "Financial Modeling & Analysis",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAD6iGJrixgoLpQ3BI6d2gDlC-YT940Ts5A47uiIf1YqFQdRAPd7gX56Hj-QIS_1vAj8Y9qsnc2D-HfeNWaqybBsp97gJFNr2-1lmzPQh6oHCeJpGvmjrG39uygsffpzK0Ft4fX5zYVNbVvukPVqQLzaOt2YuenI6b87AqWE_yB7R4DepJYt4iTeZQieF_GnU_3zKbn02w9r5F56Mpma2z2akPugiZIz-vCgqYvUxbnKgOjmogHkk3XSgBGpLvSJdBm8Qy8VVQFVJU",
//   },
//   {
//     title: "Product Management Essentials",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA_oLuxWhs9LoYcoVa5R3zxmUVXVO5J1rKRqMevjiejRPKdCnLCBt9NaT5hEdlnYUQTZRW9eY5EWX9Vz1cAXcN_QzI68g-ROCL_qEjmjX0uFs5WIWN7yfF3na-FKDOFeeAwCL8g9H-6DBpf27bAFjb6VSWZjsxi-hyieSmWZpxmwTNyyN5SZB4CvFfay285wNN17lM-mLPVn4dOwW2-y6FUMlk98SHFZcX2Bqiu6fLoNiC2YoyROGtqORc4ohNF6GCbl2RB5M1n15Y",
//   },
//   {
//     title: "UX/UI Design Bootcamp",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA2o8u5dA5qbF2S_K0FtUEEkNUzBknjjKGzFU8RrD71G0_hHNLHYKfoeLHqyV7fU2Pf91TvNWQFZBrueSG1FtHyPJGOr-1svBxHv_41dC3TjtJs2IheKDFo5Nesf2hx6bqEzYQawJLCeSwb3m81k4_Ogw15bQ2ZeJuQj3bHRDPmVmMnJHK7kzOnwnNTfNihYfVi3ZAObSYUVOqOzZqXMVGkx1MmwO-EEpH9jWltpCBpwa1ZGJVK0iIwxF1TG_Ex92t0c-PzDGWwUbk",
//   },
//   {
//     title: "Cloud Computing Architect",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAGIspf1gT4A3ZvBsFFfnuajTeO3j-9-Pr6S3m_yDU08ONbC1Ko8nor46VuU-zO9D656Bc2zPhrUAgrQOXyfAc8eJ4XNnWakP7wYGK-JD-V1FgfpylsMALNffl4v-0m_QhyIyCPdXcXuq_QtsJK-cG1iU6tsnGjxgRyeGzedIMuiSew6LkN38UQMQV-Tiwpo6oTNIBmPzFwLvquG_0PMDeVH4nyPMoXUbTDXeoDQ_TmqT6iBlINk2BI-YdnULUuogDBqvnWIU5ToQk",
//   },
// ];

// export default function CoursesPage() {
//   return (
//     <div className="relative flex min-h-screen flex-col justify-between bg-[#141414] overflow-x-hidden font-sans">
//       <div>
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
//                 <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
//               </svg>
//             </Link>
//           </div>
//           <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
//             Courses
//           </h2>
//         </div>

//         <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
//           {courses.map((course, index) => (
//             <div key={index} className="flex flex-col gap-3 pb-3">
//               <div
//                 className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
//                 style={{ backgroundImage: `url(${course.image})` }}
//               ></div>
//               <p className="text-white text-base font-medium leading-normal">
//                 {course.title}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import interceptor from "@/app/utils/interceptor";
import Link from "next/link";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await interceptor.get("/course/courses");
        console.log(res.data);
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-[#141414] overflow-x-hidden font-sans">
      <div>
        {/* Header */}
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
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
              </svg>
            </Link>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Courses
          </h2>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40 text-white">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {courses &&
              courses.map((course) => (
                <div
                  key={course._id}
                  className="flex flex-col gap-3 pb-3 cursor-pointer"
                  onClick={() => router.push(course?.course_link)}
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_IMAGE_BASE_URL
                      }/${course.course_image.replace(/\\/g, "/")})`,
                    }}
                  ></div>
                  <p className="text-white text-base font-medium leading-normal">
                    {course.course_name}
                  </p>
                  <span className="text-xs text-[#ababab] font-semibold">
                    {course.course_price} RS
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
