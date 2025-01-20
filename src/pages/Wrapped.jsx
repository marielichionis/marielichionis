import "../styles/Wrapped.css";
import { useLocation } from "react-router-dom";
import GibberishText from "../animata/text/gibberish-text.tsx";
import TypingText from "../animata/text/typing-text.tsx";
import Counter from "../animata/text/counter.tsx";

import Reminder from "../animata/Widget/reminder.tsx";
import * as React from "react";
import BlurryBlob from "../animata/Background/blurry-blob.tsx";

import AnimatedTimelinePage from "../animata/card/animated-timeline.tsx";
import ScrollReveal from "../animata/text/scroll-reveal.tsx";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Wrapped() {
  const location = useLocation();
  const [activeSeries, setActiveSeries] = React.useState([]);
  console.log(location.state);
  if (location.state === null) {
    return (
      // does not work
      <div className="warning">
        <p>Please upload a file first</p>
      </div>
    );
  }
  const data = location.state.data;
  const year = location.state.year;

  if (data === undefined) {
    return (
      // does not work
      <div className="warning">
        <p>Please upload a file first</p>
      </div>
    );
  } else {
    const top = calculate(data);
    const info = generalStats(data);

    console.log(info.topMonths);

    const events = [];
    for (let i = 1; i <= 12; i++) {
      events.push({
        id: String(i),
        title: months[i - 1],
        description: `${info.topMonths[i - 1].inf[0]} watched ${
          info.topMonths[i - 1].inf[1]
        } times`,
        hour: info.topMonths[i - 1].topH,
      });
    }
    return (
      <div className="bod scroll-smooth">
        <section className="">
          <BlurryBlob
            className="z-0 rounded-xl opacity-20"
            firstBlobColor="bg-purple-400"
            secondBlobColor="bg-blue-400"
          />
          <div>
            <TypingText
              text={`Your ${year} Youtube Wrapped!`}
              waitTime={4000}
            />
          </div>
        </section>

        <section>
          <GibberishText
            className="text-6xl"
            text={`You watched ${data.length} videos this year...`}
          />
        </section>

        <section>
          <ScrollReveal className="md:text-6xl px-10 text-blue-200 dark:text-blue-800">
            You watched youtube <Counter targetValue={info.tot} /> days in 2024.
            You watched {info.avg} videos per day on average! You are mostly on
            Youtube around {info.hours[0][0]}h. Your most active day was{" "}
            {info.mostDay[0]} where you watched {info.mostDay[1]} videos.
          </ScrollReveal>
        </section>
        {/* Bar chart of hour distribution */}

        {/* Most watched vid */}

        <section>
          <ScrollReveal className=" px-10 md:text-6xl text-blue-200 dark:text-blue-800">
            Your most watched video is {top.vid[0].vid}. You watched it{" "}
            {top.vid[0].count} times.
          </ScrollReveal>
        </section>
        {/* Top 10 watched vid */}
        <section>
          <p className="intro text-6xl">
            Here is your top 10 most watched videos:{" "}
          </p>
          <ol>
            {top.vid.map((v) => (
              <motion.div
                initial={{ y: 4, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 2 }}
              >
                <li key={v.vid}>
                  {v.vid} ({v.count} watches)
                </li>
              </motion.div>
            ))}
          </ol>
        </section>

        <section>
          <ScrollReveal className="intro px-10 text-blue-200 dark:text-blue-800">
            Your most watched youtube channel is {top.chan[0].channel}. You
            watched {top.top10[0].diffVids} of their videos for a total of{" "}
            {top.chan[0].count} times. You peaked in {top.top10[0].month} when
            you their videos {top.top10[0].num} times. You mostly watch these
            videos around {top.top10[0].hh[0][0]}h.
          </ScrollReveal>
        </section>

        <p className="intro text-6xl pt-10 pl-10">
          Here is your top 10 most watched channels:{" "}
        </p>
        <p className="pl-10">
          Select the channels you would like to view your watch evolution
          through {year}!
        </p>

        <div className="z-10 flex pl-10">
          <Reminder
            chan={top.chan}
            arr={top.arr}
            activeSeries={activeSeries}
            setActiveSeries={setActiveSeries}
          />
          <LineGraph arr={top.arr} activeSeries={activeSeries} />
        </div>
        {/* Most channel every month */}

        <AnimatedTimelinePage
          containerClassName=""
          customEventRender={() => {}}
          events={events}
          initialActiveIndex={-1}
          timelineStyles={{
            activeDotColor: "#22c55e",
            activeLineColor: "#22c55e",
            dateColor: "inherit",
            descriptionColor: "white",
            dotColor: "#d1d5db",
            dotSize: "1rem",
            lineColor: "#d1d5db",
            titleColor: "white",
          }}
          title={`${year} Timeline`}
        />
      </div>
    );
  }
}
function showLabel(e, top) {
  console.log(e);
  const i = Number(e.id) - 1;
  document.getElementById(e.id).innerHTML =
    "You mostly watch these videos around " + top.top10[i].hh[0][0] + " h.";
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// dictionary of channels with video id of each
function LineGraph({ arr, activeSeries }) {
  //list
  const chanList = Object.getOwnPropertyNames(arr[0]);
  const colors = [
    "#8884d8",
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7",
  ];

  // all lines
  const lines = [];
  for (let i = 1; i <= 10; i++) {
    const chan = chanList[i];

    lines.push(
      <Line
        hide={!activeSeries.includes(chan)}
        type="monotone"
        dataKey={chan}
        stroke={colors[i - 1]}
      >
        <LabelList position="top" offset={10} />
      </Line>
    );
  }

  return (
    <ResponsiveContainer width={"100%"} height={450}>
      <LineChart
        id="graph"
        data={arr}
        margin={{
          right: 50,
          left: 50,
          top: 50,
        }}
      >
        <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
        <YAxis
          label={{
            offset: 10,
            position: "insideTopRight",
            value: "Nb of watches",
          }}
        />

        <Legend />
        {lines}
      </LineChart>
    </ResponsiveContainer>
  );
}

function calculate(data) {
  /*returns 
  # top 10 most watched videos
  # top 10 most watched channels
  # Object of all videos
  #  favyoutuber() data for all top 10 channels
  */

  const vidCount = {};
  const videos = {};
  const channelCount = {};
  //parse data
  for (let i in data) {
    const v = data[i];

    //use a fetch for metadata
    const channel = v.subtitles[0].name;
    const month = v.time.getMonth();
    const hour = v.time.getHours();
    const day = v.time.getDay();

    if (videos[v.title] === undefined) {
      videos[v.title] = {
        count: 1,
        month: month,
        hour: hour,
        day: day,
        channel: channel,
        url: v.titleUrl,
      };
    } else {
      videos[v.title].count = videos[v.title].count + 1;
    }

    vidCount[v.title] = (vidCount[v.title] || 0) + 1;
    channelCount[channel] = (channelCount[channel] || 0) + 1;
  }
  const sortedVid = Object.entries(vidCount).sort((a, b) => b[1] - a[1]);
  const sortedChan = Object.entries(channelCount).sort((a, b) => b[1] - a[1]);

  const vid = sortedVid.slice(0, 10).map(([vid, count]) => ({ vid, count }));
  const chan = sortedChan
    .slice(0, 10)
    .map(([channel, count]) => ({ channel, count }));

  // transform data for line graph
  const top10 = [];
  chan.forEach((e) => top10.push(favYoutuber(data, e.channel)));

  //first parse by month
  const df = Object.entries(
    Object.groupBy(
      top10.map((item) => item.d.value()).flat(),
      ({ month }) => month
    )
  );
  // then put in right format for graph
  const arr = [];
  df.forEach((m) => {
    const my = { month: m[0] };
    m[1].forEach((y) =>
      Object.defineProperty(my, String(y.name), { value: y.times })
    );
    arr.push(my);
  });

  //sort videos
  // sort channels
  return { vid, chan, top10, arr };
}
function youtuber(data, channel) {
  const you = favYoutuber(data, channel);
  return you.hh[0][0];
}

function favYoutuber(data, channel) {
  /*returns 
  # nb of different viewed videos
  # month most watched this channel
  # nb their videos watched that month
  # most active hour 
  */
  const vids = data.filter((el) => el.subtitles[0].name === channel);

  const dif = Object.groupBy(vids, ({ title }) => title);

  const diffVids = Object.keys(dif).length;
  //month

  const mon = Object.entries(
    Object.groupBy(vids, ({ time }) => time.getMonth())
  );
  const m = mon.map((el) => [Number(el[0]), el[1].length]);
  const s = m.sort((a, b) => b[1] - a[1]);
  const num = s[0][1];
  const month = months[s[0][0]];
  //console.log(s);

  //hour
  const hou = Object.entries(
    Object.groupBy(vids, ({ time }) => time.getHours())
  );

  const h = hou.map((el) => [Number(el[0]), el[1].length]);
  const hh = h.sort((a, b) => b[1] - a[1]);
  const hourPmonth = hh.map((el) => el[1]);

  const d = new yout(channel);

  s.forEach((e) => {
    var x = months[e[0]];
    d[x] = e[1];
  });

  //nb max
  return { diffVids, month, num, hh, d };
}

function generalStats(data) {
  //most active day
  const days = Object.entries(
    Object.groupBy(data, ({ time }) => time.toDateString())
  )
    .map((el) => [el[0], el[1].length])
    .sort((a, b) => b[1] - a[1]);
  const mostDay = days[0];
  const tot = days.length;

  //average videos per day and hours watched
  const avg = data.length / days.length;

  // most active hour
  const hours = Object.entries(
    Object.groupBy(data, ({ time }) => time.getHours())
  )
    .map((el) => [Number(el[0]), el[1].length])
    .sort((a, b) => b[1] - a[1]);

  const m = Object.entries(Object.groupBy(data, ({ time }) => time.getMonth()));
  let i = 0;
  const topMonths = [];

  while (i < m.length) {
    const l = m[i][1];

    const mmm = Object.entries(
      Object.groupBy(l, ({ subtitles }) => subtitles[0].name)
    )
      .map((el) => [el[0], el[1].length])
      .sort((a, b) => b[1] - a[1]);
    const topHour = youtuber(data, mmm[0][0]);
    topMonths.push({ inf: mmm[0], topH: topHour });

    i++;
  }
  return { tot, mostDay, avg, hours, topMonths };
}

function yout(name) {
  // nb of videos watched of this channel every month
  // in form of data for line graph
  this.name = name;
  this.January = 0;
  this.February = 0;
  this.March = 0;
  this.April = 0;
  this.May = 0;
  this.June = 0;
  this.July = 0;
  this.August = 0;
  this.September = 0;
  this.October = 0;
  this.November = 0;
  this.December = 0;

  this.value = function () {
    const ar = [];
    months.forEach((e) =>
      ar.push({ month: e, name: this.name, times: this[e] })
    );
    return ar;
  };
}

export default Wrapped;
