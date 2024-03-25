type Props = {
  display: string;
  value: (value: string) => void;
};

const InputText = (props: Props) => {
  return (
    <input
      id={props.display}
      onChange={(e) => props.value(e.target.value)}
      type="text"
      className="p-2 border-2 border-gray-300 rounded-md outline-none focus-within:border-gray-400 bg-slate-100 w-full focus:placeholder:-translate-y-[8px] focus:placeholder:text-[12px] placeholder:transition-all placeholder:font-light placeholder:text-[14px] placeholder:text-gray-600"
      placeholder={props.display}
    />
  );
};

export default InputText;
