import React, { useCallback, useRef, useState } from "react";
import { ErrorMessage } from "../../components/common/Fonts";
import { Button } from "antd";
import "./ConfirmCode.css";

export function ConfirmCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const inputRefs = useRef<any[]>([]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setShowErrorMessage(false);

    const newArr = [...code];
    newArr[index] = e.target.value;
    setCode(newArr);

    if (e.target.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }, [code]);

  const handleBackspaceAndEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    setShowErrorMessage(false);

    if(e.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'Enter' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const verifyCode = useCallback(() => {
    if (code.join("").length === 6) {
      console.log("Confirm code: ", code.join(""));
    } else {
      setShowErrorMessage(true);
    }
  },[code]);

  return (
    <>
      <div>Please input the code from email</div>
      <div className="confirmcode-inputs">
        {[0, 1, 2, 3, 4, 5].map(num => (
          <input
            key={num}
            type="text"
            maxLength={1}
            ref={(ref) => inputRefs.current[num] = ref }
            onKeyUp={(e) => handleBackspaceAndEnter(e, num)}
            onChange={(e) => handleChange(e, num)}
          />
        ))}
      </div>
      {showErrorMessage && <ErrorMessage>Invalid code</ErrorMessage>}
      <Button type="primary" onClick={verifyCode}>Verify</Button>
    </>
  );
}