import { useFilePicker } from "use-file-picker";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";
import { format } from "date-fns";

import "../styles/Upload.css";

function Upload() {
  const [year, setYear] = useState(null);
  const [json, setjson] = useState("");
  //useScript(process.env.PUBLIC_URL);

  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: "watch-history.json",
    onFilesSuccessfullySelected: ({ filesContent }) => {
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
      setjson(json);
    },
  });

  if (loading) {
    // use <Suspense> fallback={<Loading/>}>
    return <div class="loader">Loading...</div>;
  } else if (filesContent.length > 0) {
    //Year selection
    const minYear = json[json.length - 1].time.getFullYear();
    const years = [];

    for (let i = json[0].time.getFullYear(); i >= minYear; i--) {
      years.push(
        <Dropdown.Item key={i} onClick={() => setYear(i.toString())}>
          {i}
        </Dropdown.Item>
      );
    }
    if (year != null) {
      // filter the year
      const data = json.filter(
        (el) =>
          format(new Date(el.time), "yyyy") === year &&
          el.subtitles !== undefined
      );

      console.log(data);

      return (
        <div>
          {<Navigate to="/Wrapped" state={{ data, year }} replace={true} />}
        </div>
      );
    } else {
      return (
        // chose your year dropdown
        <div class="but">
          <Dropdown class="but">
            <Dropdown.Toggle>Pick Your Year</Dropdown.Toggle>
            <Dropdown.Menu>{years}</Dropdown.Menu>
          </Dropdown>
        </div>
      );
    }

    // start page
  } else {
    return (
      <div>
        <div class="blur">
          <div class="blob"></div>
        </div>
        <div class="but">
          <button class="btn" onClick={openFilePicker}>
            <div class="file">Select file</div>
          </button>
        </div>
      </div>
    );
  }
  // goes to Wrapped passing watch-history as a state
}

export default Upload;
