'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import AssetsStatusComponent from "../components/AssetsStatusComponent";
import CheckingAccountComponent from "../components/CheckingAccountComponent";
import CoinList from "../components/CoinList";
import { useAuth } from '../../contexts/AuthContext'
import Image from "next/image";
import moment from "moment";

import PaymentComponent from '../components/PaymentComponent';

import supabase from '../../Lib/supabase';

const sampleData = [
  {
    name: "총 자산",
    symbol: "KRW",
    balance: 0, // 모든 자산을 원화로 환산한 총액
    balanceToBit: 0,
    percentage: "0%",
    image: "/images/coins/KRW.png",
    transactions: [],
  },
  {
    name: "엑스알피(리플)",
    symbol: "XRP",
    balance: 562, // 2,000,000 KRW를 XRP로 변환 (1 XRP = 3551 KRW)
    percentage: "100%",
    image: "/images/coins/XRP.png",
    transactions: [
      // { date: "2025.03.22", status: "입금 완료", amount: "562 XRP" },
    ],
  },
  {
    name: "비트코인",
    symbol: "BTC",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/BTC.png",
    transactions: [
      // { date: "2021.05.31", status: "입금 완료", amount: "0.0005 BTC" },
      // { date: "2021.05.24", status: "출금 완료", amount: "0.0003 BTC" },
    ],
  },
  {
    name: "이더리움",
    symbol: "ETH",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/ETH.png",
    transactions: [
      // { date: "2021.06.01", status: "입금 완료", amount: "0.02 ETH" },
      // { date: "2021.05.20", status: "출금 완료", amount: "0.005 ETH" },
    ],
  },
  {
    name: "도지",
    symbol: "DOGE",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/DOGE.png",
    transactions: [],
  },
  {
    name: "메디블럭",
    symbol: "MED",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/MED.png",
    transactions: [],
  },
  {
    name: "디센트럴랜드",
    symbol: "MANA",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/MANA.png",
    transactions: [],
  },
  {
    name: "하이브",
    symbol: "HIVE",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/HIVE.png",
    transactions: [],
  },
  {
    name: "플로우",
    symbol: "FLOW",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/FLOW.png",
    transactions: [],
  },
  {
    name: "1인치네트워크",
    symbol: "1INCH",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/1INCH.png",
    transactions: [],
  },
  {
    name: "AC밀란",
    symbol: "ACM",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/ACM.png",
    transactions: [],
  },
  {
    name: "FC바르셀로나",
    symbol: "BAR",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/BAR.png",
    transactions: [],
  },
  {
    name: "가스",
    symbol: "GAS",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/GAS.png",
    transactions: [],
  },
  {
    name: "밀크",
    symbol: "MLK",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/MLK.png",
    transactions: [],
  },
  {
    name: "바나",
    symbol: "VANA",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/VANA.png",
    transactions: [],
  },
  {
    name: "바운스토큰",
    symbol: "AUCTION",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/AUCTION.png",
    transactions: [],
  },
  {
    name: "비트코인캐시",
    symbol: "BCH",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/BCH.png",
    transactions: [],
  },
  {
    name: "비체인",
    symbol: "VET",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/VET.png",
    transactions: [],
  },
  {
    name: "비트토렌트",
    symbol: "BTT",
    balance: 0.00,
    percentage: "0.00%",
    image: "/images/coins/BTT.png",
    transactions: [],
  },
];

