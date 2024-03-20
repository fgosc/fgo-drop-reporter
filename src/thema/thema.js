import { extendTheme, defineStyleConfig } from "@chakra-ui/react";

const InputStyle = {
  variants: {
    outline: {
      field: {
        background: "white",
      },
    },
  },
};

// NOTE: defineStyleConfig() を入れないと効果が適用されない理由はよくわかっていない
const TextareaStyle = defineStyleConfig({
  variants: {
    outline: {
      background: "white",
    },
  },
});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "blue.100",
        color: "gray.800",
      },
    },
  },
  components: {
    Input: InputStyle,
    NumberInput: InputStyle,
    Textarea: TextareaStyle,
  },
});

export default theme;
