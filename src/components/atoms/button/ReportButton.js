import { memo, useState, useContext } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { createReport } from "../../../graphql/mutations";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import UserAttributesContext from "../../../contexts/UserAttributesContext";

function createReportJSON(
  questname,
  runcount,
  lines,
  note,
  name,
  twitterId,
  twitterUsername,
  twitterName
) {
  const normalWarNames = [
    "冬木",
    "オルレアン",
    "セプテム",
    "オケアノス",
    "ロンドン",
    "北米",
    "キャメロット",
    "バビロニア",
    "新宿",
    "アガルタ",
    "下総国",
    "セイレム",
    "アナスタシア",
    "ゲッテルデメルング",
    "シン",
    "ユガ・クシェートラ",
    "アトランティス",
    "オリュンポス",
    "平安京",
    "アヴァロン",
    "トラオム",
    "ナウイ・ミクトラン",
  ];

  let warName = null;
  let questName = questname;

  // if (name) {
  //   if (
  //     twitterId !== undefined &&
  //     twitterId !== null &&
  //     twitterId !== ""
  //   ) {
  //     twitterId = user.attributes["custom:twitter_id"];
  //   }

  //   if (
  //     twitterUsername !== undefined &&
  //     twitterUsername !== null &&
  //     twitterUsername !== ""
  //   ) {
  //     twitter_name = user.attributes["custom:twitter_name"];
  //   }

  //   if (
  //     user.attributes["custom:twitter_username"] !== undefined &&
  //     user.attributes["custom:twitter_username"] !== null &&
  //     user.attributes["custom:twitter_username"] !== ""
  //   ) {
  //     twitter_username = user.attributes["custom:twitter_username"];
  //   }
  // }

  // questname が normalWarNames + " " で始まる場合、" " で分割して warName と questName を設定
  for (const normalWarName of normalWarNames) {
    if (questname.startsWith(normalWarName + " ")) {
      const splitQuestName = questname.split(" ");
      warName = splitQuestName[0];
      questName = splitQuestName.slice(1).join(" ");
      break;
    }
  }

  const runs = runcount;
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const type = normalWarNames.includes(warName) ? "normal" : "event";

  const dropObjectsMap = new Map();

  for (let { material, report } of lines) {
    // materialが空文字列の場合は無視する
    if (material === "") {
      continue;
    }
    // reportが"NaN"の場合は無視する
    if (report === "NaN") {
      continue;
    }
    const regex = /(\(x|\(\+)(\d+)\)/;
    const match = material.match(regex);

    let stack = null;
    if (match) {
      material = material.replace(regex, "").trim();
      stack = parseInt(match[2], 10);
    }

    const drop = {
      num: report,
      ...(stack !== null && { stack }),
    };

    if (dropObjectsMap.has(material)) {
      dropObjectsMap.get(material).push(drop);
    } else {
      dropObjectsMap.set(material, [drop]);
    }
  }

  const dropObjects = Array.from(dropObjectsMap.entries()).map(
    ([objectName, drops]) => {
      return {
        objectName,
        drops,
      };
    }
  );

  return {
    ...(name !== undefined && { name }),
    type,
    ...(warName !== undefined && { warName }),
    questName,
    timestamp,
    runs,
    note,
    dropObjects,
    ...(twitterId !== null && { twitterId }),
    ...(twitterName !== null && { twitterName }),
    ...(twitterUsername !== null && { twitterUsername }),
  };
}

export const ReportButton = memo((props) => {
  const { name, twitterId, twitterName, twitterUsername } = useContext(
    UserAttributesContext
  );
  const [loading, setLoading] = useState(false);
  const { questname, runcount, lines, note } = props;

  const toast = useToast();

  async function AddReport(report) {
    setLoading(true);
    try {
      // ログイン状態によって認証方式を切り替える
      if (name) {
        Amplify.configure({
          aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
        });
      } else {
        Amplify.configure({
          aws_appsync_authenticationType: "API_KEY",
        });
      }
      const result = await API.graphql(
        graphqlOperation(createReport, { input: report })
      );
      console.log("Report created:", result.data.createReport);
      toast({
        title: "投稿完了",
        description: "周回報告の投稿が完了しました",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating report:", error);
      toast({
        title: "投稿失敗",
        description: "周回報告の投稿に失敗しました",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  const handleClick = () => {
    const reportData = createReportJSON(
      questname,
      runcount,
      lines,
      note,
      name,
      twitterId,
      twitterUsername,
      twitterName
    );
    console.log(reportData);
    AddReport(reportData);
  };

  return (
    <Button
      size="sm"
      colorScheme="twitter"
      isLoading={loading}
      onClick={handleClick}
      // isDisabled={name === null || name === undefined}
    >
      投稿する
    </Button>
  );
});
