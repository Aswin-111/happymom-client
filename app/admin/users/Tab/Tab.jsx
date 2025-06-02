"use client";
import { Button } from "@/components/ui/button";

const Tabs = ({ selected, onChange, router, id }) => {
  const tabs = [
    "users",
    "wallet",
    "incentives",
    "credit points",
    "edit details",
  ];
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={selected === tab ? "default" : "outline"}
          onClick={() => {
            onChange(tab);
            if (tab === "users") {
              return router.push(`/admin/users/${id}`);
            } else if (tab.includes("credit points")) {
              return router.push(`/admin/users/credits/${id}`);
            } else if (tab.includes("edit details")) {
              return router.push(`/admin/users/edit/${id}`);
            }
            router.push(`/admin/users/${tab}/${id}`);
            console.log("tab", tab);
          }}
          className="capitalize"
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
