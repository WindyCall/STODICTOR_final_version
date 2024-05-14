import { useState } from "react";
import CategoryList from "./CategoryList";
import Record from "./Record";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: "white"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

export const columns = [
  { id: "Id", label: "ID.", minWidth: 150 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "price",
    label: "Price",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "cnt",
    label: "Count",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2)
  },
  {
    id: "date",
    label: "Date",
    minWidth: 150,
    align: "center",
    format: (value) => value.toFixed(2)
  }
];

/*
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


*/
function createData(Id, category, name, price, cnt, date) {
  return { Id, category, name, price, cnt, date };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263, "2002/11/21"),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767)
];

function OverallHistory(props) {
  const { onDeleteRecord, records, categories, onUpdateRecord } = props;

  const [searchRecordId, setSearchRecordId] = useState("");
  const [searchRecordCategory, setSearchRecordCategory] = useState("");
  const [searchRecordName, setSearchRecordName] = useState("");
  const [searchRecordStartDate, setSearchRecordStartDate] = useState("");
  const [searchRecordEndDate, setSearchRecordEndDate] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [isTableHeaderDisplay, setIsTableHeaderDisplay] = useState(true);

  const [value, onChange] = useState(new Date());

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function comparedate1(a, bb) {
    if (bb === null) {
      return true;
    }
    const b = toDate(bb.toString());
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

  function comparedate2(aa, b) {
    if (aa === null) {
      return true;
    }
    const a = toDate(aa.toString());
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

  function getValidRecords() {
    const forTest = records;
    /*const validRecords = records.map((record) => {
      return {
        Id: record.Id,
        category: record.category,
        cnt: record.cnt,
        date: record.date,
        name: record.name,
        price: record.price,
        isChosen:
          (searchRecordCategory === "" ||
            record.category === searchRecordCategory) &&
          record.Id.includes(searchRecordId) &&
          record.name.toLowerCase().includes(searchRecordName.toLowerCase()) &&
          comparedate1(record.date, searchRecordStartDate) &&
          comparedate2(searchRecordEndDate, record.date)
      };
    });*/
    return records.filter((record) => {
      return (
        (searchRecordCategory === "" ||
          record.category === searchRecordCategory) &&
        record.Id.includes(searchRecordId) &&
        record.name.toLowerCase().includes(searchRecordName.toLowerCase()) &&
        comparedate1(record.date, searchRecordStartDate) &&
        comparedate2(searchRecordEndDate, record.date)
      );
    });
  }

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

  function getValidAveragePrice() {
    const totalPrice = getValidRecords()
      .map((record) => record.price)
      .reduce((x, y) => x + y, 0);
    const num = totalPrice / getValidRecords().length;
    return num.toFixed(2);
  }

  function getValidAverageCnt() {
    const totalCnt = getValidRecords()
      .map((record) => record.cnt)
      .reduce((x, y) => x + y, 0);
    const num = totalCnt / getValidRecords().length;
    return num.toFixed(1);
  }

  function getOriginalTable() {
    return (
      <table style={{ margin: "0 auto", width: "100%" }}>
        <thead>
          <tr>
            <th>ID.</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Cnt</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {getValidRecords().map((record, index) => {
            return (
              <Record
                columns={columns}
                toDate={toDate}
                onUpdateRecord={onUpdateRecord}
                categories={categories}
                onDeleteRecord={onDeleteRecord}
                key={index}
                record={record}
                idx={index}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="MainpageBox">
      <h2 className="OverallHistory"> Overrall History </h2>
      <Stack direction="row" spacing={2}>
        <strong> StartDate </strong>
        <DatePicker
          placeholderText="Choose start date"
          selected={searchRecordStartDate}
          onChange={(date) => setSearchRecordStartDate(date)}
        />
        <strong> EndDate </strong>
        <DatePicker
          placeholderText="Choose end date"
          selected={searchRecordEndDate}
          onChange={(date) => setSearchRecordEndDate(date)}
        />
      </Stack>
      <br />
      <Stack direction="row" spacing={2}>
        <strong> ID </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchRecordId}
          onChange={(e) => setSearchRecordId(e.target.value)}
          placeholder="Input ID here"
        />
        <strong> Name </strong>
        <input
          style={{ margin: "0 1rem" }}
          type="text"
          value={searchRecordName}
          onChange={(e) => setSearchRecordName(e.target.value)}
          placeholder={"Search here"}
        />
        <CategoryList
          searchRecordCategory={searchRecordCategory}
          setSearchRecordCategory={setSearchRecordCategory}
          position="SearchRecord"
          categories={categories}
        />
      </Stack>

      <br />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {isTableHeaderDisplay ? (
                  columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ height: 30 }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))
                ) : (
                  <></>
                )}
                {isTableHeaderDisplay ? (
                  <StyledTableCell key="operation" align="center">
                    Operation
                  </StyledTableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {getValidRecords()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record, index) => {
                  return (
                    <Record
                      setIsTableHeaderDisplay={setIsTableHeaderDisplay}
                      columns={columns}
                      toDate={toDate}
                      onUpdateRecord={onUpdateRecord}
                      categories={categories}
                      onDeleteRecord={onDeleteRecord}
                      key={index}
                      record={record}
                      idx={index}
                    />
                  );
                })}
            </TableBody>
          </Table>
          {getValidRecords().length === 0 ? (
            <h1 style={{ marginLeft: 520 }}> No records found </h1>
          ) : (
            <></>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={getValidRecords().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <strong className="AverageValue">
        {" "}
        Average Price: {getValidAveragePrice()}
        {"  "}
      </strong>
      <strong className="AverageValue">
        {" "}
        Average Count: {getValidAverageCnt()}{" "}
      </strong>
    </div>
  );
}

export default OverallHistory;
