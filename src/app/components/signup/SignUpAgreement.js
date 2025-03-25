'use client';

import { useState } from "react";

const SignUpAgreement = ({setNextYn}) => {


    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        privacy: false,
        age: false,
        marketing: false,
    });

    // 전체 동의 체크박스 처리
    const handleAllChange = (e) => {
        const { checked } = e.target;
        setAgreements({
            all: checked,
            terms: checked,
            privacy: checked,
            age: checked,
            marketing: checked,
        });
    };

    // 개별 체크박스 처리
    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;
        setAgreements((prev) => ({
            ...prev,
            [name]: checked,
            all: prev.terms && prev.privacy && prev.age && prev.marketing && checked,
        }));
    };

    const allChecked = agreements.terms && agreements.privacy && agreements.age;

    // 회원가입 폼으로 이동
    const handleNext = () => {
        if (allChecked) {
            setNextYn(true) // 회원가입 폼으로 이동
        }
    };
   

    return (
       <>
        <div className="space-y-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="all"
                    name="all"
                    checked={agreements.all}
                    onChange={handleAllChange}
                    className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="all" className="ml-2 text-sm font-medium mb-2 mt-2">전체 동의 (선택사항 포함)</label>
            </div>

            <div className="w-full border-b border-gray-300"></div>

            {/* 개별 동의 체크박스들 */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleAgreementChange}
                    className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm">[필수] 이용약관 동의</label>
            </div>
            <div className="bg-white p-3 rounded-md max-h-32 overflow-y-auto text-sm ">
                <p className="text-sm">업비트 서비스를 이용하기 위한 기본 약관입니다. 회원가입 및 서비스 이용에 필수적으로 동의해야 합니다.</p>
                <p>- 서비스 이용과 관련된 기본적인 사항</p>
                <p>- 회원의 권리와 의무</p>
                <p>- 서비스 제공 범위 및 책임</p>
                <p>- 서비스 제한 및 해지 조건</p>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleAgreementChange}
                    className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="privacy" className="ml-2 text-sm">[필수] 개인정보 수집 및 이용 동의</label>
            </div>


            <div className="bg-white p-3 rounded-md max-h-32 overflow-y-auto text-sm ">
                <p className="text-sm">업비트는 서비스를 제공하기 위해 이용자의 개인정보를 수집하고, 수집된 정보는 관련 법률에 따라 보호됩니다.</p>
                <p>- 수집 항목: 이름, 연락처, 이메일 주소, 계좌 정보 등</p>
                <p>- 이용 목적: 회원 관리, 서비스 제공, 고객 상담 및 불만 처리, 마케팅 및 광고 제공</p>
                <p>- 보유 기간: 회원 탈퇴 후 5년간 보관</p>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="age"
                    name="age"
                    checked={agreements.age}
                    onChange={handleAgreementChange}
                    className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="age" className="ml-2 text-sm">[필수] 연령 확인 (만 14세 이상)</label>
            </div>
            
            <div className="bg-white p-3 rounded-md max-h-32 overflow-y-auto text-sm ">
                <p className="text-sm">업비트 서비스는 만 19세 이상만 이용할 수 있습니다. 미성년자는 서비스 이용이 제한됩니다.</p>
            </div>

            

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="marketing"
                    name="marketing"
                    checked={agreements.marketing}
                    onChange={handleAgreementChange}
                    className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="marketing" className="ml-2 text-sm ">[선택] 이벤트, 우대 혜택 수신 동의</label>
            </div>
        </div>
        <div className="bg-white p-3 rounded-md max-h-32 overflow-y-auto text-sm mt-2 ">
            <p className="text-sm">이메일, 문자 메시지 등을 통해 업비트의 최신 이벤트, 프로모션 및 혜택에 대한 정보를 수신할 수 있습니다.</p>
        </div>

        <button
            className={`mt-6 w-full py-2 px-4 rounded-md text-white font-semibold ${
                allChecked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!allChecked}
            onClick={handleNext}
        >
            동의하고 다음
        </button>
       </>
           
    );
};

export default SignUpAgreement;
