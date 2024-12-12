import { useState, useEffect } from "react";

// useDebounce 훅: 입력된 값을 지연시켜 반환하는 기능을 제공
// value: 디바운싱할 값
// delay: 지연 시간(ms 단위)
const useDebounce = (value, delay) => {
  // 디바운싱된 값을 저장하는 상태
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 지정된 delay 시간 후에 debouncedValue를 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 컴포넌트가 언마운트되거나 value/delay가 변경되었을 때 타이머를 정리
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value와 delay가 변경될 때마다 이 효과 실행

  // 디바운싱된 값 반환
  return debouncedValue;
};

export default useDebounce;
