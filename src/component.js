import React, { useCallback } from "react";
import { Box, Button, Text, Textarea, Tag, HStack } from "@chakra-ui/react";
import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { ReportButton } from "./components/atoms/button/ReportButton";

const defaultQuestName = "(クエスト名)";

// "素材" フィールド
class MaterialNameCell extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.props.onValueChange(this.props.id, event.target.value);
  }

  isValidMaterialValue(v) {
    if (v === "") {
      return "BLANK";
    }
    if (v === "!") {
      return "BLANK";
    }
    if (/[0-9]/.test(v[v.length - 1])) {
      return "TAILNUM";
    }
    return "OK";
  }

  makeComponent() {
    const value = this.props.material;
    const validationResult = this.isValidMaterialValue(value.trim());

    if (validationResult === "BLANK") {
      return (
        <>
          <Input
            type="text"
            className="input is-small is-danger"
            value={value}
            onChange={this.handleValueChange}
          />
          <Text className="help is-danger">入力必須</Text>
        </>
      );
    } else if (validationResult === "TAILNUM") {
      return (
        <>
          <Input
            type="text"
            className="input is-small"
            value={value}
            onChange={this.handleValueChange}
          />
          <Text className="help is-danger">末尾は数字以外</Text>
        </>
      );
    }
    return (
      <Input
        type="text"
        className="input is-small"
        value={value}
        onChange={this.handleValueChange}
      />
    );
  }

  render() {
    return this.makeComponent();
  }
}

// "報告値" フィールド
class ReportCountCell extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.props.onValueChange(this.props.id, event.target.value);
  }

  isValidReportValue(v) {
    const s = String(v).trim();
    if (s === "NaN") {
      return true;
    }
    if (!/^[0-9]+$/.test(s)) {
      return false;
    }
    if (s !== "0" && s.startsWith("0")) {
      // 012 のような記述を排除する目的
      return false;
    }
    return true;
  }

  makeComponent() {
    const reportValue = this.props.report;

    if (this.isValidReportValue(reportValue)) {
      return (
        <Input
          type="text"
          className="input is-small"
          value={reportValue}
          onChange={this.handleValueChange}
        />
      );
    }
    return (
      <>
        <Input
          type="text"
          className="input is-small is-danger"
          value={reportValue}
          onChange={this.handleValueChange}
        />
        <Text className="help is-danger">整数または NaN</Text>
      </>
    );
  }

  render() {
    return this.makeComponent();
  }
}

// テーブル行
class TableLine extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  handleDeleteClick(event) {
    if (window.confirm("この行を削除しますか？")) {
      this.props.onLineDeleteButtonClick(this.props.id);
    }
  }

  handleUpClick(event) {
    this.props.onLineUpButtonClick(this.props.id);
  }

  handleDownClick(event) {
    this.props.onLineDownButtonClick(this.props.id);
  }

  render() {
    return (
      <Tr>
        <Td verticalAlign="top">
          <Button size="sm" mr={1} onClick={this.handleDeleteClick}>
            <i className="fas fa-trash"></i>
          </Button>
          <Button size="sm" mr={1} onClick={this.handleUpClick}>
            <i className="fas fa-arrow-up"></i>
          </Button>
          <Button size="sm" onClick={this.handleDownClick}>
            <i className="fas fa-arrow-down"></i>
          </Button>
        </Td>
        <Td verticalAlign="top">
          <MaterialNameCell
            {...this.props}
            {...this.state}
            onValueChange={this.props.onMaterialChange}
          />
        </Td>
        <Td verticalAlign="top">
          <ReportCountCell
            {...this.props}
            {...this.state}
            onValueChange={this.props.onMaterialReportCountChange}
          />
        </Td>
      </Tr>
    );
  }
}