export default function Exchange() {

  const router = useRouter();

  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
  const [timeRemaining, setTimeRemaining] = useState("");

  const [selectedCoin, setSelectedCoin] = useState(null);

  const [paymentModalYn, setPaymentModalYn] = useState(false);

  const [xrpPrice, setXrpPrice] = useState(0);

  const [userData, setUserData] = useState(null);

  useEffect(() => { 

    if(!user) return

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, phone, role, approved, balance, input_dt')
        .eq('id',user.id)

      if (error) {
        console.error(error);
      } else {
        setUserData(data[0]);
      }
      
    };

    fetchUsers();
  }, [user]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .eq('symbol','XRP')
        .single()

        setXrpPrice(data.current_price);
    }

    fetchCurrencies();
  }, [])


  useEffect(() => {
    if(paymentModalYn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // 컴포넌트가 언마운트될 때 스크롤 복원
    return () => {
      document.body.style.overflow = "auto";
    };

  }, [paymentModalYn])

  const handleClick = (coin) => {
    setSelectedCoin(coin);
  };

  const handleConfirm = () => {
    setShowModal(false);

    router.push("/login"); // 로그인 페이지로 이동
  };

  useEffect(() => {
    const checkUserSession = async () => {
      if (!user) {
        setShowModal(true); // 유저가 없다면 로그인 모달을 띄움
      } else {
        setShowModal(false);

        const accountCreationTime = moment(user.created_at);
        const currentTime = moment();
        const timeDifference = currentTime.diff(accountCreationTime, "seconds"); // 초 단위로 차이 계산

        const remainingTime = 72 * 3600 - timeDifference; // 72시간 = 72 * 3600초

        if (remainingTime > 0) {
          setTimeRemaining(remainingTime); // 남은 시간 설정 (초 단위)
        } else {
          setTimeRemaining(0); // 0 이하일 경우, 거래 가능 상태
        }
      }
    };

    checkUserSession();
  }, [user]);

  useEffect(() => {
    let interval;
    if (showTransactionModal && timeRemaining > 0) {
      // 거래 모달이 열리고, 남은 시간이 0초 이상이면 카운트다운 시작
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval); // 0초가 되면 타이머 종료
            return 0;
          }
          return prevTime - 1; // 1초씩 차감
        });
      }, 1000); // 1초마다 호출
    }

    return () => {
      if (interval) clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [showTransactionModal, timeRemaining]);

  const handleTransactionClick = () => {
    if (user) {
      const accountCreationTime = moment(user.created_at);
      const currentTime = moment();
      const timeDifference = currentTime.diff(accountCreationTime, "seconds"); // 초 단위로 차이 계산
  
      const remainingTime = (72 * 3600) - timeDifference; // 72시간 = 72 * 3600초로 남은 시간 계산
  
      if (remainingTime > 0) {
        setTimeRemaining(remainingTime); // 남은 시간 설정
        setShowTransactionModal(true); // 거래 중지 모달 표시
      }
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleTransactionModalClose = () => {
    setShowTransactionModal(false); // 거래 중지 모달 닫기
  };

  return (
    <>
      {
        paymentModalYn && (
          <PaymentComponent setPaymentModalYn={setPaymentModalYn} handleTransactionClick={handleTransactionClick} userData={userData} xrpPrice={xrpPrice}/>
        )
      }

      {showTransactionModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-60">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-y-auto max-h-[80vh]">
            <div className="bg-blue-500 text-white w-full p-4 rounded-t-lg text-center">
              <h2 className="text-xl font-bold">거래 중지 안내</h2>
            </div>

            <div className="flex justify-center mt-4">
              <Image
                src="/images/warning.png"
                width={100}
                height={100}
                alt="warning"
              />
            </div>

            {/* <div className="m-4 text-center text-lg font-semibold"> */}
              {/* <p className="text-xs">모든 가상자산 출금은 <strong>FDS(이상금융거래탐지시스템)</strong> 심사 후 진행되며, 금융 사고 패턴으로 탐지되는 경우 최대 72시간 동안 출금이 제한 될 수 있습니다.</p> */}
            {/* </div> */}


            <div className="text-xs text-gray-700 bg-gray-300 p-4 m-4 rounded-lg max-h-[30vh] overflow-y-auto">
              <p>최초 원화 입금 건은 72시간 동안 디지털 자산 출금이 제한되며, 두 번째 원화 입금 건부터는 각 건마다 24시간 디지털 자산 출금 지연제가 적용되어 디지털 자산 출금 신청 시점을 기준으로 직전 24시간 이내의 원화 입금 합계액에 해당하는 디지털 자산의 출금이 제한됩니다..</p>
              <p className="mt-2">즉, 원화를 입금하면 입금된 원화 금액 상당의 디지털 자산은 24시간 경과 후 출금이 가능합니다..</p>
              <p className="mt-2">* 업비트 이상거래시스템을 통해 분석한 거래이력을 바탕으로 금융사고 위험이 낮다고 판단되는 대상자들에 한해 출금 지연제 적용이 제외될 수 있습니다.</p>
              <br/>
              <p className="mt-2">거래가 가능해지면 즉시 알림을 보내드리겠습니다.</p>
              <br/>
              <p className="mt-2">이러한 정책은 사용자의 자산을 보호하고 시스템의 신뢰성을 유지하기 위한 필수적인 절차입니다.</p>
            </div>

            <div className="text-center text-sm font-bold">거래가능 시간까지 {formatTime(timeRemaining)} 남았습니다.</div>

            {/* 닫기 버튼 옆에 남은 시간 표시 */}
            <div className="mt-4 w-full flex items-center justify-between">
              <button
                onClick={handleTransactionModalClose}
                className="w-full bg-gray-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-500"
              >닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">로그인이 필요합니다</h2>
              <p className="mb-4">이 페이지를 보려면 먼저 로그인해주세요.</p>
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                로그인하러 가기
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 flex p-3 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 gap-3 flex-col md:flex-row">
          <AssetsStatusComponent userData={userData} xrpPrice={xrpPrice} coins={sampleData} coinClick={handleClick} />

          {/* Center Content */}
          <CheckingAccountComponent userData={userData} xrpPrice={xrpPrice} selectedCoin={selectedCoin} setPaymentModalYn={setPaymentModalYn}/>

          {/* Right Sidebar */}
          <CoinList/>
        </div>
    </>
  );
}
