import { useState, createContext, useContext } from "react";

const UserContext = createContext();

const UserPovider = ({ children }) => {
  const [userInfo, updateUserinfo] = useState(false);
  const [userNotes, updateUserNotes] = useState(false);
  const [oldestUserNoteId, updateOldestUserNoteId] = useState("");
  const [moreUserNote, updateMoreUserNote] = useState(false);
  return (
    <UserContext.Provider
      value={{
        userInfo,
        updateUserinfo,
        userNotes,
        updateUserNotes,
        oldestUserNoteId,
        updateOldestUserNoteId,
        moreUserNote,
        updateMoreUserNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserPovider, useUserContext };