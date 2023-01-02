import Hero from "components/hero";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();
  return <Hero />;
}
