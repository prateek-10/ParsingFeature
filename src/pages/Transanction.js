import React, { useState } from "react";
import * as XLSX from "xlsx";

const Transaction = ({ handleSavingsUpdate }) => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [savings, setSavings] = useState(0); // Add this line

  // onchange event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile({
            data: e.target.result,
          });
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile.data, {
        type: "buffer",
      });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const debitValues = data.reduce((acc, row) => {
        var debitKey;
        Object.keys(row).forEach((val) => {
          if (val.toLowerCase().includes("debit")) {
            debitKey = val;
          }
        });
        const debitValue = parseFloat(row[debitKey]);
        if (!isNaN(debitValue)) {
          acc.push(debitValue);
        }
        return acc;
      }, []);

      const creditValues = data.reduce((acc, row) => {
        var creditKey;
        Object.keys(row).forEach((val) => {
          if (val.toLowerCase().includes("credit")) {
            creditKey = val;
          }
        });
        const creditValue = parseFloat(row[creditKey]);
        if (!isNaN(creditValue)) {
          acc.push(creditValue);
        }
        return acc;
      }, []);

      const totalDebit = debitValues.reduce((acc, value) => acc + value, 0);
      const totalCredit = creditValues.reduce((acc, value) => acc + value, 0);

      const savings = (totalCredit - totalDebit) / 2;
      handleSavingsUpdate(savings);
      setSavings(savings); // Update the savings state variable
    }
  };

  return (
    <div
      className="wrapper"
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "140px",
      }}
    >
      <h3 style={{ color: "#44de7f" }}>Upload Your Account Statement</h3>
      {/* Display savings here */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input
          type="file"
          className="form-control"
          required
          onChange={handleFile}
        />
        <button type="submit" className="btn btn-success btn-md">
          UPLOAD
        </button>
        {typeError && (
          <div className="alert alert-danger" role="alert">
            {typeError}
          </div>
        )}
      </form>
      <h4 style={{ color: "#44de7f" }}>Savings: {savings * 2}</h4>{" "}
    </div>
  );
};

export default Transaction;
