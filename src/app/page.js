"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Test from "@/components/Test";
import { ctx } from "@/context/appContext";
import { useContext } from "react";
export default function App() {
  const ctxData = useContext(ctx);
  const { state } = ctxData;
  return (
    <div>
      <Header />

      {state.isLoggedIn ? <Test /> : <Login />}
      <Footer />
    </div>
  );
}
