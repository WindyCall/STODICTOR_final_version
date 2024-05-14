import { useAuth } from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { storage } from "../hooks/useAuth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Box from "@mui/material/Box";

function Profile(props) {
  const { user } = useAuth();

  const { sideData, onUpdateUserProfile, profilePhotoURL } = props;

  const [updateShopName, setUpdateShopName] = useState(sideData[0]);
  const [previewShopUrl, setPreviewShopUrl] = useState("");

  const [file, setFile] = useState("");

  //record filename for iamge access
  const [fileName, setFileName] = useState(sideData[1]);

  const [updatePhoneNo, setUpdatePhoneNo] = useState(sideData[2]);

  const [updateTelegram, setUpdateTelegram] = useState(sideData[3]);

  // update will first affect database then to shopPhotoUrl

  function getPhotoUrlOldversion() {
    const [url, setUrl] = useState("");

    if (previewShopUrl !== "") {
      return previewShopUrl;
    } else {
      if (fileName === "") return require("../pictures/Pikachu.png");
      const reference = ref(storage, `/files/${fileName}`);
      getDownloadURL(reference).then((x) => setUrl(x));
      return url;
    }
  }

  function getPhotoUrl() {
    if (previewShopUrl !== "") {
      return previewShopUrl;
    } else return profilePhotoURL;
  }

  function handleFileSelected(event) {
    // console.log("executed");
    // console.log(event.target.files[0]);
    // console.log(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    setPreviewShopUrl(URL.createObjectURL(event.target.files[0]));
    setFileName(event.target.files[0].name);
  }

  function handleUpload() {
    onUpdateUserProfile(
      updateShopName,
      fileName,
      updatePhoneNo,
      updateTelegram
    );
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    uploadBytesResumable(storageRef, file);
  }

  return (
    <div className="MainpageBox">
      <h1 className="Profile"> Profile </h1>
      <Box className="ProfileBox">
        <strong> Email: </strong>
        {" " + user.email}
        <br />
        <strong> Phone No: </strong>
        <input
          className="ProfileInput"
          value={updatePhoneNo}
          onChange={(e) => setUpdatePhoneNo(e.target.value)}
        />
        <br />
        <strong> Telegram Handle: </strong>
        <input
          className="ProfileInput"
          value={updateTelegram}
          onChange={(e) => setUpdateTelegram(e.target.value)}
        />
        <br />
        <strong> Shop name: </strong>
        <input
          className="ProfileInput"
          value={updateShopName}
          onChange={(e) => setUpdateShopName(e.target.value)}
        />
        <br />
        <br />
        <strong> Profile photo </strong>
        <br />
        <img alt="Downloading..." className="avatar" src={getPhotoUrl()} />
        <br />
        <br />
        <input type="file" onChange={handleFileSelected} />
        <br />
        <br />
        <Button onClick={handleUpload} variant="contained">
          Update
        </Button>
      </Box>
    </div>
  );
}

export default Profile;
