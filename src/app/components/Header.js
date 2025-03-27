'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link';

import { IoIosTimer } from "react-icons/io";

import { useAuth } from "../../contexts/AuthContext";

import { usePathname } from "next/navigation";

const Header = () => {
  const { user, logout } = useAuth();
  const [timeLeft, setTimeLeft] = useState(0); // 2시간 59분 (179분)
  const pathname = usePathname(); 

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태

  const menuItems = [
    { name: "코인 입출금", path: "/exchange" },
    // { name: "투자내역", path: "/investments" },
    // { name: "코인동향", path: "/trends" },
    // { name: "서비스+", path: "/services" },
    { name: "고객센터", path: "/support" },
    // { name: "NFT", path: "/nft" },
  ];

  useEffect(() => {
    if (user && user.last_sign_in_at) {
      // 로그인 시간에서 현재까지 경과한 시간 계산
      const loginTime = new Date(user.last_sign_in_at).getTime();
      const currentTime = new Date().getTime();
      const timeElapsed = (currentTime - loginTime) / 60000; // 분 단위로 변환
      
      const remainingTime = 179 - timeElapsed; // 3분에서 경과한 시간만큼 뺌
      if (remainingTime > 0) {
        setTimeLeft(Math.floor(remainingTime)); // 남은 시간을 설정

        // 1분마다 타이머 감소
        const interval = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(interval);
              logout(); // 3분 후 자동 로그아웃
              return 0;
            }
            return prevTime - 1; // 1분씩 감소
          });
        }, 60000); // 1분(60,000ms)마다 감소

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
      } else {
        logout(); // 남은 시간이 0 이하이면 즉시 로그아웃
      }
    }
  }, [user, logout]);

  // 로그인 상태에서 타이머 감소
  // useEffect(() => {
  //   console.log("######")
  //   if (user) {
  //     console.log(user)
  //     console.log(user)
  //     console.log(user)
  //     console.log(user)
  //     setTimeLeft(3); // 3시간을 분 단위로 설정 (3시간 = 180분)
      
  //     const interval = setInterval(() => {
  //       setTimeLeft(prev => {
  //         console.log("@@@@@@@@@@")
  //         console.log("@@@@@@@@@@")
  //         console.log("@@@@@@@@@@")
  //         if (timeLeft <= 1) {
  //           clearInterval(interval);
  //           logout(); // 시간이 다 되면 로그아웃
  //           return 0;
  //         }
  //         return prev - 1; // 1분씩 감소
  //       });
  //     }, 60000); // 1분(60,000ms)마다 감소
  
  //     return () => clearInterval(interval); // 언마운트 시 정리
  //   }
  // }, [user]);

  const handleLogout = () => {
    logout();
  }

  // 사이드바 열기/닫기
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  if(pathname.startsWith('/adm')) return null;

  return (
    <>
      <div className="p-3 bg-[#133491] text-white flex justify-between sm:hidden">

        <Link href="/">
            <svg width="80" height="18" viewBox="0 0 80 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M53.7307 5.39365H47.6602L49.4158 0H44.0222L38.1843 17.9788H49.4158C52.0175 17.9788 54.323 16.3079 55.1267 13.8331L56.5862 9.3067C57.1996 7.3819 55.7613 5.39365 53.7307 5.39365ZM51.2349 9.17979L50.0292 12.9236C49.6273 14.1504 48.4851 14.9965 47.1737 14.9965H44.551L46.6873 8.39718H50.6638C51.0656 8.39718 51.3618 8.79906 51.2349 9.17979Z" fill="white"/>
              <path d="M63.2067 0L62.0433 3.59577H67.437L68.6003 0H63.2067Z" fill="white"/>
              <path d="M57.3688 17.9788H62.7625L66.8447 5.39363H61.4511L57.3688 17.9788Z" fill="white"/>
              <path d="M74.9458 8.39718H78.5839L79.5568 5.39366H75.9188L77.6743 0H72.2807L67.7119 14.0658C67.0774 16.0118 68.5368 18 70.5674 18H76.5533L77.5263 14.9965H73.6344C73.2325 14.9965 72.9364 14.5946 73.0633 14.2139L74.9458 8.39718Z" fill="white"/>
              <path d="M16.4193 6.28202L22.3205 0H15.9962L11.1314 14.9965H7.07025C6.66837 14.9965 6.37225 14.5946 6.49916 14.2139L11.1102 0H5.71655L1.14781 14.0658C0.513261 16.0117 1.97272 17.9788 4.00327 17.9788H15.552L19.6343 5.39365L16.4193 6.28202Z" fill="white"/>
              <path d="M36.3654 0H23.9705L25.7896 6.28202L23.1456 5.39365L19.0634 17.9788H24.457L26.403 11.9929H32.2408C34.8424 11.9929 37.148 10.322 37.9517 7.84724L39.2208 3.91304C39.8554 1.98825 38.4171 0 36.3654 0ZM33.8695 3.78613L32.8542 6.93772C32.4523 8.16451 31.3101 9.01057 29.9987 9.01057H27.3759L29.3219 3.02468H33.2984C33.7214 3.00353 33.9964 3.38425 33.8695 3.78613Z" fill="white"/>
            </svg>
        </Link>
        <button onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" id="Outline" viewBox="0 0 24 24" width="24" height="24"><path d="M7,6H23a1,1,0,0,0,0-2H7A1,1,0,0,0,7,6Z"/><path d="M23,11H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><path d="M23,18H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/><circle cx="2" cy="5" r="2"/><circle cx="2" cy="12" r="2"/><circle cx="2" cy="19" r="2"/></svg>
        </button>
      </div>


      {/* 헤더 */}
      <header className="bg-[#133491] text-white p-4 sm:px-4 sm:block hidden md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href='/'>
              <svg width="80" height="18" viewBox="0 0 80 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.7307 5.39365H47.6602L49.4158 0H44.0222L38.1843 17.9788H49.4158C52.0175 17.9788 54.323 16.3079 55.1267 13.8331L56.5862 9.3067C57.1996 7.3819 55.7613 5.39365 53.7307 5.39365ZM51.2349 9.17979L50.0292 12.9236C49.6273 14.1504 48.4851 14.9965 47.1737 14.9965H44.551L46.6873 8.39718H50.6638C51.0656 8.39718 51.3618 8.79906 51.2349 9.17979Z" fill="white"/>
                <path d="M63.2067 0L62.0433 3.59577H67.437L68.6003 0H63.2067Z" fill="white"/>
                <path d="M57.3688 17.9788H62.7625L66.8447 5.39363H61.4511L57.3688 17.9788Z" fill="white"/>
                <path d="M74.9458 8.39718H78.5839L79.5568 5.39366H75.9188L77.6743 0H72.2807L67.7119 14.0658C67.0774 16.0118 68.5368 18 70.5674 18H76.5533L77.5263 14.9965H73.6344C73.2325 14.9965 72.9364 14.5946 73.0633 14.2139L74.9458 8.39718Z" fill="white"/>
                <path d="M16.4193 6.28202L22.3205 0H15.9962L11.1314 14.9965H7.07025C6.66837 14.9965 6.37225 14.5946 6.49916 14.2139L11.1102 0H5.71655L1.14781 14.0658C0.513261 16.0117 1.97272 17.9788 4.00327 17.9788H15.552L19.6343 5.39365L16.4193 6.28202Z" fill="white"/>
                <path d="M36.3654 0H23.9705L25.7896 6.28202L23.1456 5.39365L19.0634 17.9788H24.457L26.403 11.9929H32.2408C34.8424 11.9929 37.148 10.322 37.9517 7.84724L39.2208 3.91304C39.8554 1.98825 38.4171 0 36.3654 0ZM33.8695 3.78613L32.8542 6.93772C32.4523 8.16451 31.3101 9.01057 29.9987 9.01057H27.3759L29.3219 3.02468H33.2984C33.7214 3.00353 33.9964 3.38425 33.8695 3.78613Z" fill="white"/>
              </svg>
            </Link>
            <nav className="flex space-x-8 text-medium font-bold ml-6">
              {menuItems.map((item) => (
                <Link key={item.path} href={item.path} className={`text-gray-400 hover:underline ${
                  pathname == item.path ? "text-white font-bold" : ""
                }`}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex space-x-4 text-sm lg:flex hidden">
            {user ? 
              <>
                <span className="font-bold flex justify-center items-center"><IoIosTimer className="mr-2"/>{Math.floor(timeLeft / 60)}시 {timeLeft % 60}분</span>
                <div className="font-bold cursor-pointer hover:underline" onClick={handleLogout}>로그아웃</div>
              </>
              :
              <>
                <Link href="/login" className="font-bold hover:underline">로그인</Link>
                <Link href="/signup" className="font-bold hover:underline">회원가입</Link>
              </>
            }
            <a href="#" className="font-bold hover:underline">EN</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="font-bold hover:underline">KO</a>
          </div>
        </div>
      </header>

      {/* 사이드바 (모바일) */}
      <div onClick={toggleSidebar} className={`fixed inset-0 bg-opacity-50 z-50 md:hidden ${isSidebarOpen ? "block" : "hidden"} backdrop-blur-sm`}>
        <div className="bg-[#133491] h-full text-white w-64 p-6 shadow-lg rounded-r-lg">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={toggleSidebar} 
              className="text-white text-xl font-bold hover:text-gray-400 transition"
            >
              X
            </button>
          </div>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`
                  block text-gray-300 hover:text-white hover:underline py-2 px-4 rounded-lg 
                  transition duration-300 ease-in-out
                  ${pathname == item.path ? "bg-[#1f2a78] text-white font-semibold" : ""}
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
