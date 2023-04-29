import { extendTheme, defineStyleConfig } from "@chakra-ui/react";

const InputStyle =  {
  variants: {
    outline: {
      field: {
        background: "white",
      }
    }
  }
}

const TextareaStyle =  defineStyleConfig({
  variants: {
    outline: {
      background: "white",
    }
  }
})

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800",
      },
    },
  },
  components: {
    Input: InputStyle,
    NumberInput: InputStyle,
    // NOTE: これを入れないと効果がない理由はよくわかっていない
    Textarea: TextareaStyle,
  },
});

export default theme;
