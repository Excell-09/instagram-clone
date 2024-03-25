"use client";

const Alert = ({
  children,
  status,
}: {
  children: string;
  status: "success" | "error";
}) => {
  if (status === "error") {
    return <p className="mb-3 text-red-500 text-center">{children}</p>;
  }

  return <p className="mb-3 text-green-600 text-center">{children}</p>;
};

export default Alert;
