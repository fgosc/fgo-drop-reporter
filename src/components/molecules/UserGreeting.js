import { useContext, memo } from "react";
import UserAttributesContext from "../../contexts/UserAttributesContext";

const UserGreeting = memo(() => {
  const userAttributes = useContext(UserAttributesContext);
  console.log(userAttributes);
  return <h1>Hello {userAttributes.name}</h1>;
});

export default UserGreeting;
