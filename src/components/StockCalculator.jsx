// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import StockSelector from "./StockSelector";
import axios from "axios";

export default function StockCalculator() {
  //-- HOOKS --
  const [calculatedStockValue, setCalculatedStockValue] = useState(0);
  const [inputedStockAmount, setInputedStockAmount] = useState(0);
  const [selectedStockValue, setSelectedStockValue] = useState("");

  //-- HANDLE CHANGE --
  const handleAmountChange = (event) => {
    setInputedStockAmount(event.target.value);
  };

  //-- FUNCTIONS --

  const updateList = (selectedStock) => {
    setSelectedStockValue(selectedStock);
  };

  async function getTodayPriceForTitle(symbol) {
    let response = [];

    try {
      response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${
          import.meta.env.VITE_REACT_STOCK_API_KEY
        }`
      );

      let prices = response.data["Time Series (Daily)"];

      let singleDayPrices = Object.values(prices);

      let value = Object.values(singleDayPrices);

      let pricesArray = Object.values(value[0]);

      return pricesArray[3];
    } catch (error) {
      alert("Errore nel recuperare il prezzo del titolo, riprova. (Potrebbero essere terminati gli utilizzi giornalieri del servizio di lettura)");
    }
  }

  async function calculateStockValue() {
    let price = await getTodayPriceForTitle(selectedStockValue.toString());
    let result = inputedStockAmount * price;
    setCalculatedStockValue(result);
  }

  return (
    <div>
      <form className="flex flex-col gap-10 md:flex-row flex-wrap justify-around">
        <StockSelector manageList={updateList}></StockSelector>
        {selectedStockValue !== "" ? (
          <>
            <div className="badge badge-accent font-bold">
              Hai scelto il simbolo ${selectedStockValue}
            </div>
          </>
        ) : (
          <></>
        )}
        <input
          type="number"
          onChange={handleAmountChange}
          value={inputedStockAmount}
          className="input input-bordered input-primary border-primary "
          placeholder="Inserisci il tuo totale"
        ></input>
        <input
          type="button"
          value="Calcola valore"
          onClick={calculateStockValue}
          className="btn btn-primary"
        ></input>
      </form>
      <p className="alert alert-success w-4/6 mt-10 mx-auto font-bold text-white">
        Il tuo totale: {calculatedStockValue}$
      </p>
    </div>
  );
}