class ReportTable extends React.Component {
  render() {
    console.log(this.props.lines);
    return (
      <Box className="table-container" style={{ marginBottom: 1.5 + "rem" }}>
        <Table className="is-narrow">
          <Thead>
            <Tr>
              <Th width={180}></Th>
              <Th>素材名</Th>
              <Th>報告値</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.props.lines.map((e) => {
              return (
                <TableLine
                  key={e.id}
                  {...e}
                  runcount={this.props.runcount}
                  onMaterialChange={this.props.onMaterialChange}
                  onMaterialReportCountChange={
                    this.props.onMaterialReportCountChange
                  }
                  onLineDeleteButtonClick={this.props.onLineDeleteButtonClick}
                  onLineUpButtonClick={this.props.onLineUpButtonClick}
                  onLineDownButtonClick={this.props.onLineDownButtonClick}
                />
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Button
                  size="sm"
                  mt={1}
                  onClick={this.props.onAddLineButtonClick}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    );
  }
}

class QuestNameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onQuestNameChange(event.target.value);
  }

  buildInputNode(questname) {
    if (questname === defaultQuestName || questname.trim().length === 0) {
      return (
        <Box className="control">
          <Input
            type="text"
            isInvalid
            value={questname}
            onChange={this.handleChange}
          />
          <Text color="red" as="b">
            周回場所を入力してください。
          </Text>
        </Box>
      );
    }
    const pos = questname.replace(/　/g, " ").trim().indexOf(" ");
    if (pos < 0) {
      return (
        <Box className="control">
          <Input
            type="text"
            className="input is-small is-info"
            value={questname}
            onChange={this.handleChange}
          />
          <Text className="help is-info">
            「剣の修練場 超級」「オケアノス
            豊かな海」のようにスペースで区切る記述を推奨します。
          </Text>
        </Box>
      );
    }
    return (
      <Box className="control has-icons-right">
        <Input
          type="text"
          className="input is-small is-success"
          value={questname}
          onChange={this.handleChange}
        />
        <Text size="small">
          <i className="fas fa-check"></i>
        </Text>
      </Box>
    );
  }

  render() {
    const questname = this.props.questname;
    const node = this.buildInputNode(questname);
    return (
      <Box className="field">
        <FormLabel className="label">周回場所</FormLabel>
        {node}
      </Box>
    );
  }
}

class RunCountEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addValue = this.addValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.props.onRunCountChange(event.target.value);
  }

  addValue(delta) {
    let runcount = parseInt(this.props.runcount);
    // ブランクなど数値でない場合に NaN になる可能性がある。
    // その場合は強制的に 0 にする。
    if (isNaN(runcount)) {
      runcount = 0;
    }
    let v = runcount + delta;
    if (v < 0) {
      v = 0;
    }
    this.props.onRunCountChange(v);
  }

  buildInputNode() {
    const _runcount = parseInt(this.props.runcount);
    if (_runcount <= 0 || isNaN(_runcount)) {
      return (
        <Box>
          <Input
            type="number"
            isInvalid
            min="0"
            value={this.props.runcount}
            onChange={this.handleChange}
          />
          <Text color="red" as="b">
            周回数を設定してください。
          </Text>
        </Box>
      );
    }
    return (
      <Box className="control has-icons-right">
        <InputGroup>
          <Input
            type="number"
            min="0"
            value={this.props.runcount}
            onChange={this.handleChange}
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>
      </Box>
    );
  }

  handleClick(event) {
    this.addValue(parseInt(event.target.textContent));
  }

  render() {
    const inputNode = this.buildInputNode();
    return (
      <Box>
        <Box>
          <FormLabel>周回数</FormLabel>
          {inputNode}
        </Box>
        <Box mt={1}>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -1000
          </Button>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -100
          </Button>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -10
          </Button>
          <Button size="sm" colorScheme="red" mr={1} onClick={this.handleClick}>
            -1
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            mr={1}
            onClick={this.handleClick}
          >
            +1
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            mr={1}
            onClick={this.handleClick}
          >
            +10
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            mr={1}
            onClick={this.handleClick}
          >
            +100
          </Button>
          <Button size="sm" colorScheme="blue" onClick={this.handleClick}>
            +1000
          </Button>
        </Box>
      </Box>
    );
  }
}

class ReportViewer extends React.Component {
  computeRows(rows) {
    // TODO あまり洗練された手法とはいえない
    const screenWidth = window.screen.width;

    const overflows = rows.filter((r) => {
      if (screenWidth < 376) {
        return r.length > 30;
      } else if (screenWidth < 414) {
        return r.length > 35;
      }
      return false;
    }).length;

    return rows.length + overflows;
  }
  render() {
    const rows = this.props.reportText.split("\n");
    const numRows = this.computeRows(rows);

    return (
      <Box>
        <HStack spacing={2} mb={1}>
          <Text>周回報告テキスト</Text>
          <Tag>直接編集不可</Tag>
        </HStack>
        <Box className="control">
          <Textarea readOnly value={this.props.reportText} rows={numRows} />
        </Box>
      </Box>
    );
  }
}

class TweetButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      this.props.reportText
    )}`;
    window.open(tweetURL, "_blank");
  }

  render() {
    const tweetButton = (
      <Button size="sm" colorScheme="twitter" onClick={this.handleClick}>
        ツイートする
      </Button>
    );
    return <Box mt={1}>{tweetButton}</Box>;
  }
}

export class EditBox extends React.Component {
  constructor(props) {
    super(props);
    // TODO: 遷移元からは JSON 形式でデータを受け取るようにしたい
    // props
    //  - questname
    //  - runcount
    //  - lines

    this.handleQuestNameChange = this.handleQuestNameChange.bind(this);
    this.handleRunCountChange = this.handleRunCountChange.bind(this);
    this.handleMaterialChange = this.handleMaterialChange.bind(this);
    this.handleMaterialAddCountChange =
      this.handleMaterialAddCountChange.bind(this);
    this.handleMaterialReduceCountChange =
      this.handleMaterialReduceCountChange.bind(this);
    this.handleMaterialReportCountChange =
      this.handleMaterialReportCountChange.bind(this);
    this.handleLineDeleteButtonClick =
      this.handleLineDeleteButtonClick.bind(this);
    this.handleLineUpButtonClick = this.handleLineUpButtonClick.bind(this);
    this.handleLineDownButtonClick = this.handleLineDownButtonClick.bind(this);
    this.handleAddLineButtonClick = this.handleAddLineButtonClick.bind(this);
    this.buildReportText = this.buildReportText.bind(this);
    this.handleShowTweetButton = this.handleShowTweetButton.bind(this);

    const runcount = parseInt(props.runcount);
    const lines = props.lines;

    lines.forEach((line) => {
      // report の値を計算しておく。
      // data から与えられた report 値はここで上書きしてしまってよい。
      line.report = this.computeReportValue(line);
    });
    this.state = {
      questname: props.questname,
      runcount: runcount,
      lines: lines,
      reportText: this.buildReportText(props.questname, runcount, lines),
      canTweet: false,
    };
  }

  componentDidMount() {
    // 初期の行数
    const initialLineCount = 5 - this.state.lines.length;
    for (let i = 0; i < initialLineCount; i++) {
      this.handleAddLineButtonClick();
    }
  }

  handleQuestNameChange(questname) {
    this.setState((state) => ({
      questname: questname,
      reportText: this.buildReportText(questname, state.runcount, state.lines),
      canTweet: false,
    }));
  }

  handleRunCountChange(runcount) {
    this.setState((state) => ({
      runcount: runcount,
      reportText: this.buildReportText(state.questname, runcount, state.lines),
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
        newlines
      ),
      canTweet: false,
    }));
  }

  computeReportValue(line) {
    let reportValue =
      parseInt(line.initial) + parseInt(line.add) - parseInt(line.reduce);
    if (reportValue < 0 || isNaN(reportValue)) {
      reportValue = "NaN";
    }
    return reportValue;
  }

  handleMaterialAddCountChange(id, count) {
    const hook = (line) => {
      line.add = count;
      line.report = this.computeReportValue(line);
    };
    const newlines = this.rebuildLines(this.state.lines, hook, id);
    this.setState((state) => ({
      lines: newlines,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        newlines
      ),
      canTweet: false,
    }));
  }

  handleMaterialReduceCountChange(id, count) {
    const hook = (line) => {
      line.reduce = count;
      line.report = this.computeReportValue(line);
    };
    const newlines = this.rebuildLines(this.state.lines, hook, id);
    this.setState((state) => ({
      lines: newlines,
      reportText: this.buildReportText(
        state.questname,
        state.runcount,
        newlines
      ),
      canTweet: false,
    }));
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
        newlines
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
        newlines
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
        linesCopy
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
        linesCopy
      ),
      canTweet: false,
    }));
  }

  handleAddLineButtonClick() {
    const lines = this.state.lines;
    const newline = {
      id:
        Math.max(
          ...lines.map((line) => {
            return line.id;
          }),
          0
        ) + 1,
      order:
        Math.max(
          ...lines.map((line) => {
            return line.order;
          }),
          0
        ) + 1,
      material: "",
      initial: 0,
      add: 0,
      reduce: 0,
      report: 0,
    };
    lines.push(newline);
    this.setState((state) => ({
      lines: lines,
      reportText: this.buildReportText(state.questname, state.runcount, lines),
      canTweet: false,
    }));
  }

  buildReportText(questname, runcount, lines) {
    const reportText = lines
      .map((line) => {
        return line.material + line.report;
      })
      .join("-")
      .replace(/-!/g, "\n")
      .replace(/^!/, ""); // 先頭行のアイテムが ! で始まるケースを考慮

    const value = `【${questname}】${runcount}周
${reportText}
#FGO周回カウンタ https://aoshirobo.net/fatego/rc/
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
        onMaterialAddCountChange={this.handleMaterialAddCountChange}
        onMaterialReduceCountChange={this.handleMaterialReduceCountChange}
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
