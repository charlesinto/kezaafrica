import React, { useState, useEffect } from "react";
const OtpInput = ({ digits, onChange }) => {
  const [focuses, setFocus] = useState([
    ...Array(digits)
      .fill(undefined)
      .map((_, i) => {
        return { key: i, state: false, filled: false };
      }),
  ]);
  const refs = [
    ...Array(digits)
      .fill(undefined)
      .map((_, i) => {
        return { key: i };
      }),
  ];
  const [pin, setPin] = useState("");
  const handleFocus = (index) => {
    setFocus((focuses) => {
      return focuses.map((focus) =>
        focus.key === index ? { ...focus, key: index, state: true } : focus
      );
    });
  };
  const handleBlur = (index) => {
    setFocus((focuses) => {
      return focuses.map((focus) =>
        focus.key === index ? { ...focus, key: index, state: false } : focus
      );
    });
  };
  const generateRef = (index) => {
    const ref = refs.find((ref) => ref.key === index);
    ref.ref = React.createRef();
    return ref.ref;
  };
  const handleOnTextChange = (event, index) => {
    const {
      target: { value },
    } = event;
    setFocus((focuses) =>
      focuses.map((focus) =>
        focus.key === index && value.length > 0
          ? { ...focus, filled: true }
          : focus
      )
    );
    const nextIndex = index + 1;
    const previousIndex = index - 1;
    setPin((val) =>
      digits && value.length > 0
        ? `${val}${value}`
        : val.replace(val.slice(index), "")
    );
    if (digits) {
      nextIndex < digits && value.length > 0
        ? refs.find((ref) => ref.key === nextIndex)?.ref?.current.focus()
        : value.length < 1 &&
          refs.find((ref) => ref.key === previousIndex)?.ref?.current.focus();
    }
  };
  useEffect(() => {
    if (digits && pin.length === digits) {
      if (focuses.every((focus) => focus.filled === true)) {
        onChange && onChange(pin);
      }
    }
    // eslint-disable-next-line
  }, [pin.length]);
  return (
    <div className="d-flex flex-row gap-2 my-3">
      {[...Array(digits)].fill(undefined).map((_, i) => {
        return (
          <input
            key={i}
            className="form-control"
            maxLength={1}
            autoFocus={i === 0}
            focus={
              focuses.find((focus) => focus.key === i)
                ? focuses.find((focus) => focus.key === i).state
                : undefined
            }
            onFocus={() => handleFocus(i)}
            onBlur={() => handleBlur(i)}
            ref={generateRef(i)}
            onChange={(e) => handleOnTextChange(e, i)}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
