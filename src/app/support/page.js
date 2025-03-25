'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaThumbtack } from 'react-icons/fa';

const categories = [
  '전체', '안내', '거래', '입출금', '점검', '디지털 자산', 'NFT', '스테이킹', '이벤트'
];

const notices = [
  { title: '특정금융정보법에 따른 미신고 가상자산사업자와의 입출금 제한 및 유의사항 (2025.03.21 추가)', date: '2025.03.21' },
  { title: '금융당국의 제재조치에 따른 업비트 입장을 안내드립니다', date: '2025.02.25' },
  { title: '가상자산 발행 주체를 대상으로 한 피싱 메일 사기 수법 안내 - 금융감독원 가상자산검사팀 사칭 유형', date: '2024.06.07' },
  { title: '피싱 문자 사기 수법 안내 - 장기 미접속 및 휴면 계정의 잔여 디지털 자산 소각 안내 빙자 유형', date: '2024.05.17' },
  { title: '가짜 거래소를 이용한 가상자산 투자사기 주의 안내', date: '2024.03.20' },
  { title: '가상자산 거래에 관한 위험 고지', date: '2022.05.20' },
  { title: '알고리즘 스테이블 코인 연관 디지털 자산 투자 주의 안내 (업데이트)', date: '2022.05.18' },
  { title: '트래블룰 관련 입출금 유의사항 안내', date: '2022.03.29' },
  { title: '디지털 자산 오입금 관련 유의사항 안내', date: '2022.01.20' }
];

export default function NoticePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-300 p-6 backdrop-blur-lg shadow-sm">
        <h2 className="text-lg font-bold mb-4">고객센터</h2>
        <ul className="space-y-2">
          <li className="text-blue-600 font-bold">공지사항</li>
          <li className="text-gray-600">업비트소식</li>
          <li className="text-gray-600">거래 이용 안내</li>
          <li className="text-gray-600">입출금 이용 안내</li>
          <li className="text-gray-600">입출금 현황</li>
          <li className="text-gray-600">Open API 안내</li>
          <li className="text-gray-600">정책 및 거래지원 문의</li>
          <li className="text-gray-600">1:1 문의하기</li>
          <li className="text-gray-600">문의내역</li>
          <li className="text-gray-600">이용자 가이드</li>
          <li className="text-gray-600">카카오톡 문의(24시간)</li>
          <li className="text-gray-600">증명서 발급</li>
          <li className="text-gray-600">공시 안내</li>
        </ul>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 bg-white p-8 shadow-sm border-l border-gray-300">
        {/* 제목 */}
        <h1 className="text-2xl font-bold mb-6">공지사항</h1>

        {/* 탭 메뉴 */}
        <div className="border-b border-gray-300 flex space-x-4 text-gray-600">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`pb-2 px-4 rounded-full transition duration-300 ${selectedCategory === category ? 'text-blue-600 border-b-2 border-blue-600 font-bold bg-blue-100' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 검색 바 */}
        <div className="relative mt-4 mb-4">
          <input type="text" placeholder="공지사항 검색" className="w-full border border-gray-300 rounded p-2 pl-10 shadow-sm focus:ring-2 focus:ring-blue-300" />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* 공지사항 목록 */}
        <table className="w-full border-t border-gray-300 mt-4">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-300">
              <th className="py-2 px-4">제목</th>
              <th className="py-2 px-4 text-right">날짜</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-gray-50 odd:bg-gray-50 even:bg-white transition duration-300">
                <td className="py-3 px-4 flex items-center space-x-2">
                  <FaThumbtack className="text-blue-500" />
                  <span>{notice.title}</span>
                </td>
                <td className="py-3 px-4 text-right text-gray-600">{notice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
