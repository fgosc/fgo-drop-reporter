import { useState, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createReport } from "../../../graphql/mutations";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import UserAttributesContext from "../../../contexts/UserAttributesContext";
import ReportParamContext from "../../../contexts/ReportParamContext";

function createReportJSON(
  questname,
  runs,
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

  for (const normalWarName of normalWarNames) {
    if (questname.startsWith(normalWarName + " ")) {
      const splitQuestName = questname.split(" ");
      warName = splitQuestName[0];
      questName = splitQuestName.slice(1).join(" ");
      break;
    }
  }

  const timestamp = Math.floor(new Date().getTime() / 1000);
  const type = normalWarNames.includes(warName) ? "normal" : "event";

  const dropObjectsMap = new Map();

  for (let { material, report } of lines) {
    // 最初の文字が "!" の場合、削除する
    if (material.startsWith("!")) {
      material = material.slice(1);
    }
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

export const ReportButton = () => {
  const { name, twitterId, twitterName, twitterUsername } = useContext(
    UserAttributesContext
  );

  const {
    questname,
    runs,
    lines,
    note,
    isReportButtonEnabled,
    setIsReportButtonEnabled,
    setIsTweetButtonEnabled,
  } = useContext(ReportParamContext);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  useEffect(() => {
    const hasNonEmptyMaterial = lines.some((line) => line.material !== "");
    if (runs > 0 && questname !== "" && hasNonEmptyMaterial) {
      setIsReportButtonEnabled(true);
    } else {
      setIsReportButtonEnabled(false);
    }
  }, [runs, questname, lines, setIsReportButtonEnabled]);

  async function AddReport(report) {
    setLoading(true);
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
      setIsReportButtonEnabled(false);
      setIsTweetButtonEnabled(true);
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
      runs,
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
      isDisabled={!isReportButtonEnabled}
    >
      投稿する
    </Button>
  );
};
