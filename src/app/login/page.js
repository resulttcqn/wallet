'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import LogoHeader from "../components/signup/LogoHeader";

const Login = () => {
    const [formData, setFormData] = useState({ id: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const { user, setUser, login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // 입력값 변경 시 에러 초기화
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { id, password } = formData;
        const errorMessage = await login(id, password)

        setLoading(true);
        if (errorMessage) {
            setError(errorMessage);  // 받은 에러 메시지를 상태로 설정
        }

        setLoading(false);
    };

    return (
        <div className="w-full flex justify-center mb-20">
            
            <div className="p-8 rounded-lg w-128 ">
                <LogoHeader/>
                <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700">아이디</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="아이디를 입력하세요"
                            className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">로그인 상태 유지</label>
                        </div>
                        <a href="#" className="text-sm text-blue-500 hover:underline">비밀번호를 잊으셨나요?</a>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-[#2960d7] text-white py-2 px-4 rounded-sm ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                        disabled={loading}
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                </form>
                <div className="pt-4 text-sm flex justify-between">
                    <span className="text-gray-500">업비트 계정이 없으신가요?</span>
                    <span className="text-gray-700 border-b"><Link href={"signup"}> 회원가입 </Link></span>
                </div>
                <div className="pt-1 text-sm">
                    <span className="text-gray-500">법인회원이신가요? </span>
                    <span className="text-gray-700 border-b"><Link href={"login"}> 법인회원 로그인 </Link></span> | 
                    <span className="text-gray-700 border-b"><Link href={"https://upbit.com/signup/company/pre_register"} target="blink"> 법인회원 가입문의</Link> </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
