import { useState, useEffect } from "react";

function QuestData({ children }) {
  const [questname, setQuestname] = useState("");
  const [runs, setRuns] = useState(0);
  const [lines, setLines] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
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
    setLines(initParams.lines);
    setNote(initParams.note);
  }, []);

  return children({ questname, runs, lines, note });
}

export default QuestData;
