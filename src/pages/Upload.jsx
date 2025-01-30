import { useFilePicker } from "use-file-picker";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";
import { format } from "date-fns";
import BlurryBlob from "../animata/Background/blurry-blob.tsx";
import FaqSection from "../animata/card/faq.tsx";
import "../styles/Upload.css";
import { ArrowRight } from "lucide-react";
import { Year, Data } from "../App.jsx";

export default function Upload() {
  const { json } = useContext(Data);

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
      const f = filesContent[0];
      const json = JSON.parse(f.content, function (key, value) {
        if (key === "time") {
          return new Date(value);
        } else if (key === "title") {
          return value.match("Watched (.*) || Vous avez regardé (.*)")[1];
        } else {
          return value;
        }
      });
      //filter out deleted videos and ads
      const d = json.filter(
        (el) => el.subtitles !== undefined && el.activityControls.length === 1
      );
      setjson(d);
    },
  });

  const sampleclick = () => {
    const sample = require("../watch-history.json");
    const j = JSON.parse(JSON.stringify(sample), function (key, value) {
      if (key === "time") {
        return new Date(value);
      } else if (key === "title") {
        return value.substring(8);
      } else {
        return value;
      }
    });
    const d = j.filter(
      (el) => el.subtitles !== undefined && el.activityControls.length === 1
    );
    setjson(d);
  };

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
        <div className="flex place-content-end px-10">
          <button
            className={`group relative rounded-full border border-white p-2 text-xl font-semibold`}
            onClick={sampleclick}
            style={{ boxshadow: "0 5px 40px #bfd2ff" }}
          >
            <div
              className="absolute left-0 top-0 flex h-full w-11 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full"
              style={{ backgroundColor: "#bfd2ff" }}
            >
              <span className="mr-3 text-white transition-all duration-200 ease-in-out">
                <ArrowRight size={20} />
              </span>
            </div>
            <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold  text-[#bfd2ff] transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
              Use sample file
            </span>
          </button>
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

  const data = json.filter((el) => format(new Date(el.time), "yyyy") === aYear);

  return (
    <div>
      <Navigate to="Wrapped" state={{ data, aYear, json }} />
    </div>
  );
}
