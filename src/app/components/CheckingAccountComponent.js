'use client'

import supabase from "../../Lib/supabase";

import { useEffect, useState } from "react";

const CheckingAccountComponent = ({ selectedCoin, setPaymentModalYn, userData, xrpPrice }) => {
  const [activeTab, setActiveTab] = useState("history");

  if(!userData && !xrpPrice) {
    return (
      <div role="status" className='fixed flex justify-center items-center top-0 right-0 left-0 z-50 min-h-screen '>
          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
    ) 
  }  

  // 초기 샘플 데이터
  const initData = {
    name: "원화",
    symbol: "KRW",
    balance: 0, // 2,000,000 KRW를 XRP로 변환 (1 XRP = 3551 KRW)
    balanceToKrw: 0,
    percentage: "100%",
    image: "/images/coins/KRW.png",
    transactions: [
    ],
  };

  // selectedCoin이 없으면 initData 사용
  const coinData = selectedCoin || initData;

  // transactions에서 입금 & 출금 데이터 분류
  const deposits = coinData.transactions.filter((tx) => tx.status === "입금 완료");
  const withdraws = coinData.transactions.filter((tx) => tx.status === "출금 완료");

  return (
    <section className="flex-1 bg-white shadow-md rounded-lg p-4 md:order-1">
      {/* 상단 코인 정보 */}
      
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{coinData.name} ({coinData.symbol})</h2>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded">{coinData.symbol} Leader</span>
        </div>
      
      

      {/* 총 보유 & 거래대기 */}
      <div className="mt-2">

      {selectedCoin?.symbol === 'XRP' ?
        <div className="flex justify-between">
        <div>총 보유</div>
        <div>
          <p className="text-lg font-semibold">{userData.balance} {coinData.symbol}</p>
          <p className="text-gray-500 text-right">≈ {(userData.balance * xrpPrice).toLocaleString('ko-KR')} KRW</p>
        </div>
      </div>
      :
      <div className="flex justify-between">
        <div>총 보유</div>
        <div>
          <p className="text-lg font-semibold">0 {coinData.symbol}</p>
          <p className="text-gray-500 text-right">≈ 0 KRW</p>
        </div>
      </div>
      }

        <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
          <span>거래대기</span>
          <span>0 KRW</span>
        </div>
      </div>

      <div className="mt-4 border-t border-b border-gray-100">
        <div className="flex">
          <button className="flex-1 text-center py-2 font-bold text-red-500 hover:text-red-600 transition-all duration-300 ease-in-out">
            매수
          </button>
          <button className="flex-1 text-center py-2 font-bold text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out">
            매도
          </button>
          <button onClick={setPaymentModalYn} className="flex-1 text-center py-2 font-bold text-black hover:text-gray-800 transition-all duration-300 ease-in-out">
            출금
          </button>
        </div>
      </div>


      {/* 탭 메뉴 */}
      <div className="mt-4 border-t border-b border-gray-100">
        <div className="flex">
          {["history", "deposit", "withdraw"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-2 font-bold ${
                activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "history" ? "내역" : tab === "deposit" ? "입금" : "출금"}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 내용 */}
      

      {/* 거래 내역 탭 */}
      <div className="mt-3">

        {selectedCoin?.symbol === 'XRP' ?
          <ul className="space-y-2">
            <li  className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
              <div className="flex justify-between mt-4 mb-4">
                  <div>
                    <div className="font-bold text-green-500">
                      입금완료
                    </div>
                    <div className="text-xs text-gray-400">{`${userData.input_dt} XRP`} </div>
                  </div>
                  <div className="text-black-700 font-bold">{userData.balance}</div>
                </div>
            </li>
          </ul>
        :
          activeTab === "history" && (
            coinData.transactions.length > 0 ? (
              <ul className="space-y-2">
                {coinData.transactions.map((tx, index) => (
                  <li key={index} className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
                    <div className="flex justify-between mt-4 mb-4">
                      <div>
                        <div className={`font-bold ${tx.status === "입금 완료" ? "text-green-500" : "text-blue-500"}`}>
                          입금 완료
                        </div>
                        <div className="text-xs text-gray-400">{tx.date}</div>
                      </div>
                      <div className="text-black-700 font-bold">{tx.balance}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">거래 내역이 없습니다.</p>
            )
          )
        }

        

        {/* 입금 내역 탭 */}
        {activeTab === "deposit" && (
          deposits.length > 0 ? (
            <ul className="space-y-2">
              {deposits.map((deposit, index) => (
                <li key={index} className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
                  <div className="flex justify-between mt-4 mb-4">
                    <div>
                      <div className="text-green-500 font-bold">{deposit.status}</div>
                      <div className="text-xs text-gray-400">{deposit.date}</div>
                    </div>
                    <div className="text-black-700 font-bold">{deposit.amount}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">입금 내역이 없습니다.</p>
          )
        )}

        {/* 출금 내역 탭 */}
        {activeTab === "withdraw" && (
          withdraws.length > 0 ? (
            <ul className="space-y-2">
              {withdraws.map((withdraw, index) => (
                <li key={index} className="text-sm pb-2 py-2 px-2 hover:bg-gray-100">
                  <div className="flex justify-between mt-4 mb-4">
                    <div>
                      <div className="text-blue-500 font-bold">{withdraw.status}</div>
                      <div className="text-xs text-gray-400">{withdraw.date}</div>
                    </div>
                    <div className="text-black-700 font-bold">{withdraw.amount}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">출금 내역이 없습니다.</p>
          )
        )}
      </div>
    </section>
  );
};

export default CheckingAccountComponent;
