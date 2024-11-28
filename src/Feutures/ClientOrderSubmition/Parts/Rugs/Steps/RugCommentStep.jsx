import { Stack, Textarea, Text } from "@chakra-ui/react";
import React from "react";

export const RugCommentStep = ({ register }) => {
  return (
    <>
      <Text color="gray.500">Add additional comments...</Text>
      <Textarea
        placeholder="for example: rug no./works reference / rug placement in-situ / specific customer requests"
        {...register("Comment")}
      />
    </>
  );
};
