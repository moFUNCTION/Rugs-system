import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { ErrorText } from "../ErrorText/ErrorText";
import { forwardRef } from "react";
export const InputElement = forwardRef(
  (
    {
      Icon,
      size,
      name,
      placeholder = name,
      errors = [],
      register,
      type,
      containerStyles,
      ...rest
    },
    ref
  ) => {
    return (
      <Stack w="100%" {...containerStyles}>
        <InputGroup size={size} variant="filled">
          <InputLeftElement pointerEvents="none">
            {Icon && (
              <Icon
                style={{
                  color: "gray",
                }}
              />
            )}
          </InputLeftElement>
          <Input
            isInvalid={errors[name]}
            placeholder={placeholder}
            ref={ref}
            type={type}
            {...register(name, {
              valueAsNumber: type === "number",
            })}
            {...rest}
          />
          {errors[name] && (
            <InputRightElement pointerEvents="none">
              <MdCancel
                style={{
                  color: "red",
                }}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <ErrorText>{errors[name]?.message}</ErrorText>
      </Stack>
    );
  }
);

InputElement.displayName = "InputElement";
