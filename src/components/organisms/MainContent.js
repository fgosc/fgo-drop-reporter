import TwitterAccount from "../molecules/TwitterAccount";
import EditBox from "./EditBox";

const MainContent = ({ questname, runs, lines, note }) => {
  return (
    <>
      {/* <TwitterAccount /> */}
      <EditBox
        questname={questname}
        runcount={runs}
        lines={lines}
        note={note}
      />
    </>
  );
};

export default MainContent;
