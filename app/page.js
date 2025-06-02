"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const benefits = [
    {
      title: "Strengthen Family Bonds",
      description:
        "Engage in shared mindfulness practices that foster connection and understanding within your family.",
      image: "/strengthen-family-bonds.png",
    },
    {
      title: "Improve Focus and Concentration",
      description:
        "Help children develop better focus and attention skills, leading to improved academic performance.",
      image: "/improve-focus.png",
    },
    {
      title: "Promote Emotional Resilience",
      description:
        "Equip your family with the tools to navigate challenges, manage emotions, and build resilience.",
      image: "/emotional-resilience.png",
    },
    {
      title: "Quality Time Together",
      description:
        "Spend meaningful moments with your children through shared mindfulness activities.",
      image: "quality-together.png",
    },
    {
      title: "Balanced Family Life",
      description:
        "Achieve balance between well-being and family duties for a peaceful home.",
      image: "/family-life.png",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="border-b border-[#e7eff3] px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 text-[#0e171b]">
            <div className="w-5 h-5">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-[-0.015em]">Happymom</h2>
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xl text-[#0e171b]"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {[
                "For Parents",
                "For Kids",
                "For Educators",
                "For Therapists",
              ].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm font-medium text-[#0e171b]"
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              className="h-10 min-w-[84px] rounded-full bg-[#e7eff3] px-4 text-sm font-bold text-[#0e171b]"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden">
            {["For Parents", "For Kids", "For Educators", "For Therapists"].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  className="block text-[#0e171b] text-base font-medium border-b pb-2"
                >
                  {label}
                </a>
              )
            )}
            <button
              className="w-full h-10 rounded-full bg-[#e7eff3] px-4 text-sm font-bold text-[#0e171b]"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center bg-no-repeat p-6 text-white flex flex-col gap-4 items-center justify-center min-h-[480px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("/hero-pic.png")',
        }}
      >
        <h1 className="text-4xl font-black text-center tracking-tight">
          Find your calm with Happymom
        </h1>
        <p className="text-sm text-center max-w-xl">
          Happymom is a platform dedicated to family wellness, offering guided
          meditations, mindfulness exercises, and resources for parents and
          children.
        </p>
        <button className="h-10 rounded-full bg-[#42b2ea] px-5 text-sm font-bold text-[#0e171b]">
          Explore Meditations
        </button>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#0e171b] mb-4">
          Discover the benefits of mindfulness
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4">
          {benefits.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div
                className="aspect-video bg-center bg-no-repeat bg-cover rounded-xl"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <p className="text-[#0e171b] font-medium">{item.title}</p>
              <p className="text-sm text-[#4e7f97]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e7eff3] px-6 py-10 text-center text-[#4e7f97]">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map(
            (label) => (
              <a key={label} href="#" className="text-base">
                {label}
              </a>
            )
          )}
        </div>
        <p className="text-sm">@2024 Happymom. All rights reserved.</p>
      </footer>
    </div>
  );
}
