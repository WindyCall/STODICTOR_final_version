import { useState } from "react";
import Modal from "react-modal";
import CategoryList from "./CategoryList";
import DatePicker from "react-datepicker";
import { AiTwotoneDatabase } from "react-icons/ai";
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
import Button from "@mui/material/Button";

function Record(props) {
  const {
    record,
    idx,
    onDeleteRecord,
    categories,
    onUpdateRecord,
    toDate,
    columns,
    setIsTableHeaderDisplay
  } = props;

  const [updateRecordId, setUpdateRecordId] = useState(record.Id);
  const [updateRecordName, setUpdateRecordName] = useState(record.name);
  const [updateRecordCategory, setUpdateRecordCategory] = useState(
    record.category
  );
  const [updateRecordDate, setUpdateRecordDate] = useState("");
  const [updateRecordPrice, setUpdateRecordPrice] = useState(record.price);
  const [updateRecordCnt, setUpdateRecordCnt] = useState(record.cnt);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [recordCnt, setRecordCnt] = useState(record.cnt);

  function openModal() {
    setIsModalOpen(true);
    setIsTableHeaderDisplay(false);
    setUpdateRecordId(record.Id);
    setUpdateRecordName(record.name);
    setUpdateRecordCategory(record.category);
    setUpdateRecordDate("");
    setUpdateRecordPrice(record.price);
    setUpdateRecordCnt(record.cnt);
  }

  function closeModal() {
    setUpdateRecordId(record.Id);
    setUpdateRecordName(record.name);
    setUpdateRecordCategory(record.category);
    setUpdateRecordDate("");
    setUpdateRecordPrice(record.price);
    setUpdateRecordCnt(record.cnt);
    setIsModalOpen(false);
    setIsTableHeaderDisplay(true);
  }

  function getSubmitDate() {
    if (updateRecordDate === "") return record.date;
    else return toDate(updateRecordDate.toString());
  }

  function getCntDisplay() {
    if (record.cnt > 0) return "+" + record.cnt;
    else return "- " + -record.cnt;
  }

  /*
{rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
  */

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      {columns.map((column) => {
        const value = record[column.id];
        return (
          <TableCell sx={{ height: 20 }} key={column.id} align={column.align}>
            <strong>{column.id == "cnt" ? getCntDisplay() : value}</strong>
          </TableCell>
        );
      })}
      <TableCell>
        <Button
          variant="contained"
          onClick={openModal}
          className="btn btn-primary btn-sm m-2"
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onDeleteRecord(record)}
          style={{ margin: "0 1rem" }}
        >
          {" "}
          Delete{" "}
        </Button>
      </TableCell>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "pink"
          },
          content: {
            top: "80px",
            left: "300px",
            right: "300px",
            bottom: "80px",
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "lightblue"
          }
        }}
      >
        <h2 className="UpdateRecord">Update Record</h2>
        <div className="ModalText">
          <strong>ID</strong>
          <br />
          <input
            className="UpdateInput"
            value={updateRecordId}
            onChange={(e) => setUpdateRecordId(e.target.value)}
            type="text"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
          <br />
          <br />
          <strong>Name</strong>
          <br />
          <input
            value={updateRecordName}
            onChange={(e) => setUpdateRecordName(e.target.value)}
            type="text"
            className="UpdateInput"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
          <br />
          <br />
          <CategoryList
            updateRecordCategory={updateRecordCategory}
            setUpdateRecordCategory={setUpdateRecordCategory}
            categories={categories}
            position="UpdateRecord"
          />
          <br />
          <div>
            <strong>Date</strong>
            <br />
            <DatePicker
              className="UpdateInput"
              placeholderText={record.date}
              selected={updateRecordDate}
              onChange={(date) => setUpdateRecordDate(date)}
            />
            <br />
            <br />
            <strong>Price</strong>
            <br />
            <input
              value={updateRecordPrice}
              onChange={(e) => setUpdateRecordPrice(e.target.value)}
              type="text"
              className="UpdateInput"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
            <br />
            <br />
            <strong>Count</strong>
            <br />
            <input
              value={updateRecordCnt}
              onChange={(e) => setUpdateRecordCnt(e.target.value)}
              type="text"
              className="UpdateInput"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                onUpdateRecord(
                  record,
                  updateRecordId,
                  updateRecordName,
                  updateRecordCategory,
                  getSubmitDate(),
                  updateRecordPrice,
                  updateRecordCnt,
                  recordCnt
                );
                closeModal();
              }}
            >
              Confirm
            </Button>{" "}
            <Button variant="contained" color="error" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </TableRow>
  );
}

export default Record;
