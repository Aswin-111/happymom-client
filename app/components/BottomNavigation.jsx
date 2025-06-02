"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  VideoIcon,
  WalletIcon,
  UserIcon,
  ShareIcon,
} from "@/app/components/icons"; // Adjust path if needed
import interceptor from "../utils/interceptor";
export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/user/dashboard", icon: "House", svg: HomeIcon },
    { href: "/user/courses", icon: "Video", svg: VideoIcon },
    { href: "/user/wallet", icon: "Wallet", svg: WalletIcon },
    { href: "/user/profile", icon: "User", svg: UserIcon },
    { href: "/user/share", icon: "Share", svg: ShareIcon },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-[#212121] border-t border-[#303030] z-50">
      <div className="flex gap-2 px-4 pb-3 pt-2">
        {navItems.map(({ href, svg: Icon }, index) => {
          const isActive = pathname === href;
          return (
            <Link
              key={index}
              href={href}
              className={`flex flex-1 flex-col items-center justify-end gap-1 ${
                isActive ? "text-white" : "text-[#ababab]"
              }`}
            >
              <div className="flex h-8 items-center justify-center">
                <Icon />
              </div>
            </Link>
          );
        })}
        {/* <div
          className="flex h-8 items-center justify-center text-[#ababab] gap-1"
          onClick={() => {
            (async () => {
              try {
                const response = await interceptor.get("/user/getreferrallink");
                const referral_link = response.data.referral_link;
                console.log(referral_link);
                const shareData = {
                  title: "Happymom referral link",
                  text: "Share this link to your preferred social media platform",
                  url: `${referral_link}`,
                };
                await navigator.clipboard.writeText(referral_link);
                await navigator.share(shareData);
              } catch (err) {
                console.log(err);
              }
            })();
          }}
        >
          <ShareIcon />
        </div> */}
      </div>
      <div className="h-5 bg-[#212121]" />
    </div>
  );
}
