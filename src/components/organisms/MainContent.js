import UserGreeting from "../molecules/UserGreeting";
import TwitterAccount from "../molecules/TwitterAccount";
import EditBox from "./EditBox";
import SignOutButton from "../atoms/button/SignOutButton";

const MainContent = ({ signOut, questname, runs, lines }) => {
  return (
    <>
      <UserGreeting />
      <TwitterAccount />
      <EditBox questname={questname} runs={runs} lines={lines} />
      <SignOutButton onClick={signOut} />
    </>
  );
};

export default MainContent;
