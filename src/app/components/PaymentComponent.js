'use client'

import Image from "next/image";
import { useState } from "react";
const PaymentComponent = ({setPaymentModalYn, handleTransactionClick, userData, xrpPrice}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);

    const banks = [
        { id: 'bank1', name: '경남은행', imageSrc: '/images/banks/경남.png' },
        { id: 'bank2', name: '광주은행', imageSrc: '/images/banks/광주.png' },
        { id: 'bank3', name: '대구은행', imageSrc: '/images/banks/대구.png' },
        { id: 'bank4', name: '산림조합', imageSrc: '/images/banks/산림조합.png' },
        { id: 'bank5', name: '새마을', imageSrc: '/images/banks/새마을.png' },
        { id: 'bank6', name: '수협', imageSrc: '/images/banks/수협.png' },
        { id: 'bank7', name: '신한', imageSrc: '/images/banks/신한.png' },
        { id: 'bank8', name: '신협', imageSrc: '/images/banks/신협.png' },
        { id: 'bank9', name: '씨티', imageSrc: '/images/banks/씨티.png' },
        { id: 'bank10', name: '우리', imageSrc: '/images/banks/우리.png' },
        { id: 'bank11', name: '우체국', imageSrc: '/images/banks/우체국.png' },
        { id: 'bank12', name: '저축은행', imageSrc: '/images/banks/저축은행.png' },
        { id: 'bank13', name: '전북', imageSrc: '/images/banks/전북.png' },
        { id: 'bank14', name: '제주', imageSrc: '/images/banks/제주.png' },
        { id: 'bank15', name: '카카오뱅크', imageSrc: '/images/banks/카카오뱅크.png' },
        { id: 'bank16', name: '케이뱅크', imageSrc: '/images/banks/케이뱅크.png' },
        { id: 'bank17', name: '토스뱅크', imageSrc: '/images/banks/토스뱅크.png' },
        { id: 'bank18', name: '하나', imageSrc: '/images/banks/하나.png' },
        { id: 'bank19', name: '한국투자증권', imageSrc: '/images/banks/한국투자증권.png' },
        { id: 'bank20', name: 'IBK기업', imageSrc: '/images/banks/IBK기업.png' },
        { id: 'bank21', name: 'KB국민', imageSrc: '/images/banks/KB국민.png' },
        { id: 'bank22', name: 'KEB외환', imageSrc: '/images/banks/KEB외환.png' },
        { id: 'bank23', name: 'NH농협', imageSrc: '/images/banks/NH농협.png' },
        { id: 'bank24', name: 'NH투자증권', imageSrc: '/images/banks/NH투자증권.png' },
        { id: 'bank25', name: 'SBI저축', imageSrc: '/images/banks/SBI저축.png' },
        { id: 'bank26', name: 'SC제일', imageSrc: '/images/banks/SC제일.png' },
        { id: 'bank27', name: '부산', imageSrc: '/images/banks/부산.png' },
    ];

    const handleSelect = (bank) => {
        setSelectedBank(bank);
        setIsOpen(false); // 선택 후 드롭다운 닫기
    };

    const [outpurError, setOutputError] = useState(false)

    const [countError, setCountError] = useState(false);
    const [count, setCount] = useState(0);

    const [wallet, setWallet] = useState('');
    const [name, setName] = useState('');
    const [account, setAccount] = useState();


    const handleSubmit = () => {
        // 벨리데이션 변수
        const isWalletValid = wallet && wallet.length > 0;  // wallet이 비어있지 않으면 valid
        const isNameValid = name && name.length > 0;  // name이 비어있지 않으면 valid
        const isAccountValid = account && account.length > 0;  // account가 비어있지 않으면 valid
        const isBankSelected = selectedBank;  // selectedBank가 비어있지 않으면 valid
        
        // 모든 필드가 유효한지 체크
        if (!isWalletValid || !isNameValid || !isAccountValid || !isBankSelected) {
            setOutputError(true);  // 오류 표시
        } else {
            setOutputError(false);  // 오류 없으면 오류 표시를 false
            handleTransactionClick();  // 제출 처리
        }
    }

    const [sell, setSell] = useState(0);

    const handleCount = (e) => {

        if(userData && userData.balance < e.target.value) {
            setCountError(true)
        } else {

            setSell(e.target.value * xrpPrice)

            setCount(e.target.value)
            setCountError(false)
        }
    }

    // handleTransactionClick

    return (


        <div className="fixed inset-0 z-50 lg:flex lg:items-center lg:justify-center lg:overflow-visible overflow-y-auto py-8 shadow-lg antialiased lg:py-16 block">

            <div className="px-4 2xl:px-0">
                <div className="relative bg-white p-4 rounded-lg shadow-lg border border-gray-300 mx-auto max-w-5xl">
                <h2 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl">출금 신청</h2>
                    <button
                        onClick={() => {setPaymentModalYn(false)}}
                        className="absolute cursor-pointer top-4 right-8 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>

                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-8">
                    <form action="#" className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8">
                     
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        {/* 지갑주소 */}
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900"> 지갑주소* </label>
                            <input onChange={(e) => setWallet(e.target.value)}type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" required />
                        </div>

                        {/* 계좌번호 */}
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900"> 성명 </label>
                            <input onChange={(e) => setName(e.target.value)} type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                        </div>

                        <div className="col-span-2 sm:col-span-1 relative">
                            <label className="mb-2 block text-sm font-medium text-gray-900">
                                은행*
                            </label>
                            
                            {/* 선택된 항목 표시 */}
                            <div
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {selectedBank ? (
                                <div className="flex items-center">
                                    <Image src={selectedBank.imageSrc} width={20} height={20} alt={selectedBank.name} />
                                    <span className="ml-2">{selectedBank.name}</span>
                                </div>
                                ) : (
                                <span>은행을 선택하세요</span>
                                )}
                            </div>

                            {/* 옵션 목록 */}
                            {isOpen && (
                                <div className="absolute h-48 overflow-y-auto mt-1 w-full rounded-lg border border-gray-300 bg-white z-10">
                                {banks.map((bank) => (
                                    <div
                                    key={bank.id}
                                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelect(bank)}
                                    >
                                    <Image src={bank.imageSrc} width={20} height={20} alt={bank.name} />
                                    <span className="ml-2">{bank.name}</span>
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900"> 계좌번호* </label>
                            <input onChange={(e) => setAccount(e.target.value)} type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="- 없이 입력하세요" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                        </div>

                        {/* Card Expiration (전체 그리드 차지) */}
                        <div className="col-span-2">
                            <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900"> 출금 수량* </label>
                            <div className="relative">
                            <input onChange={handleCount} type="number" id="card-expiration-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="출금 수량을 입력하세요" required />
                            </div>
                            {countError && <div className="text-red-500 text-sm m-1">보유 수량을 초과할 수 없습니다</div> }
                        </div>
                        </div>

                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 ">Pay now</button>
                    </form>

                    <div className="mt-6 w-full grow sm:mt-8 lg:mt-0">
                    <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 ">
                        <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 ">출금금액</dt>
                            <dd className="text-base font-medium text-gray-900 ">{sell.toLocaleString('ko-KR')}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 ">수량</dt>
                            <dd className="text-base font-medium text-green-500">{count}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 ">수수료</dt>
                            <dd className="text-base font-medium text-gray-900">$0</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 "></dt>
                            <dd className="text-base font-medium text-gray-900 "></dd>
                        </dl>
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                        <dt className="text-base font-bold text-gray-900 ">Total</dt>
                        <dd className="text-base font-bold text-gray-900 ">{sell.toLocaleString('ko-KR')}KRW</dd>
                        </dl>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-8">
                        <button onClick={handleSubmit} className="cursor-pointer p-4 bg-blue-600 text-white rounded-lg w-full font-bold">출금하기</button>
                    </div>
                    {outpurError && <div className="text-red-500 text-sm">항목을 입력하세요</div>}
                    </div>
                </div>

                <p className="mt-6 text-center text-gray-500  sm:mt-8 lg:text-left">
                    신뢰할 수 없는 지갑이나 거래소로 출금하지 마세요.
                </p>
                </div>
            </div>
            </div>
    );
};

export default PaymentComponent;
