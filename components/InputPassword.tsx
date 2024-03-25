import { useState } from "react";

interface Props {
  value: (value: string) => void;
}

const InputPassword = (props: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full">
      <input
        id={"password"}
        onChange={(e) => props.value(e.target.value)}
        type={show ? "text" : "password"}
        className="p-2 border-2 border-gray-300 rounded-md outline-none bg-slate-100 focus-within:border-gray-400 focus:placeholder:-translate-y-[8px] focus:placeholder:text-[12px] placeholder:transition-all placeholder:font-light placeholder:text-[14px] placeholder:text-gray-600 w-full flex-1"
        placeholder={"password"}
      />
      <span
        className="font-semibold cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10"
        onClick={() => setShow((value) => !value)}
      >
        {show ? "Hide" : "Show"}
      </span>
    </div>
  );
};

export default InputPassword;
