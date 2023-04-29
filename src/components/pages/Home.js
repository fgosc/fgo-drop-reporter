import { memo, useEffect, useContext } from "react";

import "@aws-amplify/ui-react/styles.css";

import ReportParamContext from "../../contexts/ReportParamContext";
import LayoutGrid from "../../components/templates/LayoutGrid";
import { useEditBox } from "../../hooks/useEditBox";

const minimumLines = 5;

function defaultValue(value, defaultVal) {
  // === だと null と undefined を区別してしまう。
  // ここではその両方を拾いたいのであえて == を使う。
  if (value == null) {
    return defaultVal;
  }
  return value;
}

const computeReportValue = (line) => {
  let reportValue = parseInt(line.initial);
  if (reportValue < 0 || isNaN(reportValue)) {
    reportValue = "NaN";
  }
  return reportValue;
};

const getRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

const initNewLine = (maxOrder) => {
  return {
    id: getRandomString(16),
    order: Math.max(maxOrder, 0) + 1,
    material: "",
    initial: 0,
    report: 0,
  };
};

const initLines = (lines) => {
  const newlines = lines.map((line) => {
    const newline = {};
    newline.id =
      "id" in line
        ? defaultValue(line.id, getRandomString(16))
        : getRandomString(16);
    // map() 内で order を新規採番するのは難しいため、newlines を構築後に再度ループして設定する
    newline.order = "order" in line ? defaultValue(line.order, 0) : 0;
    newline.material =
      "material" in line ? defaultValue(line.material, "") : "";
    newline.initial = "initial" in line ? defaultValue(line.initial, 0) : 0;
    newline.report =
      "report" in line
        ? defaultValue(line.report, 0)
        : computeReportValue(line);
    return newline;
  });
  // order 採番
  let maxOrder = Math.max(...newlines.map((line) => line.order), 0);
  newlines.forEach((newline) => {
    if (newline.order === 0) {
      newline.order = maxOrder + 1;
      maxOrder++;
    }
  });
  for (let i = 0; i < newlines.length; i++) {
    const newline = newlines[i];
    if (newline.order === 0) {
      newline.order = maxOrder + 1;
      maxOrder++;
    }
  }
  // 最低行数を満たさない場合は行追加
  if (newlines.length < minimumLines) {
    const maxloop = minimumLines - newlines.length;
    for (let i = 0; i < maxloop; i++) {
      newlines.push(initNewLine(maxOrder));
      maxOrder++;
    }
  }
  return newlines;
};

export const Home = memo(() => {
  const { buildReportText } = useEditBox();

  const { setQuestname, runs, setRuns, setLines, setNote, setReportText } =
    useContext(ReportParamContext);

  useEffect(() => {
    if (runs > 0) {
      return;
    }
    const queryString = window.location.search;
    console.log(`queryString: ${queryString}`);
    const searchParams = new URLSearchParams(queryString);
    const initParams = ((searchParams) => {
      if (!searchParams.has("p")) {
        return {
          questname: "",
          runs: 0,
          lines: [],
          note: "",
        };
      }
      const base64str = searchParams
        .get("p")
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const byteArray = new Uint8Array(
        window
          .atob(base64str)
          .split("")
          .map((c) => c.charCodeAt(0))
      );
      const decoder = new TextDecoder();
      const decodedParams = decoder.decode(byteArray);
      console.log(`decodedParams: ${decodedParams}`);
      return JSON.parse(decodedParams);
    })(searchParams);

    setQuestname(initParams.questname);
    setRuns(initParams.runs);
    setNote(initParams.note);
    const newLines = initLines(initParams.lines);
    setLines(newLines);
    setReportText(
      buildReportText(
        initParams.questname,
        initParams.runs,
        newLines,
        initParams.note
      )
    );
  }, []);

  return <LayoutGrid />;
});
