import { memo, useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createReport } from "../../../graphql/mutations";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import UserAttributesContext from "../../../contexts/UserAttributesContext";

function createReportJSON(questname, runcount, lines, userAttributes) {
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
    const regex = /(\(x|\(\+)(\d+)\)/;
    const match = material.match(regex);

    let stack = null;
    if (match) {
      material = material.replace(regex, "").trim();
      stack = parseInt(match[2], 10);
    }

    const drop = {
      num: report,
      stack,
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
        bonus: null,
        dropUpRate: null,
      };
    }
  );

  console.log(userAttributes);
  return {
    name: userAttributes.name,
    type,
    warName,
    questName,
    timestamp,
    runs,
    url: null,
    memo: null,
    dropObjects,
  };
}

export const ReportButton = memo((props) => {
  const { questname, runcount, lines } = props;
  const userAttributes = useContext(UserAttributesContext);

  const toast = useToast();

  async function AddReport(report) {
    try {
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
  }

  const handleClick = () => {
    const reportData = createReportJSON(
      questname,
      runcount,
      lines,
      userAttributes
    );
    console.log(reportData);
    AddReport(reportData);
  };

  return (
    <Button size="sm" colorScheme="twitter" onClick={handleClick}>
      投稿する
    </Button>
  );
});
