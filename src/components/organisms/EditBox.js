// EditBox.js
import React from "react";
import { Box } from "@chakra-ui/react";
import ReportTable from "../organisms/ReportTable";
import QuestNameEditor from "../molecules/QuestNameEditor";
import ReportViewer from "../molecules/ReportViewer";
import RunCountEditor from "../molecules/RunCountEditor";
import NoteEditor from "../molecules/NoteEditor";
import TweetButton from "../atoms/button/TweetButton";
import { ReportButton } from "../atoms/button/ReportButton";

// TODO 本番環境 URL が確定したら差し替え
const siteURL = "http://localhost:3000"

function getRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

class EditBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleQuestNameChange = this.handleQuestNameChange.bind(this);
    this.handleRunCountChange = this.handleRunCountChange.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleMaterialReportCountChange =
      this.handleMaterialReportCountChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleLineDeleteButtonClick =
      this.handleLineDeleteButtonClick.bind(this);
    this.handleLineUpButtonClick = this.handleLineUpButtonClick.bind(this);
    this.handleLineDownButtonClick = this.handleLineDownButtonClick.bind(this);
    this.handleAddLineButtonClick = this.handleAddLineButtonClick.bind(this);
    this.buildReportText = this.buildReportText.bind(this);
    this.handleShowTweetButton = this.handleShowTweetButton.bind(this);

    this.minimumLines = 5;

    const questname = props.questname || "";
    const runcount = props.runs || 0;
    const note = props.note || "";
    this.state = {
      questname: questname,
      runcount: runcount,
      lines: props.lines,
      reportText: this.buildReportText(questname, runcount, props.lines, note),
      note: note,
      canTweet: false,
    };
  }

  shouldUpdateComponent(currentProps, prevProps) {
    if (currentProps.questname !== prevProps.questname) {
      return true;
    }
    if (currentProps.runcount !== prevProps.runcount) {
      return true;
    }
    if (currentProps.note !== prevProps.note) {
      return true;
    }
    if (currentProps.lines.length !== prevProps.lines.length) {
      return true;
    }
    for (let i = 0; i < this.props.lines.length; i++) {
      const currentLine = currentProps.lines[i];
      const prevLine = prevProps.lines[i];
      if (currentLine.material !== prevLine.material) {
        return true;
      }
      if (currentLine.initial !== prevLine.initial) {
        return true;
      }
      if (currentLine.report !== prevLine.report) {
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    // 初期の行数
    let maxOrder = Math.max(this.props.lines.map((line) => line.order));
    if (this.props.lines.length < this.minimumLines) {
      const maxloop = this.minimumLines - this.props.lines.length;
      const newlines = [];
      for (let i = 0; i < maxloop; i++) {
        newlines.push(this.initNewLine(maxOrder));
        maxOrder++;
      }
      this.setState({ lines: newlines });
    }
  }

  // queryString の解析は DOM 操作であるため componentDidMount() よりもさらに遅れる。
  // componentDidUpdate() のタイミングで prevProps と this.props を比較して
  // state を再設定する。
  componentDidUpdate(prevProps, prevState) {
    const shouldUpdate = this.shouldUpdateComponent(this.props, prevProps);
    if (shouldUpdate) {
      const newlines = this.props.lines.map((line) => {
        const newline = {};
        newline.id = "id" in line ? line.id : getRandomString(16);
        // map() 内で order を新規採番するのは難しいため、newlines を構築後に再度ループして設定する
        newline.order = line.order || 0;
        newline.material = "material" in line ? line.material : "";
        newline.initial = "initial" in line ? line.initial : 0;
        newline.report =
          "report" in line ? line.report : this.computeReportValue(line);
        return newline;
      });
      let maxOrder = Math.max(newlines.map((line) => line.order));
      for (let i = 0; i < newlines.length; i++) {
        const newline = newlines[i];
        if (newline.order === 0) {
          newline.order = maxOrder + 1;
          maxOrder++;
        }
      }
      if (newlines.length < this.minimumLines) {
        const maxloop = this.minimumLines - newlines.length;
        for (let i = 0; i < maxloop; i++) {
          newlines.push(this.initNewLine(maxOrder));
          maxOrder++;
        }
      }
      console.log("newlines", newlines);
      this.setState((state) => ({
        questname: this.props.questname,
        runcount: this.props.runcount,
        lines: newlines,
        reportText: this.buildReportText(
          this.props.questname,
          this.props.runcount,
          newlines,
          this.props.note,
        ),
        note: this.props.note,
      }));
    }
  }

  initNewLine(maxOrder) {
    return {
      id: getRandomString(16),
      order: Math.max(maxOrder, 0) + 1,
      material: "",
      initial: 0,
      report: 0,
    };
  }

  handleQuestNameChange(questname) {
    this.setState((state) => ({
      questname: questname,
      reportText: this.buildReportText(questname, state.runcount, state.lines, state.note),
      canTweet: false,
    }));
  }

  handleRunCountChange(runcount) {
    this.setState((state) => ({
      runcount: runcount,
      reportText: this.buildReportText(state.questname, runcount, state.lines, state.note),
      canTweet: false,
    }));
  }

  rebuildLines(lines, hook, triggerLineId) {
    let newlines = [];
    for (let line of lines) {
      if (line.id === triggerLineId) {
        hook(line);
      }
      newlines.push(line);
    }
    return newlines;
  }

  handleMaterialChange(id, material) {
    const hook = (line) => {
      line.material = material;
    };
    const newlines = this.rebuildLines(this.state.lines, hook, id);
    this.setState((state) => ({
      lines: newlines,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        newlines,
        state.note,
      ),
      canTweet: false,
    }));
  }

  computeReportValue(line) {
    let reportValue = parseInt(line.initial);
    if (reportValue < 0 || isNaN(reportValue)) {
      reportValue = "NaN";
    }
    return reportValue;
  }

  handleMaterialReportCountChange(id, count) {
    const hook = (line) => {
      if (count < 0) {
        line.report = "NaN";
      } else {
        line.report = count;
      }
    };
    const newlines = this.rebuildLines(this.state.lines, hook, id);
    this.setState((state) => ({
      lines: newlines,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        newlines,
        state.note,
      ),
      canTweet: false,
    }));
  }

  handleNoteChange(note) {
    this.setState((state) => ({
      note: note,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        state.lines,
        note,
      ),
      canTweet: false,
    }));
  }

  handleLineDeleteButtonClick(id) {
    const newlines = this.state.lines.filter((line) => {
      return line.id !== id;
    });
    this.setState((state) => ({
      lines: newlines,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        newlines,
        state.note,
      ),
      canTweet: false,
    }));
  }

  findAboveLine(lines, target) {
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
  }

  findBelowLine(lines, target) {
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
  }

  changeLineOrder(lines, target, direction) {
    let theOther;
    if (direction === "up") {
      theOther = this.findAboveLine(lines, target);
    } else if (direction === "down") {
      theOther = this.findBelowLine(lines, target);
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
  }

  handleLineUpButtonClick(id) {
    const linesCopy = this.state.lines.slice();
    const target = linesCopy.filter((line) => {
      return line.id === id;
    });
    if (target.length !== 1) {
      return;
    }
    if (target[0].order <= 0) {
      return;
    }

    this.changeLineOrder(linesCopy, target[0], "up");
    this.setState((state) => ({
      lines: linesCopy,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        linesCopy,
        state.note,
      ),
      canTweet: false,
    }));
  }

  handleLineDownButtonClick(id) {
    const linesCopy = this.state.lines.slice();
    const target = linesCopy.filter((line) => {
      return line.id === id;
    });
    if (target.length !== 1) {
      return;
    }
    const maxOrder = linesCopy.reduce((a, b) => {
      return a > b ? a.order : b.order;
    });
    if (target[0].order >= maxOrder) {
      return;
    }

    this.changeLineOrder(linesCopy, target[0], "down");
    this.setState((state) => ({
      lines: linesCopy,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        linesCopy,
        state.note,
      ),
      canTweet: false,
    }));
  }

  handleAddLineButtonClick() {
    const lines = this.state.lines;
    lines.push(this.initNewLine());
    this.setState((state) => ({
      lines: lines,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        lines,
        state.note),
      canTweet: false,
    }));
  }

  buildReportText(questname, runcount, lines, note) {
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
  }

  handleShowTweetButton(event) {
    this.setState({ canTweet: true });
  }

  makeReportTable() {
    return (
      <ReportTable
        {...this.state}
        onMaterialChange={this.handleMaterialChange}
        onMaterialReportCountChange={this.handleMaterialReportCountChange}
        onLineDeleteButtonClick={this.handleLineDeleteButtonClick}
        onLineUpButtonClick={this.handleLineUpButtonClick}
        onLineDownButtonClick={this.handleLineDownButtonClick}
        onAddLineButtonClick={this.handleAddLineButtonClick}
      />
    );
  }

  render() {
    return (
      <Box>
        <QuestNameEditor
          questname={this.state.questname}
          onQuestNameChange={this.handleQuestNameChange}
        />
        <RunCountEditor
          mb={1}
          runcount={this.state.runcount}
          onRunCountChange={this.handleRunCountChange}
        />
        <Box mt={1}>{this.makeReportTable()}</Box>
        <NoteEditor note={this.state.note} onNoteChange={this.handleNoteChange} />
        <ReportViewer {...this.state} />
        <ReportButton {...this.state} />
        <TweetButton
          {...this.state}
          onShowTweetButton={this.handleShowTweetButton}
        />
      </Box>
    );
  }
}

export default EditBox;
