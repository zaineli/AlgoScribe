import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storage, storageRef } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  listAll,
} from "firebase/storage";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [imgLink, setImageLink] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDoc = doc(db, "users", uid);

        try {
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setDisplayname(userData.displayName);
            setImageLink(userData.img);
            setEmail(userData.email);
            setUsername(userData.username);

            // const imageListRef = ref(storage, `${userFilename}/`);

            // // Now you can get the download URL for the specified filename
            // const imageUrl = await getDownloadURL(imageListRef);
            // console.log(imageUrl);
            // // Update state or perform actions with the URL as needed
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });
  }, []);
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(uid)
  //       console.log(user.filename)
  //       const filename = user.filename;
  //       // console.log(user.displayName)
  //       const imageListRef = ref(storage, `${filename}/`);

  //       // console.log(imageListRef.ref.getDownloadURL().toString())
  //       // listAll(imageListRef)
  //       //   .then((response) => {
  //       //     response.items.forEach((item) => {
  //       //       getDownloadURL(item).then((url) => {
  //       //         setImageList((prev) => [...prev, url]);
  //       //       });
  //       //     });
  //       //   })
  //       //   .catch((error) => {
  //       //     console.error("Error listing images:", error);
  //       //   });
  //     }

  //   });
  // }, []);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Visualizer</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <img className="profile_pic" src={imgLink} alt="" />
          <div className="details" style={{ paddingRight: "50px" }}>
            <h1>{displayname}</h1>
            <sub>{username}</sub>
            <br />
            <i>{email}</i>
          </div>
          <p className="title">TOOLS</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/users/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Add File</span>
            </li>
          </Link>
          <Link to="/codeEditor" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Code Editor</span>
            </li>
          </Link>

          <Link to="/graphs" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Graphs</span>
            </li>
          </Link>

          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
