"use client";
import { signIn } from "next-auth/react";
import React, { FormEventHandler, useState } from "react";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import InputPassword from "@/components/InputPassword";
import Alert from "./Alert";

const CardSignIn = () => {
  const [userIdentify, setUserIdentify] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (loading) setLoading(false);

    setMessageError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        userIdentify,
        password,
        callbackUrl: "/",
      });

      if (res?.error) {
        throw new Error("User Not Found");
      }
    } catch (error: any) {
      setMessageError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className=" flex flex-col gap-1"
      autoComplete="off"
      autoCorrect="on"
    >
      {messageError ? <Alert status="error">{messageError}</Alert> : null}
      <InputText
        display="username or email"
        value={(value) => setUserIdentify(value)}
      />
      <InputPassword value={(value) => setPassword(value)} />
      <Button type="submit" className="mt-3" isLoading={loading}>
        Log In
      </Button>
    </form>
  );
};

export default CardSignIn;
