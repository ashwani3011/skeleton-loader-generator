"use client";

import React from "react";
import { Header, SkeletonGenerator, Footer } from "../components";

const Page: React.FC = () => {
  return (
    <>
      <Header />
      <SkeletonGenerator />
      <Footer />
    </>
  );
};

export default Page;
