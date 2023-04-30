import { Box, Heading, Text, VStack, Divider, Link } from "@chakra-ui/react";

const Service = () => {
  return (
    <Box maxW="3xl" mx="auto" p="4">
      <VStack spacing="8">
        <Heading as="h1" size="lg">
          当サイトの利用法について
        </Heading>
        <Text>
          これまで、FGOアイテム効率劇場ではTwitter APIを利用し、Twitter上の
          #FGO周回カウンタ
          で投稿された周回報告を自動集計していました。しかし、Twitter
          APIの有料化に伴い、この方法を続けることが困難になりました。そこで、今後は当サイトへ直接投稿された周回報告を集計することとなります。
        </Text>
        <Text>
          今までのようにTwitterを利用する場合、当サイトを経由することで手間が増えますが、投稿は引き続き可能です。当サイトを利用せずに直接Twitter上で周回報告をした場合、集計対象にはなりませんのでご注意ください。
        </Text>
        <Divider />
        <Text>
          当サイトではアカウント登録機能が提供されておりますが、匿名投稿も可能です。ただし、匿名投稿には次の制限が適用されます:
        </Text>
        <Box as="ol">
          <Text pl="4" as="li">
            周回数ランキングなどの企画への参加ができません。
          </Text>
          <Text pl="4" as="li">
            匿名投稿内容の修正依頼は受け付けられません（投稿者が特定できないため）。
          </Text>
        </Box>
        <Text>
          当サイトで作成したアカウントによって投稿者の特定が可能ですが、Twitterユーザーと周回報告を関連付けたい場合は、アカウント作成後にTwitterとの連携操作が必要です。当サイトへのアカウント登録にはメールアドレスが必須ですが、これは登録されたメールアドレスとTwitterアカウントの関連付けをサイト管理者が知りうるということを意味します。ただし、当サイトでは{" "}
          <Link href="/privacy-policy" color="teal.500">
            プライバシーポリシー
          </Link>
          に基づいて登録された情報を管理、運用することを宣言しています。もしプライバシーに関する懸念がある場合は、別途専用のメールアドレス（Twitterと関連付けしても問題のないもの）を用意してアカウントを登録してください。
        </Text>
        <Text>
          fgosccntやfgosccalcで作成された周回報告データは、ワンクリックで当サイトに連携できます。そのため、当サイトの投稿フォーム上で必要な情報を追記して投稿を行うことができます。
        </Text>
      </VStack>
    </Box>
  );
};

export default Service;
