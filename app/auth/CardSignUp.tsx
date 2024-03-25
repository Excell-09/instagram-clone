"use client";
import React, { FormEventHandler, useState } from "react";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import AppAxios from "@/utils/AppAxios";
import { AxiosError } from "axios";
import WebResponse from "@/utils/webResponse";
import InputPassword from "@/components/InputPassword";
import Alert from "./Alert";

const CardSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", status: "" });

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (loading) setLoading(false);

    setLoading(true);
    setAlert({ message: "", status: "" });
    try {
      await AppAxios.post("/auth/register", {
        username,
        email,
        password,
      });

      setAlert({ message: "User Created", status: "success" });
    } catch (error: any) {
      const errorResponse = error as AxiosError<WebResponse<{}>>;
      setAlert({
        message: errorResponse.response?.data.error!,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className=" flex flex-col gap-1"
      autoComplete="off"
      autoCorrect="on"
    >
      {alert.message ? (
        <Alert status={alert.status as "error" | "success"}>
          {alert.message}
        </Alert>
      ) : null}
      <InputText display="username" value={(value) => setUsername(value)} />
      <InputText display="email" value={(value) => setEmail(value)} />
      <InputPassword value={(value) => setPassword(value)} />
      <Button type="submit" className="mt-3" isLoading={loading}>
        Log In
      </Button>
    </form>
  );
};

export default CardSignUp;
