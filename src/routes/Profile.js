import { fbApp } from "fbase";
import { getAuth, updateProfile } from "@firebase/auth";
//import { where, orderBy, query, getDocs } from "@firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router-dom";
//import Nweet from "components/Nweet";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  //const [nweets, setNweets] = useState([]);

  const onLogOutClick = () => {
    getAuth(fbApp).signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(getAuth(fbApp).currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      setNewDisplayName("");
    }
  };

  // const getMyNweets = async () => {
  //   const ref = await collection(dbService, "nweets");
  //   const q = query(
  //     ref,
  //     where("creatorId", "==", userObj.uid),
  //     orderBy("createdAt", "asc")
  //   );
  //   var nweets = await getDocs(q);

  //   const newArray = nweets.docs.map((document) => ({
  //     id: document.id,
  //     ...document.data(),
  //   }));
  //   setNweets(newArray);
  // };

  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
