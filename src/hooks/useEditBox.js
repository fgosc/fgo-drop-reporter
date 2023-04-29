// useEditBox.js
import { useContext, useCallback } from "react";
import ReportParamContext from "../contexts/ReportParamContext";
// TODO 本番環境 URL が確定したら差し替え
const siteURL = "http://localhost:3000";

export const useEditBox = () => {
  const {
    questname,
    setQuestname,
    runs,
    setRuns,
    lines,
    setLines,
    note,
    setNote,
    setReportText,
  } = useContext(ReportParamContext);

  const getRandomString = useCallback((length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }, []);

  const initNewLine = useCallback((maxOrder) => {
    return {
      id: getRandomString(16),
      order: Math.max(maxOrder, 0) + 1,
      material: "",
      initial: 0,
      report: 0,
    };
  }, []);

  const buildReportText = (questname, runcount, lines, note) => {
    const reportText = lines
      .filter((line) => {
        // 素材名未入力の行は除外
        return line.material !== "";
      })
      .map((line) => {
        return line.material + line.report;
      })
      .join("-")
      .replace(/-!/g, "\n")
      .replace(/^!/, ""); // 先頭行のアイテムが ! で始まるケースを考慮

    const value = `【${questname}】${runcount}周
${reportText}
#FGO周回カウンタ ${siteURL}
${note}
`;
    return value;
  };

  const handleQuestNameChange = useCallback(
    (newQuestName) => {
      setQuestname(newQuestName);
      setReportText(buildReportText(newQuestName, runs, lines, note));
    },
    [runs, lines, note, setQuestname, setReportText]
  );

  const handleRunCountChange = useCallback(
    (newRunCount) => {
      setRuns(newRunCount);
      setReportText(buildReportText(questname, newRunCount, lines, note));
    },
    [questname, lines, note, setRuns, setReportText]
  );

  const rebuildLines = (lines, hook, triggerLineId) => {
    let newlines = [];
    for (let line of lines) {
      if (line.id === triggerLineId) {
        hook(line);
      }
      newlines.push(line);
    }
    return newlines;
  };

  const handleMaterialChange = useCallback(
    (id, material) => {
      const hook = (line) => {
        line.material = material;
      };
      const newlines = rebuildLines(lines, hook, id);
      setLines(newlines);
      setReportText(buildReportText(questname, runs, newlines, note));
    },
    [questname, runs, lines, note, setLines, setReportText]
  );

  const handleMaterialReportCountChange = useCallback(
    (id, count) => {
      const hook = (line) => {
        if (count < 0) {
          line.report = "NaN";
        } else {
          line.report = count;
        }
      };
      const newlines = rebuildLines(lines, hook, id);
      setLines(newlines);
      setReportText(buildReportText(questname, runs, newlines, note));
    },
    [lines, questname, runs, note, setLines, setReportText]
  );

  const handleNoteChange = useCallback(
    (newNote) => {
      setNote(newNote);
      setReportText(buildReportText(questname, runs, lines, newNote));
    },
    [questname, runs, lines, setNote, setReportText]
  );

  const handleLineDeleteButtonClick = useCallback(
    (id) => {
      const newlines = lines.filter((line) => {
        return line.id !== id;
      });
      setLines(newlines);
      setReportText(buildReportText(questname, runs, newlines, note));
    },
    [questname, runs, note, setLines, setReportText]
  );

  const findAboveLine = (lines, target) => {
    return lines.reduce((currentMax, line) => {
      // target よりも order が小さく、かつ最大の order を持つ行
      if (currentMax.order < target.order && line.order < target.order) {
        if (currentMax.order < line.order) {
          return line;
        } else {
          return currentMax;
        }
      }
      if (currentMax.order > target.order && line.order > target.order) {
        return line;
      }
      if (currentMax.order === line.order) {
        return line;
      }
      if (currentMax.order < line.order) {
        return currentMax;
      }
      return line;
    });
  };

  const findBelowLine = (lines, target) => {
    return lines.reduce((currentMin, line) => {
      // target よりも order が大きく、かつ最小の order を持つ行
      if (currentMin.order > target.order && line.order > target.order) {
        if (currentMin.order > line.order) {
          return line;
        } else {
          return currentMin;
        }
      }
      if (currentMin.order < target.order && line.order < target.order) {
        return line;
      }
      if (currentMin.order === line.order) {
        return line;
      }
      if (currentMin.order > line.order) {
        return currentMin;
      }
      return line;
    });
  };

  const changeLineOrder = (lines, target, direction) => {
    let theOther;
    if (direction === "up") {
      theOther = findAboveLine(lines, target);
    } else if (direction === "down") {
      theOther = findBelowLine(lines, target);
    } else {
      throw new Error("unsupported direction");
    }

    if (theOther === target) {
      // 交換不可: 対象が見つからない
      console.log("cannot change line order");
      return;
    }

    // order の入れ替え
    const currentTargetOrder = target.order;
    target.order = theOther.order;
    theOther.order = currentTargetOrder;

    lines.sort((a, b) => {
      return a.order - b.order;
    });
  };

  const handleLineUpButtonClick = useCallback(
    (id) => {
      const linesCopy = [...lines];
      const target = linesCopy.filter((line) => line.id === id);

      if (target.length !== 1) {
        return;
      }
      if (target[0].order <= 0) {
        return;
      }

      changeLineOrder(linesCopy, target[0], "up");
      setLines(linesCopy);
      setReportText(buildReportText(questname, runs, linesCopy, note));
    },
    [questname, runs, note, setLines, setReportText]
  );

  const handleLineDownButtonClick = useCallback(
    (id) => {
      const linesCopy = [...lines];
      const target = linesCopy.filter((line) => line.id === id);

      if (target.length !== 1) {
        return;
      }
      const maxOrder = linesCopy.reduce((a, b) =>
        a.order > b.order ? a.order : b.order
      );

      if (target[0].order >= maxOrder) {
        return;
      }

      changeLineOrder(linesCopy, target[0], "down");
      setLines(linesCopy);
      setReportText(buildReportText(questname, runs, linesCopy, note));
    },
    [questname, runs, note, setLines, setReportText]
  );

  const handleAddLineButtonClick = useCallback(() => {
    const newLines = [...lines, initNewLine()];
    setLines(newLines);
    setReportText(buildReportText(questname, runs, newLines, note));
  }, [questname, runs, note, setLines, setReportText]);

  return {
    getRandomString,
    initNewLine,
    buildReportText,
    handleQuestNameChange,
    handleRunCountChange,
    handleMaterialChange,
    handleMaterialReportCountChange,
    handleNoteChange,
    handleLineDeleteButtonClick,
    handleLineUpButtonClick,
    handleLineDownButtonClick,
    handleAddLineButtonClick,
  };
};
