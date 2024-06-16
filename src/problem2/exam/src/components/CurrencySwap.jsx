import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { dataValueAccount } from "./DataAccount";

const CurrencySwap = () => {
  const inputInitial = "";
  const [tokens, setTokens] = useState([]);
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [fromInput, setFromInput] = useState(inputInitial);
  const [wallet, setWallet] = useState(dataValueAccount);
  const [myMoney, setMyMoney] = useState(wallet[0]);
  const rate = from.price / to.price;
  const inputRef = useRef("to");

  useEffect(() => {
    axios
      .get("https://interview.switcheo.com/prices.json")
      .then((res) => {
        setTokens(res.data);
        setFrom(res.data[0]);
        setTo(res.data[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleFrom = (e) => {
    const selectedMoney = JSON.parse(e.target.value);
    setFrom(selectedMoney);
    document.getElementById("focusInput").focus();
  };

  const handleTo = (e) => {
    const selectedMoney = JSON.parse(e.target.value);
    setTo(selectedMoney);
  };

  function formatMoney(value) {
    return Number(value).toFixed(2);
  }

  const handleChangeTo = (e) => {
    setFromInput(e.target.value);
    inputRef.current = "to";
  };

  const handleChangeFrom = (e) => {
    setFromInput(e.target.value / rate);
    inputRef.current = "from";
  };

  const handleAccount = () => {
    if (
      from.currency === myMoney.name &&
      myMoney.amount >= fromInput &&
      to.currency !== from.currency
    ) {
      const indexDeduction = wallet.findIndex(
        (money) => money.name === myMoney.name
      );
      const indexIncrease = wallet.findIndex(
        (money) => money.name === to.currency
      );
      setWallet((prv) => {
        //set value money from (up)
        const newWallet = [...prv];
        newWallet[indexDeduction] = {
          ...newWallet[indexDeduction],
          amount: newWallet[indexDeduction].amount - formatMoney(fromInput),
        };
        // set value money to (down)
        newWallet[indexIncrease] = {
          ...newWallet[indexIncrease],
          amount:
            newWallet[indexIncrease].amount +
            Number(formatMoney(fromInput * rate)),
        };
        return newWallet;
      });
      setMyMoney({ ...myMoney, amount: myMoney.amount - fromInput });
      alert("Successful currency exchange");
      setFromInput(inputInitial);
      document.getElementById("focusInput").focus();
    } else {
      if (from.currency !== myMoney.name) {
        alert("You don't have that coin in your wallet");
        return;
      }
      if (myMoney.amount < fromInput) {
        alert("you don't have enough money");
        return;
      }
      if (to.currency === from.currency) {
        alert("Two currencies exchanged at the same unit of currency");
        return;
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-[24px] px-3 py-2 rounded-xl bg-[#191326] relative">
        <div className="cursor-pointer hover:text-[rgba(244,238,255,0.7)] open-popUp">
          <i className="fa-solid fa-wallet"></i>
          <ul className="popUp hidden absolute bg-[#383241] border-2 border-[] bg- w-[100px] h-[100px]">
            {wallet.map((money, index) => {
              return (
                <>
                  <li
                    onClick={(e) => {
                      setMyMoney(money);
                    }}
                    className="hover:bg-[#08060b] text-[#e5e7eb] text-sm p-1"
                    key={index}
                  >
                    {money.name}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-end items-center text-sm">
          <i className="fa-solid fa-user"></i>
          <p className="ml-3 mr-1">{myMoney.amount}</p>
          <span>{myMoney.name}</span>
        </div>
      </div>
      <form action="">
        <div className="hover:opacity-70 mt-2 mb-2 w-[50%]">
          <i className="fa-solid fa-magnifying-glass-dollar"></i>
          <select className="ml-1 cursor-pointer" onChange={handleFrom}>
            {tokens.map((money, index) => {
              return (
                <>
                  <option key={index} value={JSON.stringify(money)}>
                    {money.currency}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <input
          id="focusInput"
          className=" w-full rounded-lg"
          type="number"
          value={inputRef.current === "to" ? fromInput : formatMoney(fromInput)}
          onChange={handleChangeTo}
          autoFocus="autofocus"
        />
        <br />
        <div className="hover:opacity-70 mt-5 mb-2 w-[50%]">
          <i className="fa-solid fa-sack-dollar"></i>
          <select className="ml-1 cursor-pointer" onChange={handleTo}>
            {tokens.map((money, index) => {
              return (
                <>
                  <option key={index} value={JSON.stringify(money)}>
                    {money.currency}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <input
          className="w-full rounded-lg"
          type="number"
          value={
            inputRef.current === "to"
              ? formatMoney(fromInput * rate)
              : fromInput * rate
          }
          onChange={(e) => handleChangeFrom(e)}
        />
      </form>

      <div className="flex justify-between items-center my-6">
        <span className="text-[#a881fc] text-xs font-bold">Price</span>
        <div className="flex justify-center items-center gap-3">
          <p className="">1 {from.currency}</p>
          <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i>
          <span>
            {formatMoney(rate)} {to.currency}
          </span>
        </div>
      </div>

      <button
        onClick={handleAccount}
        className="bg-[#1fc7d4] text-[#191326] font-bold w-full p-[10px] rounded-2xl hover:opacity-70"
      >
        Swap Currency
      </button>
    </>
  );
};

export default CurrencySwap;
