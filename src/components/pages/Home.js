import { memo, useEffect, useContext } from "react";

import "@aws-amplify/ui-react/styles.css";

import ReportParamContext from "../../contexts/ReportParamContext";
import LayoutGrid from "../../components/templates/LayoutGrid";

export const Home = memo(() => {
  const {
    questname,
    setQuestname,
    runs,
    setRuns,
    lines,
    setLines,
    note,
    setNote,
  } = useContext(ReportParamContext);

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

  return <LayoutGrid />;
});
