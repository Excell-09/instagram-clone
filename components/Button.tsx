"use client";

interface Props {
  children: string;
  type: "button" | "submit";
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  isDisable?: boolean;
}

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.isLoading || props.isDisable}
      type={props.type}
      className={`${props.className} disabled:bg-opacity-40 disabled:cursor-not-allowed bg-blue-500 text-white font-medium py-1 rounded-md`}
    >
      {props.isLoading ? "Loading..." : props.children}
    </button>
  );
}
