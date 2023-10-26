import React, { useState } from "react";
import "./Input.scss";
import { eye, info_circle, calendar, eyeclose } from "@/assets";
import { FieldInputProps, FieldMetaState } from "react-final-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

interface InputProp {
  type: string;
  label: string;
  tooltip: string;
  input: FieldInputProps<string>;
  meta: FieldMetaState<string | boolean>;
  password: string;
  select: string;
  selectDefault: string;
  options: string;
  textArea: string;
  placeholder: string;
  number: string;
  date: string;
  className: string;
  disabled: boolean;
  required: boolean;
}

const Input = ({
  type = "text",
  label,
  tooltip,
  date,
  input,
  meta,
  password,
  select,
  selectDefault,
  options,
  textArea,
  placeholder,
  className,
  disabled,
  required = true,
}: InputProp) => {
  const [passwordType, setPasswordType] = useState("password");
  // const parseDate = (value) => {
  // console.log(value.target);
  // return parseISO(value).toISOString();
  // };

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className={`input ${className}`}>
      <div className="input_label_wrap between">
        {label && (
          <div className="input_label_wrap_text">
            {label}{" "}
            {required && (
              <span className="input_label_wrap_text_required">*</span>
            )}
          </div>
        )}

        <div className="tooltip">
          {tooltip && (
            <>
              <img src={info_circle} alt="icon" />
              <div className="tooltip_pop_up">{tooltip}</div>
            </>
          )}
        </div>
      </div>
      <div className="input_main_wrap" style={{ height: textArea && "110px" }}>
        {select ? (
          <select
            className="input_main"
            // onChange={input.value}
            {...input}
            style={{ width: "100%" }}
          >
            <option value="">{selectDefault || "Select an option"}</option>
            {Object.entries(options || {})?.map((option) => {
              return (
                <option key={option[1]} value={option[1]}>
                  {option[0]}
                </option>
              );
            })}
          </select>
        ) : textArea ? (
          <textarea
            className="input_main"
            {...input}
            style={{
              width: "100%",
              height: "100%",
            }}
            rows={4}
          />
        ) : date ? (
          // <DatePicker
          //   className="datepicker"
          //   {...input}
          //   selected={input.value}
          //   onChange={input.onChange}
          //   onChangeRaw={(date) => input.onChange(parseDate(date))}
          //   dateFormat="dd/MM/yyyy"
          // />

          // <DatePicker
          //   className="datepicker"
          //   selected={input.value ? new Date(input.value) : null}
          //   onChange={(date) =>
          //     input.onChange(date?.toISOString()?.split("T")[0])
          //   }
          //   dateFormat="yyyy-MM-dd"
          // />
          <div />
        ) : (
          <input
            className="input_main"
            {...input}
            style={{ width: !date || !password ? "100%" : "" }}
            type={password ? passwordType : type}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        {password && (
          <div className="date center" onClick={togglePasswordType}>
            <img
              src={passwordType === "password" ? eyeclose : eye}
              alt="icon"
            />
          </div>
        )}
        {date && (
          <div className="date end">
            <img src={calendar} alt="icon" />
          </div>
        )}
      </div>
      {meta.error && meta.touched && (
        <span className="input_error">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
