import React, { Suspense } from "react";
import { Faq, Hero, HowItWorks, Calculator } from "./components";
import { CircularProgress } from "@material-ui/core";
const FallBack = () => (
  <main className="my-auto">
    <CircularProgress />
  </main>
);
const init = {
  product: {
    name: "",
    color: "",
    rom: "",
    condition: "",
  },
  meta: {
    payment: 0,
    months: 0,
    amount: 0,
    dividend: 0,
  },
  user: {
    email: "",
    agent: window.navigator.userAgent,
  },
};
function Home() {
  return (
    <Suspense fallback={FallBack}>
      <Hero />
      <main>
        <HowItWorks />
        <Calculator init={init} />
        <Faq />
      </main>
    </Suspense>
  );
}

export default Home;
