import { useContext } from "react";
import { Stack, Text } from "@chakra-ui/react";
import UserAttributesContext from "../../contexts/UserAttributesContext"

function buildNode(name) {
    // name なし = ゲスト
    if (name) {
        return (
            <></>
        )
    }
    return (
        <Stack marginTop={3}>
          <Text>ログインしていません。ゲストとして投稿できます。</Text>
        </Stack>
      )
}

export const MessageArea = () => {
    const { name } = useContext(UserAttributesContext);
    return buildNode(name)
}