import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";

// Upload images to firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a firebase upload task
  const uploadFile = async (e) => {
    //get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];

    //makes ref to the storage bucket location
    const ref = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    //starts the upload
    const task = ref.put(file);

    //Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);

      //get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn">
            {" "}
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && (
        <>
          <strong>Copy and paste this snippet into your post</strong>
          <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
        </>
      )}
    </div>
  );
}
