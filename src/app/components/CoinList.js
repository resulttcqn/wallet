'use client';

import React, { useState, useEffect } from "react";
import { FaStar, FaCog, FaSearch } from "react-icons/fa";

const initialCoins = [
  { name: "오르카", symbol: "ORCA/KRW", price: 4571, change: 0, volume: 804351, type: "KRW" },
  { name: "엑스알피(리플)", symbol: "XRP/KRW", price: 3549, change: 0, volume: 555028, type: "KRW" },
  { name: "바운스토큰", symbol: "AUCTION/KRW", price: 80330, change: 0, volume: 375330, type: "KRW" },
  { name: "레이어제로", symbol: "ZRO/KRW", price: 4752, change: 0, volume: 209373, type: "KRW" },
  { name: "비트코인", symbol: "BTC/KRW", price: 124540000, change: 0, volume: 42000, type: "KRW" },
  { name: "이더리움", symbol: "ETH/KRW", price: 8000000, change: 0, volume: 200000, type: "KRW" },
  { name: "도지코인", symbol: "DOGE/KRW", price: 100, change: 0, volume: 100000000, type: "KRW" },
  { name: "폴카닷", symbol: "DOT/KRW", price: 30000, change: 0, volume: 120000, type: "KRW" },
  { name: "체인링크", symbol: "LINK/KRW", price: 25000, change: 0, volume: 180000, type: "KRW" },
  { name: "라이트코인", symbol: "LTC/KRW", price: 180000, change: 0, volume: 50000, type: "KRW" },
  { name: "비트코인캐시", symbol: "BCH/KRW", price: 900000, change: 0, volume: 35000, type: "KRW" },
  { name: "아르가르트", symbol: "ARG/KRW", price: 45000, change: 0, volume: 100000, type: "KRW" },
  { name: "솔라나", symbol: "SOL/KRW", price: 180000, change: 0, volume: 400000, type: "KRW" },
  { name: "테라", symbol: "LUNA/KRW", price: 50000, change: 0, volume: 500000, type: "KRW" },
  { name: "카르다노", symbol: "ADA/KRW", price: 1200, change: 0, volume: 1300000, type: "KRW" },
  { name: "트론", symbol: "TRX/KRW", price: 200, change: 0, volume: 90000000, type: "KRW" },
  { name: "아이오타", symbol: "IOTA/KRW", price: 1000, change: 0, volume: 250000, type: "KRW" },
  { name: "알고랜드", symbol: "ALGO/KRW", price: 10000, change: 0, volume: 400000, type: "KRW" },
  { name: "미러프로토콜", symbol: "MIR/KRW", price: 20000, change: 0, volume: 800000, type: "KRW" },
  { name: "폴리곤", symbol: "MATIC/KRW", price: 7000, change: 0, volume: 300000, type: "KRW" },
  { name: "상파", symbol: "SAND/KRW", price: 4000, change: 0, volume: 400000, type: "KRW" },
  { name: "디센트럴랜드", symbol: "MANA/KRW", price: 5000, change: 0, volume: 100000, type: "KRW" },
  { name: "플로우", symbol: "FLOW/KRW", price: 2000, change: 0, volume: 150000, type: "KRW" },
  { name: "스텔라루멘", symbol: "XLM/KRW", price: 1500, change: 0, volume: 700000, type: "KRW" },
  { name: "퀀텀", symbol: "QTUM/KRW", price: 10000, change: 0, volume: 120000, type: "KRW" },
  { name: "뉴로스", symbol: "NEUR/KRW", price: 3000, change: 0, volume: 200000, type: "KRW" },
  { name: "이오스", symbol: "EOS/KRW", price: 10000, change: 0, volume: 150000, type: "KRW" },
  { name: "스토리지", symbol: "STORJ/KRW", price: 8000, change: 0, volume: 500000, type: "KRW" },
  { name: "트라이브", symbol: "TRB/KRW", price: 12000, change: 0, volume: 600000, type: "KRW" },
  { name: "오미세고", symbol: "OMG/KRW", price: 5000, change: 0, volume: 200000, type: "KRW" },
  { name: "코스모스", symbol: "ATOM/KRW", price: 10000, change: 0, volume: 250000, type: "KRW" },
];


