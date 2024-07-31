"use client";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
export default function FormInput({
  title,
  type,
  required,
  value,
  setValue,
  isReadOnly = false,
}) {
  // const [input, setInput] = useState("");
  const params = useParams();

  // const handleInputChange = (e) => setInput(e.target.value);

  const isError = value === "";

  return (
    <FormControl fontFamily={"roboto"} isRequired={required}>
      <FormLabel
        fontWeight={"300"}
        fontSize={"16px"}
        lineHeight={"24px"}
        color={"rgba(54, 54, 54, 1)"}
      >
        {title}
      </FormLabel>
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={title}
        border={"1px solid rgba(160, 160, 160, 1)"}
        borderRadius={"10px"}
        isReadOnly={isReadOnly}
        h={{base:'38px',lg:"56px"}}
        _placeholder={{
          color: "rgba(160, 160, 160, 1)",
        }}
        _focus={{
          borderColor: "rgba(203, 70, 9, .5)",
          boxShadow: "0 0 0 1px rgba(203, 70, 9, .25)",
        }}
      />
      {isError && (
        <FormErrorMessage fontWeight={"400"} fontSize={"12px"}>
          {title}{" "}
          {params.locale === "ru" ? "обязательное поле." : "милдеттүү талаа.."}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
