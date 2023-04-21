import { memo } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createReport } from "../../../graphql/mutations";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const reportData = {
  type: "event",
  warName: "冬木",
  questName: "未確認座標X-A",
  timestamp: Math.floor(Date.now() / 1000),
  runs: 100,
  url: "https://fgojunks.max747.org/fgosccnt/results/9fb16ceb-6af8-4711-9f06-5efa3d42e1f5/",
  dropObjects: [
    {
      objectName: "骨",
      drops: [
        {
          num: 8,
        },
      ],
      dropUpRate: 0,
    },
    {
      objectName: "剣輝",
      drops: [
        {
          num: 13,
        },
      ],
    },
    {
      objectName: "剣灯火",
      drops: [
        {
          num: 13,
        },
      ],
    },
    {
      objectName: "QP",
      drops: [
        {
          num: 61,
          stack: 10000,
        },
      ],
    },
  ],
};

export const ReportButton = memo(() => {
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
    AddReport(reportData);
  };

  const reportButton = (
    <Button size="sm" colorScheme="twitter" onClick={handleClick}>
      投稿する
    </Button>
  );

  return <Box mt={1}>{reportButton}</Box>;
});
