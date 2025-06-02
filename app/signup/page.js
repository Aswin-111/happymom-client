"use client";

import React, { Suspense } from "react";
import SignupPageInner from "./SignupPageInner";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <SignupPageInner />
    </Suspense>
  );
}
