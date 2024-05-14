import { useState } from "react";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popup from "reactjs-popup";

//For barchart:
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "./ChartstylesWithSmallXnum";

import {
  MainContainerBig,
  ContainerBig,
  BarChartContainerBig,
  NumberBig,
  BlackLineBig,
  MakeBarBig
} from "./ChartstylesWithBigXnum";
import { add } from "@tensorflow/tfjs";

function Finance(props) {
  const { records, cash, setCash, items } = props;

  const [displayLength, setDisplayLength] = useState("SevenDays");

  function getCash() {
    // console.log(records);
    return records
      .map((record) => -record.cnt * record.price)
      .reduce((x, y) => x + y, 0);
  }

  function count_goods_value() {
    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        if (!acc[obj[property]]) {
          acc[obj[property]] = [];
        }
        acc[obj[property]].push(obj);
        return acc;
      }, {});
    }

    let records_by_id = groupBy(records, "Id");

    let temp = 0;

    const idss = items.map((item) => item.Id);

    for (let i = 0; i < idss.length; i++) {
      if (records_by_id[idss[i]] != undefined) {
        // for every good:

        let train_x = [];
        let train_y = [];
        let cnts = 0;

        for (let j = 0; j < records_by_id[idss[i]].length; j++) {
          let d1 = new Date(records_by_id[idss[i]][j].date);
          let d2 = new Date();

          train_x[j] = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
          train_y[j] = records_by_id[idss[i]][j].price;
          cnts = records_by_id[idss[i]][j].cnt + cnts;
        }

        let close_date = train_x[0];
        let close_date_id = 0;

        for (let w = 0; w < train_x.length; w++) {
          if (train_x[w] < close_date) {
            close_date = train_x[w];
            close_date_id = w;
          }
        }

        temp = temp + train_y[close_date_id] * cnts;
      }
    }

    return temp;
  }

  count_goods_value();

  function toDate(s) {
    let date = s.substring(8, 10);
    let year = s.substring(11, 15);
    let mon = s.substring(4, 7);

    if (mon === "Jan") {
      mon = "01";
    }
    if (mon === "Feb") {
      mon = "02";
    }
    if (mon === "Mar") {
      mon = "03";
    }
    if (mon === "Apr") {
      mon = "04";
    }
    if (mon === "May") {
      mon = "05";
    }
    if (mon === "Jun") {
      mon = "06";
    }
    if (mon === "Jul") {
      mon = "07";
    }
    if (mon === "Aug") {
      mon = "08";
    }
    if (mon === "Sep") {
      mon = "09";
    }
    if (mon === "Oct") {
      mon = "10";
    }
    if (mon === "Nov") {
      mon = "11";
    }
    if (mon === "Dec") {
      mon = "12";
    }
    return mon + "/" + date + "/" + year;
  }

  // date is a string
  function comparedate(a, b) {
    // if a>=b, return true
    let a_year = parseInt(a.substring(6, 10));

    let a_mon = parseInt(a.substring(0, 2));
    let a_day = parseInt(a.substring(3, 5));

    let b_year = parseInt(b.substring(6, 10));
    let b_mon = parseInt(b.substring(0, 2));
    let b_day = parseInt(b.substring(3, 5));

    if (a === "//" || b === "//") {
      return true;
    }

    if (a_year > b_year) {
      return true;
    }
    if (a_mon > b_mon && a_year === b_year) {
      return true;
    }
    return a_day >= b_day && a_mon === b_mon && a_year === b_year;
  }

  function getRecentSevenDaysRevenue() {
    var endDate = new Date();
    var beginDate = new Date(endDate);
    beginDate.setDate(beginDate.getDate() - 7);

    let begin = toDate(beginDate.toString());
    let end = toDate(endDate.toString());

    const days = [];

    for (let i = 0; i < 7; i++) {
      var nowDate = new Date(endDate);
      nowDate.setDate(endDate.getDate() - i);
      let now = toDate(nowDate.toString());
      days[6 - i] = now;
    }

    const revenue = days.map((day) => {
      return records
        .filter((record) => record.date === day && record.cnt < 0)
        .map((record) => -record.cnt * record.price)
        .reduce((x, y) => x + y, 0);
    });

    const maxx = revenue.reduce((x, y) => (x > y ? x : y));

    revenue.map((x) => x / maxx);

    return revenue;
  }

  function getRecentThirtyDaysRevenue() {
    var endDate = new Date();
    var beginDate = new Date(endDate);
    beginDate.setDate(beginDate.getDate() - 30);

    let begin = toDate(beginDate.toString());
    let end = toDate(endDate.toString());

    const days = [];

    for (let i = 0; i < 30; i++) {
      var nowDate = new Date(endDate);
      nowDate.setDate(endDate.getDate() - i);
      let now = toDate(nowDate.toString());
      days[29 - i] = now;
    }

    const revenue = days.map((day) => {
      return records
        .filter((record) => record.date === day && record.cnt < 0)
        .map((record) => -record.cnt * record.price)
        .reduce((x, y) => x + y, 0);
    });

    const maxx = revenue.reduce((x, y) => (x > y ? x : y));

    revenue.map((x) => x / maxx);

    return revenue;
  }

  function getBarChartWithSevenDays() {
    return (
      <Container>
        <MainContainer>
          {getRecentSevenDaysRevenue().map((x, i) => {
            return (
              <BarChartContainer key={i}>
                <Number color={"blue"}>${x}</Number>

                <MakeBar height={x / 20} colors={["black", "black"]} />
              </BarChartContainer>
            );
          })}
        </MainContainer>
        <BlackLine />
      </Container>
    );
  }

  function getBarChartWithOneMonth() {
    return (
      <ContainerBig className="BarChartBigBox">
        <MainContainerBig>
          {getRecentThirtyDaysRevenue().map((x, i) => {
            return (
              <BarChartContainerBig key={i}>
                <NumberBig color={"blue"}>${x}</NumberBig>

                <MakeBarBig height={x / 20} colors={["black", "black"]} />
              </BarChartContainerBig>
            );
          })}
        </MainContainerBig>
        <BlackLineBig />
      </ContainerBig>
    );
  }

  return (
    <>
      <div className="MainpageBox">
        <h1 className="StockText"> Finance </h1>
        <hr className="LineForMargin" />
        <h2> Revenue </h2>
        <h1 className="TotalCash"> Total Cash: ${getCash()} </h1>
        <h1 style={{ marginLeft: 850, marginTop: -40 }}>
          {" "}
          Stock value: ${count_goods_value()}{" "}
        </h1>
        <Stack style={{ marginTop: -40 }} spacing={2} direction="row">
          <Button
            onClick={() => setDisplayLength("SevenDays")}
            variant="contained"
          >
            7 days
          </Button>
          <Button
            onClick={() => setDisplayLength("OneMonth")}
            variant="contained"
          >
            1 month
          </Button>
        </Stack>
        {displayLength === "SevenDays"
          ? getBarChartWithSevenDays()
          : getBarChartWithOneMonth()}
      </div>
    </>
  );
}

export default Finance;
