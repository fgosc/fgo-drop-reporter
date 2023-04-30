import {
  Container,
  Heading,
  Text,
  VStack,
  ListItem,
  UnorderedList,
  Link,
} from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="2xl">
          FGO Drop Reporterプライバシーポリシー
        </Heading>
        <Text>最終更新日: 2023年4月30日</Text>

        <Heading as="h2" size="lg">
          1. はじめに
        </Heading>
        <Text>
          本プライバシーポリシーでは、FGO Drop
          Reporter（以下、「当サイト」といいます）が、Fate/Grand
          Orderのクエスト周回時のドロップデータを収集する際に、ユーザーから提供される情報の取り扱いについて説明します。
        </Text>

        <Heading as="h2" size="lg">
          2. 年齢制限
        </Heading>
        <Text>
          当サイトは、年齢制限を設けず、すべての年齢層のユーザーにサービスを提供します。
        </Text>
        <Heading as="h2" size="lg">
          3. 収集される情報
        </Heading>
        <Text>当サイトでは、以下の情報を収集します。</Text>
        <UnorderedList ml={6}>
          <ListItem>メールアドレス</ListItem>
          <ListItem>
            オプションでTwitterアカウント（id, name, screen_name）
          </ListItem>
        </UnorderedList>
        <Heading as="h2" size="lg">
          4. 情報収集方法
        </Heading>
        <Text>情報は、ユーザーがアカウント登録を行う際に収集されます。</Text>
        <Heading as="h2" size="lg">
          5. 情報の使用目的
        </Heading>
        <Text>
          収集した情報は、投稿データとアカウントを紐付けることで、統計の作成・ランキング作成・データの削除・更新などに使用されます。
        </Text>
        <Heading as="h2" size="lg">
          6. 第三者との情報共有
        </Heading>
        <Text>
          投稿データを統計作成目的で第三者に共有する場合があります。ただし、メールアドレスは共有せず、登録したusername,
          Twitterアカウントのid, nameおよびscreen_nameのみ提供します。{" "}
        </Text>
        <Heading as="h2" size="lg">
          7. ユーザーの権利
        </Heading>
        <Text>
          ユーザーは自身の情報にアクセスでき、どのような個人情報が登録されているか確認できます。訂正手続きはメール連絡になります。Twitterに関しては連携をやり直すことで更新・削除が可能です。
          アカウントの削除を申請した場合でも、投稿したデータはアカウントとの紐づけをなくすだけでデータ自体は残ります。{" "}
        </Text>
        <Heading as="h2" size="lg">
          8. データ保持期間
        </Heading>
        <Text>
          アカウントが削除されない限り、サービスが運用されている期間中はデータを保存し続けます。サービス終了時にはすべての個人情報を削除します。
        </Text>
        <Heading as="h2" size="lg">
          9. クッキーおよび追跡技術
        </Heading>
        <Text>
          当サイトでは、AWS
          Cognitoを利用して認証情報をブラウザに保存します。これにより、毎回のログインが不要となり、利便性が向上します。また、Twitterアカウントとの紐付けを行う場合は、id、name、およびscreen_nameを当サイトに保存します。{" "}
        </Text>
        <Heading as="h2" size="lg">
          10. 情報の保護
        </Heading>
        <Text>
          通信はSSLによって暗号化されています。また、AWSが提供するアクセス制限により、第三者へ提供しない範囲の個人情報へのアクセスは制限されています。{" "}
        </Text>
        <Heading as="h2" size="lg">
          11. プライバシーポリシーの改定
        </Heading>
        <Text>
          プライバシーポリシーの改定は、当サイトのお知らせでユーザーに通知します。
        </Text>
        <Heading as="h2" size="lg">
          12. お問い合わせ窓口
        </Heading>
        <Text>
          プライバシーポリシーに関する問い合わせは、以下の連絡先にお願いします。
        </Text>
        <UnorderedList ml={6}>
          <ListItem>
            fgophi ＠ gmail.com (" ＠ " を"@"に変換してください)
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/fgophi" isExternal>
              twitter: @fgophi
            </Link>
          </ListItem>
        </UnorderedList>
      </VStack>
    </Container>
  );
};

export default PrivacyPolicy;
