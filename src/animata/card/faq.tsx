"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import IMG_2970 from "../../img/IMG_2970.png";
import IMG_6292 from "../../img/IMG_6292.png";

import * as Accordion from "@radix-ui/react-accordion";

export default function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div
      className=" flex justify-center mx-auto relative max-w-md rounded-lg mt-32"
      style={{ maxWidth: "700px", minWidth: "700px" }}
    >
      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        <>
          <Accordion.Item value="1" key="1" className="mb-2">
            <Accordion.Header>
              <Accordion.Trigger
                className="flex w-full items-center justify-center gap-x-4"
                style={{ width: "100%" }}
              >
                <div
                  className="relative flex items-center space-x-2 rounded-xl bg-gray-100 p-2 hover:bg-[#E0F7FA]"
                  style={{
                    backgroundColor: openItem === "1" ? "#E0F7FA" : "",
                  }}
                >
                  <span className="font-medium text-gray-700">
                    Where do i get my data file?
                  </span>
                </div>

                <span className="cursor-pointer text-lg font-bold text-gray-400">
                  {openItem === "1" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#7CB9E8"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount style={{ display: "block" }}>
              <motion.div
                initial="collapsed"
                animate={openItem === "1" ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  className="ml-0 mt-1 rounded-lg  text-white md:ml-16"
                  style={{
                    borderRadius: "12px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div className="relative max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    first, go to{" "}
                    <a
                      className="text-white"
                      href="https://takeout.google.com/"
                    >
                      Google Takeout
                    </a>{" "}
                    and login.
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>
                  <div className="relative mt-1 max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    we will create a new export. under "Select data to include",
                    toggle on the "Deselect all" button. then, scroll to the
                    very end and select "YouTube and YouTube Music"
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>
                  <div className="relative mt-1 max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    click on "Multiple formats" and change "History" format to
                    JSON. then click on "All Youtube data included and only
                    select "History" it should look like this:
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>

                  <div className="relative mt-1 max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    <img src={IMG_2970} alt="" />
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>
                  <div className="relative mt-1 max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    <img src={IMG_6292} alt="" />
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>
                  <div className="relative mt-1 max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    then finish creating the export and wait for their email.
                    When u have it, come back here and import your
                    "watch-history.json" file
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="2" key="2" className="mb-2">
            <Accordion.Header>
              <Accordion.Trigger
                className="flex w-full items-center justify-center gap-x-4"
                style={{ width: "100%" }}
              >
                <div
                  className="relative flex items-center space-x-2 rounded-xl bg-gray-100 p-2 hover:bg-[#E0F7FA]"
                  style={{
                    backgroundColor: openItem === "2" ? "#E0F7FA" : "",
                  }}
                >
                  <span className="font-medium text-gray-700">
                    What happens to my data?
                  </span>
                </div>

                <span className="cursor-pointer text-lg font-bold text-gray-400">
                  {openItem === "2" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#7CB9E8"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount style={{ display: "block" }}>
              <motion.div
                initial="collapsed"
                animate={openItem === "2" ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%", overflow: "hidden" }}
              >
                <div
                  className="ml-7 mt-1 rounded-lg p-3 text-white md:ml-16"
                  style={{
                    borderRadius: "12px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div className="relative max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    your "watch-history.json" is not stored on any server and i
                    do not have access to it.
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[30px] border-t-[30px] -rotate-12 border-l-transparent border-t-blue-500" />
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        </>
      </Accordion.Root>
    </div>
  );
}
