'use client'

import { useState } from "react";
import SignUpAgreement from "../components/signup/SignUpAgreement";
import { useRouter } from "next/navigation";
import LogoHeader from "../components/signup/LogoHeader";
import SignUpForm from "../components/signup/SIgnUpForm";
import Image from "next/image";

const SignUp = () => {

    const router = useRouter();

    const [nextYn, setNextYn] = useState(false);
    
    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-4 rounded-lg max-w-4xl">
                <LogoHeader />
                <div className="flex justify-center items-center rounded-lg bg-gray-300 m-2 p-2">
                    <Image
                        src={"/images/warning.png"}
                        width={70}
                        height={70}
                        alt="warning"
                    />
                    <div className="ml-2 text-sm">
                    계정 보안을 위해 강력한 비밀번호를 설정하고, 2단계 인증을 활성화하는 것을 권장합니다. 당사는 보안 강화 조치를 제공하지만, 개인 정보 유출 및 해킹 사고에 대한 최종 책임은 사용자에게 있습니다.
                    </div>
                </div>
                {nextYn ? 
                  <SignUpForm/>
                : <SignUpAgreement setNextYn={setNextYn}/>
                }
            </div>
        </div>
        
    )
} 

export default SignUp;
