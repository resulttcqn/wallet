// 📌 pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <p className="text-xl text-gray-600 mt-4">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
