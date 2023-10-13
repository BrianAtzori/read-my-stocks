// eslint-disable-next-line no-unused-vars
import React from "react";
import StockCalculator from "./StockCalculator";

export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200 transition-[height] ease-in-out">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left self-start">
          <h1 className="text-5xl font-bold">Read My Stocks 💸</h1>
          <p className="py-6">
            Una semplice webapp per scoprire il valore in dollari dei titoli
            azionari 💰
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <StockCalculator></StockCalculator>
          </div>
        </div>
      </div>
    </div>
  );
}
