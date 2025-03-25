'use client'

import { useState } from "react";
import Image from "next/image";

const AssetsStatusComponent = ({ coins, coinClick, userData, xrpPrice}) => {
    const [activeTab, setActiveTab] = useState("전체");

    if (!userData && !xrpPrice) {
      return (
        <div role="status" className='fixed flex justify-center items-center top-0 right-0 left-0 z-50 min-h-screen '>
          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
      ) // userData가 없을 경우 로딩 상태 표시
    }

    return (
      <section className="flex-[1.3] bg-white shadow-md p-4 md:flex-col order-2">
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2">총 보유 자산</h2>
          <div className="text-2xl font-bold">
            {userData?.balance ? userData.balance * xrpPrice : 0} <span className="font-light">KRW</span>
          </div>
          <p className="text-sm text-gray-500">≈ {coins[0].balanceToBit ? coins[0].balanceToBit : 0} BTC</p>
        </div>
  
        <div className="border-b border-gray-300 mb-4">
          <ul className="flex text-xs">
            {["전체", "보유", "관심"].map((tab) => (
              <li
                key={tab}
                className={`mr-4 pb-2 cursor-pointer ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          {activeTab === "전체" && <CryptoBalance assets={coins} coinClick={coinClick} />}
          {(activeTab === "보유" || activeTab === "관심") && (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
              <p className="mt-2">{activeTab === "보유" ? "보유 중인 자산이 없습니다." : "등록된 관심코인이 없습니다."}</p>
              <p className="text-sm text-gray-400">{activeTab === "보유" ? "자산을 입금하여 거래를 시작하세요." : "관심코인을 등록해 주세요."}</p>
            </div>
          )}
        </div>
      </section>
    );
  };
  
  const CryptoBalance = ({ assets, coinClick }) => {
    return (
      <>
        <div className="grid grid-cols-3 text-gray-500 text-sm font-semibold py-1 rounded-t-lg bg-gray-100">
          <div className="px-2">코인명</div>
          <div className="text-center px-2">보유비중</div>
          <div className="text-right px-2">보유수량</div>
        </div>
        <div className="max-h-200 overflow-y-auto">
          {assets.map((asset, index) => (
            <div key={index} onClick={() => coinClick(asset)} className="grid grid-cols-3 items-center px-2 py-3 cursor-pointer hover:bg-gray-100">
              <div className="flex items-center">
                <Image src={asset.image} alt={asset.name} width={24} height={24} className="mr-2" />
                <div>
                  <div className="font-medium text-xs">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.symbol}</div>
                </div>
              </div>
              <div className="text-center text-xs">{asset.percentage}</div>
              <div className="text-right text-xs">
                <div>{asset.balance} {asset.symbol}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default AssetsStatusComponent;
  