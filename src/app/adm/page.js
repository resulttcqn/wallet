'use client';

import { useRouter } from "next/navigation";
import PriceCard from "./components/PriceCard";

export default function Dashboard() {
  
  const router = useRouter();

  const handleUsers = () => {
    router.push('/adm/users');
  };

  return (
    <>
      <div className='text-white font-bold m-4 text-xl'>DashBoard</div>

      {/* 반응형 그리드 레이아웃 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">

        {/* 사용자 관리 위젯 */}
        <div 
          onClick={handleUsers} 
          className="cursor-pointer max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">사용자 관리 위젯</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 opacity-80">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
        </div>

        {/* PriceCard 컴포넌트 */}
        <PriceCard />

        {/* 더 많은 위젯 추가 가능 */}
        {/* 예시 위젯 */}
        <div className="cursor-pointer max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">다른 위젯</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 opacity-80">
            Another widget to extend your dashboard functionalities.
          </p>
        </div>

      </div>
    </>
  );
}
