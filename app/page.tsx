import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Link
        href="/report"
        target="blank"
        className="text-xl rounded-md border-2 p-2 bg-white me-5"
      >
        Report Schema
      </Link>
      <Link
        href="/invoice"
        target="blank"
        className="text-xl rounded-md border-2 p-2 bg-white "
      >
        Invoice Schema
      </Link>
    </div>
  );
};

export default page;
