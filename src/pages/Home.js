import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import money from "../assets/money.jpg";
import Transaction from "./Transanction";

const Balance = ({ balance }) => {
  return (
    <div>
      <Typography
        style={{
          textAlign: "center",
          fontFamily: "Inter",
          display: "flex",
          alignItems: "center",
          fontSize: "30px",
          marginLeft: "100px",
          fontWeight: "",
          color: "#44de7f",
          marginTop: "2px",
        }}
      >
        BALANCE <br />
        {balance}
      </Typography>
    </div>
  );
};

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [savings, setSavings] = useState(0);
  const [isSavingsAdded, setIsSavingsAdded] = useState(false);

  // Function to calculate total balance
  const calculateTotalBalance = () => {
    const totalBalance = balance + savings;
    return totalBalance;
  };

  // Function to handle input submission
  const handleInputSubmit = (event) => {
    event.preventDefault();
    const inputValueNumber = parseInt(inputValue);
    const updatedBalance = isNaN(inputValueNumber)
      ? balance
      : inputValueNumber + balance;
    const totalBalance = updatedBalance + savings;
    setBalance(updatedBalance);
    setInputValue("");
  };

  // Function to format date
  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Custom input component for DatePicker
  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      style={{
        borderRadius: "15px",
        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
        height: "40px",
        border: "none",
        fontSize: "20px",
        paddingLeft: "85px",
      }}
      value={formatDate(selectedDate)}
      onClick={onClick}
    />
  );

  // Update balance when savings change
  useEffect(() => {
    if (isSavingsAdded) {
      setBalance(balance + savings);
      setIsSavingsAdded(false);
    }
  }, [savings]);

  return (
    <div>
      <img
        src={money}
        alt=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          filter: "brightness(50%)",
          zIndex: -1,
        }}
      />
      <div style={{ marginTop: "0px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "20px",
            zIndex: 10,
          }}
        >
          <img
            src={logo}
            alt=""
            style={{ height: "80px", cursor: "pointer" }}
          ></img>
          <Box
            sx={{
              height: "110px",
              width: "300px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "250px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Balance balance={calculateTotalBalance()} />
          </Box>
          <div style={{ marginLeft: "200px" }}>
            <label
              htmlFor="datePicker"
              style={{
                fontFamily: "Inter",
                fontSize: "27px",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                color: "#44de7f",
              }}
            >
              SELECT DATE
            </label>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd MM yyyy"
              customInput={<CustomInput />}
            />
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
            marginLeft: "100px",
          }}
        >
          <form onSubmit={handleInputSubmit}>
            <label
              htmlFor="inputBalance"
              style={{
                fontSize: "30px",
                marginRight: "20px",
                color: "#44de7f",
              }}
            >
              Input Savings/Expenditure:
            </label>
            <input
              style={{
                borderRadius: "15px",
                boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.1)",
                width: "300px",
                height: "50px",
                fontSize: "20px",
                paddingLeft: "85px",
              }}
              type="number"
              id="inputBalance"
              onChange={(event) => setInputValue(event.target.value)}
              inputmode="numeric"
            />
            <button
              type="submit"
              style={{
                marginLeft: "30px",
                height: "50px",
                width: "200px",
                borderRadius: "30px",
              }}
            >
              Update Balance
            </button>
          </form>
        </div>
        {selectedDate?.getDate() === 1 && (
          <Transaction
            handleSavingsUpdate={(newSavings) => {
              setSavings(newSavings);
              setIsSavingsAdded(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