const CoinList = () => {
  const [coins, setCoins] = useState(initialCoins);
  const [activeTab, setActiveTab] = useState("KRW");
  const [favorites, setFavorites] = useState([]);
  const [priceChanges, setPriceChanges] = useState({});

  const tabs = ["KRW", "BTC", "USDT", "보유", "관심"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) => {
        return prevCoins.map((coin) => {
          // 거래량 변동 (±2% 범위 내에서 변동)
          const volumeChange = (Math.random() * 0.04 - 0.02) * coin.volume;
          const newVolume = Math.max(coin.volume + volumeChange, 1000); // 최소 거래량 제한
  
          // 🔹 가격 변동에 누적 효과 추가 (추세 적용)
          const trend = Math.random() * 0.02 - 0.01; // -1% ~ +1% 변화
          const volatilityFactor = Math.log10(newVolume + 1) * 0.0005;
          const randomChange = (Math.random() * 2 - 1) * volatilityFactor * coin.price;
  
          // 가격 변동 = 랜덤 변동 + 트렌드 반영
          const newPrice = Math.max(coin.price + randomChange + trend * coin.price, 1);
          const priceDiff = newPrice - coin.price;
          const changePercent = ((priceDiff) / coin.price) * 100;
  
          setPriceChanges((prev) => ({ ...prev, [coin.symbol]: priceDiff > 0 ? "up" : "down" }));
  
          return {
            ...coin,
            price: Math.round(newPrice),
            change: changePercent.toFixed(2),
            volume: Math.round(newVolume),
          };
        });
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <section className="flex-1 bg-white shadow-md lg:block hidden md:flex-col order-3 ">

      <div className="w-full flex items-center mb-4">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="코인명/심볼검색"
            className="w-full p-2 pr-8 text-xs border border-gray-300 focus:outline-none"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
        </div>
        <div className="p-2 border border-gray-300">
          <FaCog className="text-gray-600 w-4 h-4" />
        </div>
      </div>

      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => {
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`w-1/5 px-4 pb-2 text-sm text-center cursor-pointer ${
                activeTab === tab ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "font-bold"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="w-full">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-gray-100 text-xs font-bold text-gray-700 py-2 px-4 border-b border-gray-100">
          <div className="text-center">한글명</div>
          <div className="text-center">현재가</div>
          <div className="text-center">전일대비</div>
          <div className="text-right">거래대금</div>
        </div>

        <div className="max-h-200 overflow-y-auto">
          {coins.map((coin, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border-b border-gray-100 py-2 px-4 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                <FaStar
                  className={`cursor-pointer ${favorites.includes(coin.symbol) ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setFavorites((prev) => prev.includes(coin.symbol) ? prev.filter((item) => item !== coin.symbol) : [...prev, coin.symbol])}
                />
                <div>
                  <span className="text-xs font-medium block">{coin.name}</span>
                  <span className="text-[10px] text-gray-500">{coin.symbol}</span>
                </div>
              </div>

              <div
                className={`text-center font-medium text-xs w-full h-full flex justify-center items-center transition-all duration-500 ${
                  priceChanges[coin.symbol] === "up" ? "text-red-600 border border-red-200" : "text-blue-600 border border-blue-200"
                }`}
              >
                {coin.price.toLocaleString()}
              </div>

              <div className="text-center">
                <span className={`text-xs font-medium ${coin.change > 0 ? "text-red-600" : "text-blue-600"}`}>
                  {coin.change > 0 ? `+${coin.change}%` : `${coin.change}%`}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500">{coin.volume.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
};

export default CoinList;
