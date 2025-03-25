'use client';

import { useState } from "react";
import supabase from "../../../Lib/supabase";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const router = useRouter();

    const [signUpYn, setSignUpYn] = useState(false);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = (name, value) => {
        let error = "";

        switch (name) {
            case "username":
                if (!value.trim()) error = "아이디를 입력하세요.";
                break;
            case "phone":
                if (!/^\d{10,11}$/.test(value)) error = "올바른 전화번호를 입력하세요.";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "올바른 이메일 형식이 아닙니다.";
                break;
            case "password":
                if (value.length < 6) error = "비밀번호는 최소 6자 이상이어야 합니다.";
                if (!/[a-zA-Z]/.test(value) || !/\d/.test(value)) error = "비밀번호는 숫자와 문자를 포함해야 합니다.";
                break;
            case "confirmPassword":
                if (value !== formData.password) error = "비밀번호가 일치하지 않습니다.";
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 모든 필드 검증
        Object.keys(formData).forEach((key) => validate(key, formData[key]));

        if (Object.values(errors).some((err) => err)) return; // 에러가 있으면 중단

        setLoading(true);

        try {
            // Supabase 회원가입
            const { data, error: signupError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signupError) {
                setErrors((prev) => ({ ...prev, form: signupError.message }));
                setLoading(false);
                return;
            }

            // profit 테이블에 승인 대기 상태로 저장
            await supabase.from("profiles").insert([
                {
                    id: data.user.id, // user의 id를 profit 테이블에 저장
                    username: formData.username,
                    phone: formData.phone,
                    approved: false, // 기본값: 승인 대기
                    email: formData.email
                },
            ]);

            setSignUpYn(true);

        } catch (err) {
            setErrors((prev) => ({ ...prev, form: "회원가입 중 문제가 발생했습니다." }));
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    const handleToLogin = () => {
        router.push('login')
    }

    return (
        <>
            {signUpYn && 
                 <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
                     <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
                         <h2 className="text-lg font-bold mb-3">전기통신금융사기 주의 안내</h2>
                         <p className="text-sm text-gray-600">
                             최근 디지털 자산을 이용한 전기통신금융사기 피해 (보이스피싱)가 많이 발생하고 있어 업비트 웹 회원가입에서는 따로 승인 과정을 받고 있습니다. <br />
                             <a href="#" className="text-blue-500 hover:underline">피해 사례 알아보기 &gt;</a>
                         </p>
                         <ul className="mt-4 space-y-2 text-sm text-gray-700">
                             <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> 국내외 거래소 임직원 및 금융기관 담당자가 금융정보 요구 및 입금을 유도했나요?</li>
                             <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> SNS, 데이팅 앱에서 친해진 외국인이 해외 거래 사이트를 소개하며 회원가입을 유도했나요?</li>
                             <li className="flex items-start"><span className="text-green-500 mr-2">✔</span> 투자 손실 금액을 보존해준다며 특정 사이트 가입, 앱 설치 및 지갑 생성을 요구했나요?</li>
                         </ul>
                         <p className="text-sm text-gray-600 mt-4">
                             위 항목 중 하나라도 해당된다면, 보이스피싱 사기일 수 있습니다.<br />
                             의심이 든다면 즉시 거래를 멈추고 <a href="tel:1533-1111" className="text-blue-500 hover:underline">업비트 보이스피싱 콜센터 (1533-1111)</a>에 연락하세요.
                         </p>
                         <div className="mt-6 flex justify-between">
                             <button  
                                 className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md mr-2 hover:bg-gray-300">
                                 닫기
                             </button>
                             <button 
                                 onClick={handleToLogin} 
                                 className="w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                                 이용하기
                             </button>
                         </div>
                     </div>
                 </div>
             }

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

                <div>
                    <label className="block text-sm font-medium">아이디</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            placeholder="사용할 아이디 입력"
                        />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">전화번호</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="휴대폰 번호 입력"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="이메일 입력"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="비밀번호 입력"
                    />
                    <p className="text-gray-500 text-xs mt-1">비밀번호는 최소 8자 이상이어야 합니다.</p>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">비밀번호 확인</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="bg-white w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="비밀번호 다시 입력"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>

                {/* 약관 동의 */}
                <div className="flex items-center">
                    <input type="checkbox" id="terms" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400" />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                        서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                    </label>
                </div>

                {/* 회원가입 버튼 */}
                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded bg-blue-500 text-white font-semibold ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "처리 중..." : "회원가입"}
                </button>

                {/* 로그인 링크 */}
                <p className="text-center text-gray-600 text-sm mt-4">
                    이미 계정이 있으신가요? <a href="/login" className="text-blue-500 font-medium">로그인</a>
                </p>
            </form>
        </>
    );
};



export default SignUpForm;
