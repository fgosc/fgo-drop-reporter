import { useState, useContext, useEffect, useRef } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { createReport } from "../../../graphql/mutations";
import {
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import UserAttributesContext from "../../../contexts/UserAttributesContext";
import ReportParamContext from "../../../contexts/ReportParamContext";
import { sha256 } from "js-sha256";

function convertStringToNumber(str) {
  str = str.replace(/百万/g, "000000");
  str = str.replace(/万/g, "0000");
  str = str.replace(/千/g, "000");
  return parseInt(str, 10);
}

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
    "ブラックヒルズ",
    "リバートン",
    "デンバー",
    "デミング",
    "ダラス",
    "アルカトラズ",
    "デモイン",
    "モントゴメリー",
    "ラボック",
    "アレクサンドリア",
    "カーニー",
    "シャーロット",
    "ワシントン",
    "シカゴ",
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
    "オーディール・コール",
    "ペーパームーン",
  ];

  const chaldeaGateWarNames = [
    "宝物庫",
    "剣の修練場",
    "弓の修練場",
    "槍の修練場",
    "狂の修練場",
    "騎の修練場",
    "術の修練場",
    "殺の修練場",
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
  for (const chaldeaGateWarName of chaldeaGateWarNames) {
    if (questname.startsWith(chaldeaGateWarName + " ")) {
      const splitQuestName = questname.split(" ");
      warName = "カルデアゲート";
      break;
    }
  }

  const timestamp = Math.floor(new Date().getTime() / 1000);
  const type = "open";
  const questType = normalWarNames.includes(warName) ? "normal" : "event";

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
    // reportが"NaN"の場合は-1にする
    if (report === "NaN") {
      report = -1;
    } else {
      report = parseInt(report, 10);
    }
    const regex = /(\(x|\(\+)(.+)\)/;
    const match = material.match(regex);

    let stack = 1;
    if (match) {
      material = material.replace(regex, "").trim();
      stack = convertStringToNumber(match[2]);
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
    questType,
    timestamp,
    runs,
    note,
    dropObjects,
    ...(twitterId !== null && { twitterId }),
    ...(twitterName !== null && { twitterName }),
    ...(twitterUsername !== null && { twitterUsername }),
  };
}

function createReportHash(report) {
  // copy the report object and remove the timestamp field
  const reportForHash = { ...report };
  delete reportForHash.timestamp;

  // generate the hash from the JSON string of the report without the timestamp
  return sha256(JSON.stringify(reportForHash));
}

function getReportHashFromLocalStorage() {
  return localStorage.getItem("fgoDropReportHash");
}

function saveReportHashToLocalStorage(hash) {
  localStorage.setItem("fgoDropReportHash", hash);
}

export const ReportButton = () => {
  const [reportData, setReportData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
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
    if (
      runs > 0 &&
      questname !== "" &&
      questname !== "周回場所" &&
      hasNonEmptyMaterial
    ) {
      setIsReportButtonEnabled(true);
    } else {
      setIsReportButtonEnabled(false);
    }
  }, [runs, questname, lines, setIsReportButtonEnabled]);

  async function AddReport(report) {
    setLoading(true);
    const newReportHash = createReportHash(report);
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
      setIsReportButtonEnabled(false);
      setIsTweetButtonEnabled(true);
      // レポートの作成が成功したら、ハッシュ値をローカルストレージに保存する
      saveReportHashToLocalStorage(newReportHash);
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
    setReportData(reportData);
    // ハッシュ値を生成し、ローカルストレージのハッシュ値と比較する
    const newReportHash = createReportHash(reportData);
    const lastReportHash = getReportHashFromLocalStorage();
    setLoading(true);
    if (lastReportHash === newReportHash) {
      // ハッシュ値が同じ場合、モーダルを開く
      onOpen();
      setLoading(false);
      return;
    }
    AddReport(reportData);
  };

  return (
    <>
      <Button
        size="sm"
        colorScheme="twitter"
        isLoading={loading}
        onClick={handleClick}
        isDisabled={!isReportButtonEnabled}
      >
        投稿する
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              重複報告の警告
            </AlertDialogHeader>

            <AlertDialogBody>
              直前に報告された内容と同じです。
              <br />
              このまま報告していいですか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  AddReport(reportData);
                  onClose();
                }}
                ml={3}
              >
                報告する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
