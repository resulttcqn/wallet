'use client';

import Image from "next/image";

const LogoHeader = () => {
    return (
        <div className="flex justify-center mb-2">
            <Image
                src={"/images/Upbit.png"}
                width={300}
                height={50}
                alt="Upbit logo"
            />
        </div>
    );
};

export default LogoHeader;