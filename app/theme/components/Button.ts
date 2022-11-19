import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  variants: {
    solid: {
      bg: "primaryButtonBg",
      color: "primaryButtonColor",
      _hover: {
        bg: "primaryButtonHoverBg",
      },
    },
    reverse: {
      color: "reverseButtonColor",
      border: "none",
      _hover: {
        bg: "reverseButtonHoverBg",
      },
      borderRadius: "22px",
    },
  },
});
