import { Textarea } from "@chakra-ui/react";
import React from "react";

export const RugCommentStep = ({ register }) => {
  return <Textarea placeholder="write a comment" {...register("Comment")} />;
};
