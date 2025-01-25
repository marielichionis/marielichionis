import { useFilePicker } from "use-file-picker";
import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";
import { format } from "date-fns";
import BlurryBlob from "../animata/Background/blurry-blob.tsx";
import FaqSection from "../animata/card/faq.tsx";
import "../styles/Upload.css";

import { Year, Data } from "../App.jsx";

export default function Upload() {
  const { json } = useContext(Data);
  console.log(json);
  return (
    <div>
      <BlurryBlob
        className="z-0 rounded-xl opacity-20"
        firstBlobColor="bg-purple-400"
        secondBlobColor="bg-blue-400"
      />

      <Uploading canUpload={json === null}></Uploading>
    </div>
  );
}

function Uploading({ canUpload }) {
  const { setjson } = useContext(Data);
  const { openFilePicker } = useFilePicker({
    accept: "watch-history.json",
    onFilesSuccessfullySelected: ({ filesContent }) => {
      console.log(filesContent[0]);
      const f = filesContent[0];
      const json = JSON.parse(f.content, function (key, value) {
        if (key === "time") {
          return new Date(value);
        } else if (key === "title") {
          return value.substring(8);
        } else {
          return value;
        }
      });
      //filter out deleted videos
      console.log(json);
      const d = json.filter((el) => el.subtitles !== undefined);
      console.log(d);
      setjson(d);
    },
  });

  if (canUpload) {
    return (
      <div>
        <div className="flex flex-col">
          <div class="relative but">
            <button class="relative btn" onClick={openFilePicker}>
              <div class="file">Select file</div>
            </button>
          </div>
          <FaqSection />
        </div>
      </div>
    );
  } else {
    return <ChooseAyear />;
  }
}

function ChooseAyear() {
  const { setYear, aYear } = useContext(Year);
  const { json } = useContext(Data);
  const minYear = json[json.length - 1].time.getFullYear();
  const years = [];

  for (let i = json[0].time.getFullYear(); i >= minYear; i--) {
    years.push(
      <Dropdown.Item key={i} onClick={() => setYear(i.toString())}>
        {i}
      </Dropdown.Item>
    );
  }
  if (aYear === null) {
    return (
      <div>
        <div class="relative but top-0 left-0 right-0 m-auto">
          <Dropdown class=" but">
            <Dropdown.Toggle className="!bg-buton-color">
              Pick Your Year
            </Dropdown.Toggle>
            <Dropdown.Menu>{years}</Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  } else {
    return <GoWrapped />;
  }
}

function GoWrapped() {
  const { json } = useContext(Data);
  const { aYear } = useContext(Year);
  console.log(useContext(Year));

  const data = json.filter((el) => format(new Date(el.time), "yyyy") === aYear);

  return (
    <div>
      <Navigate to="Wrapped" state={{ data, aYear, json }} />
    </div>
  );
}
