import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEventHandler, useState } from "react";
import "./InputRow.css";
import ShowHideButton from "./ShowHideButton.util.component";
interface InputRowProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  haveError: boolean;
  errorText:string;
}
const InputRow = ({ id, name, type, placeholder, onChange,haveError, errorText}: InputRowProps) => {
  const [typeHandler, setTypeHandler] = useState(type);
  const changeShowHideStatus = () => {
    if (typeHandler === "password") {
      setTypeHandler("text");
    } else {
      setTypeHandler("password");
    }
  };
  return (
    <div className="relative mb-6">
      <TextField
        id={id}
        name={name}
        type={typeHandler}
        placeholder={placeholder}
        onChange={onChange}
        required
        error={haveError}
        helperText={errorText}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-500 focus:outline-none focus:ring-500 text-xl font-normal input active:outline-none"
      />
      {name === "password" && (
        <ShowHideButton
          title={typeHandler === "password" ? "show" : "hide"}
          onClick={changeShowHideStatus}
        />
      )}
    </div>
  );
};

export default InputRow;
