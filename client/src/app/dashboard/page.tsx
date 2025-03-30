"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const { user } = useUser();
  if (!user) return <>Loading. . . </>;
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>You are logged in as a user.</p>
      <Button
        className="text-base py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-red-700 transition-all duration-300"
        onClick={() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("tempUserId");
          toast("You have successfully logged out.");
          window.location.href = "/";
        }}
      >
        Logout
      </Button>
      <Button
        className="text-base py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-red-700 transition-all duration-300"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        toast
      </Button>
    </div>
  );
};

export default Page;
