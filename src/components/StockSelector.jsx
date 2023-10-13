/* eslint-disable react/prop-types */
import nextId from "react-id-generator";
import Papa from "papaparse";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function StockSelector({ manageList }) {
  const [listedStocks, setListedStocks] = useState([]);

  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    getTodayListedStocks();
  }, []);

  async function getTodayListedStocks() {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${
          import.meta.env.VITE_REACT_STOCK_API_KEY
        }`
      );
      const csvText = response.data;

      Papa.parse(csvText, {
        complete: (result) => {
          setListedStocks(result.data);
        },
        header: true,
      });
    } catch (error) {
      alert("Errore nel recuperare l'elenco dei titoli, riprova. (Potrebbero essere terminati gli utilizzi giornalieri del servizio di lettura)");
    }
  }

  const filterStocks = (event) => {
    if (event.target.value.length > 2) {
      const filteredList = listedStocks.filter((stock) =>
        String(stock["name"]).includes(event.target.value)
      );
      setFilteredStocks(filteredList);
    } else {
      setFilteredStocks([]);
    }
  };

  const handleStockChange = (event) => {
    manageList(event.target.value);
    setFilteredStocks([]);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Ricerca il titolo..."
        className="input input-bordered input-primary w-full max-w-xs"
        onChange={filterStocks}
      />
      {filteredStocks.map((stock) => {
        return (
          <div
            key={nextId()}
            className="tooltip tooltip-secondary"
            data-tip={stock.symbol}
          >
            <button
              className="btn btn-secondary"
              onClick={handleStockChange}
              value={stock.symbol}
            >
              {stock.name}
            </button>
          </div>
        );
      })}
    </>
  );
}
