"use client";

import React, { ReactNode } from "react";
import { useModal } from "./ModalProvider";
import { MdOutlineCancel } from "react-icons/md";

type Props = {
  ModalTitle: string;
  ModalBody: ReactNode;
};

export default function Modal(props: Props) {
  const { setOpen } = useModal();
  return (
    <article className="fixed top-0 left-0 grid w-full min-h-screen bg-black z-[99999] bg-opacity-40 px-3">
      <MdOutlineCancel
        className="absolute text-4xl top-0 right-0 m-2 text-white rounded-full"
        onClick={() => setOpen(false)}
      />
      <section className="m-auto bg-white w-full max-w-lg rounded-md ">
        <h6 className="text-lg font-semibold text-center p-3">
          {props.ModalTitle}
        </h6>
        <hr className="border-t-2" />
        <div className="p-3">{props.ModalBody}</div>
      </section>
    </article>
  );
}
