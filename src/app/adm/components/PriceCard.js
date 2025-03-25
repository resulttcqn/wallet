'use client';

import { useEffect, useState } from "react";
import supabase from "../../../Lib/supabase"; // Supabase 클라이언트 불러오기

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PriceCard = () => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  

  const [symbol, setSymbol] = useState(''); 
  const [price, setPrice] = useState(''); // 가격 상태

  // Supabase에서 XRP 데이터 가져오기
  useEffect(() => {
    const fetchCurrency = async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .eq('name', 'Ripple') // XRP 데이터만 가져옴
        .single(); // 단일 레코드 가져오기

      if (error) {
        console.error("Error fetching currency:", error);
      } else {
        setPrice(data.current_price); // 기존 가격을 상태에 설정

      }
      setLoading(false); // 로딩 완료
    };

    fetchCurrency();
  }, []);

  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 가격 입력 변경 핸들러
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = async () => {
    setIsEditing(false);
    // Supabase에 업데이트 로직
    const { data, error } = await supabase
      .from('currencies')
      .update({ 'current_price':price }) // 가격 업데이트
      .eq('symbol', 'XRP');

    if (error) {
      console.error("Error updating price:", error);
    } else {
        toast.success('가격이 변동되었습니다.')
      console.log("Price updated:", data);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <ToastContainer position="top-right" autoClose={3000} />
        <a href="#">

            <h5 className="mb-2 flex text-2xl font-bold text-gray-900 dark:text-white">{`${price} ${symbol}`} KRW</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            현재 시가에 {symbol} 가격을 입력하세요
        </p>

        {isEditing ? (
            <div className="mb-3">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                가격 입력
            </label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <button
                onClick={handleSaveClick}
                className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
                Save
            </button>
            </div>
        ) : (
            <button
            onClick={handleEditClick}
            className="mb-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
            >
            수정
            </button>
        )}
        </div>
    </>
  );
};


export default PriceCard;
