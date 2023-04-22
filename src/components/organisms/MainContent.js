import UserGreeting from "../molecules/UserGreeting";
import TwitterAccount from "../molecules/TwitterAccount";
import EditBox from "./EditBox";
import SignOutButton from "../atoms/button/SignOutButton";

const MainContent = ({ signOut, questname, runs, lines, note }) => {
  return (
    <>
      <UserGreeting />
      <TwitterAccount />
      <EditBox questname={questname} runcount={runs} lines={lines} note={note} />
      <SignOutButton onClick={signOut} />
    </>
  );
};

export default MainContent;
