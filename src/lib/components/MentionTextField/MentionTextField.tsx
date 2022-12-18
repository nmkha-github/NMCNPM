import { Avatar, Box, MenuItem } from "@mui/material";
import { ReactNode, useEffect } from "react";
import {
  Mention,
  MentionsInput,
  OnChangeHandlerFunc,
  SuggestionDataItem,
} from "react-mentions";

interface MentionTextFieldProps {
  data: { content: string; icon?: string }[];
  value: string;
  onChange: OnChangeHandlerFunc;
  onBlur?: (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
    clickedSuggestion: boolean
  ) => void;
  placeholder?: string;
  singleLine?: boolean | undefined;
  style?: React.CSSProperties;
  customMention?: ReactNode;
  inputRef?: React.Ref<HTMLTextAreaElement> | React.Ref<HTMLInputElement>;
}

const MentionTextField = ({
  data,
  style,
  value,
  onChange,
  onBlur,
  placeholder,
  singleLine,
  customMention,
  inputRef,
}: MentionTextFieldProps) => {
  return (
    <MentionsInput
      inputRef={inputRef}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      singleLine={singleLine}
      style={{ minHeight: 32, borderRadius: 8, ...style }}
    >
      <Mention
        trigger="@"
        data={data.map(
          (item) =>
            ({ id: item.content, display: item.content } as SuggestionDataItem)
        )}
        renderSuggestion={(
          suggestion: SuggestionDataItem,
          search: string,
          highlightedDisplay: ReactNode,
          index: number,
          focused: boolean
        ) =>
          customMention || (
            <MenuItem
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 16px",
                backgroundColor: focused ? "whitesmoke" : "white",
              }}
            >
              {data.some((item) => !!item.icon) && (
                <Avatar
                  style={{ width: 24, height: 24 }}
                  src={
                    data[index].icon ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalEj8tnk7AywBgsPErBHh2_8vFwc2yZty-mqmzy3t6pP_lN3WnokkH8ghoeFPZ13cs3g&usqp=CAU"
                  }
                />
              )}
              {highlightedDisplay}
            </MenuItem>
          )
        }
      />
    </MentionsInput>
  );
};

export default MentionTextField;
