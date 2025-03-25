'use client'

import { useEffect, useState } from 'react';

const Security = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // 외부에서 window.showOverlay()를 호출하면 오버레이가 표시되도록 설정
    window.showOverlay = () => {
      setShowOverlay(true); // 오버레이 표시
    };

    window.hideOverlay = () => {
      setShowOverlay(false); // 오버레이 숨기기
    };

    // Cleanup 시점에 window 객체에서 함수 제거
    return () => {
      delete window.showOverlay;
      delete window.hideOverlay;
    };
  }, []);

  return (
    <div>

      {/* 오버레이 표시 */}
      {showOverlay && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 1)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: 'white' }}>This content is restricted</h1>
        </div>
      )}
    </div>
  );
};

export default Security;
