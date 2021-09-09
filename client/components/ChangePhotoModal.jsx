import CloseIcon from "@material-ui/icons/Close";
import Button from "components/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ChangePhotoModal({ id, photo, setUser, stateHandler }) {
  const imgRef = useRef(null);
  const inputRef = useRef(null);
  const [srcImg, setSrcImg] = useState();
  const [crop, setCrop] = useState({
    unit: "px",
    aspect: 1 / 1,
    x: 10,
    y: 10,
    width: 200,
    height: 200,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [error, setError] = useState(null);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let img = document.createElement("img");
    img.src = photo;
    try {
      var base64Img = getBase64Image(img);
      setSrcImg(base64Img);
    } catch (err) {
      // console.error(err);
    }
  }, []);

  // useEffect(() => {
  //   document.body.style.height = "100%";
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.height = "auto";
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  function getBase64Image(img) {
    if (!img) return;
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL;
  }

  /**
   * Documentation
   * @param {HTMLImageElement} image - Image File Object
   * @param {Object} crop - crop Object
   * @param {String} fileName - Name of the returned file in Promise
   * @param {Boolean} base64 - Return base64 version of the image
   */
  function getCroppedImg(image, crop, fileName, base64) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    if (base64) return canvas.toDataURL("image/jpeg");

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileName;
          blob.lastModifiedDate = new Date();
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("progress", (e) => {
        setProgressValue((e.loaded / e.total) * 100 || 0);
      });
      reader.addEventListener("load", () => {
        setSrcImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveImage = async (completedCrop) => {
    const blob = await getCroppedImg(
      imgRef.current,
      completedCrop,
      "croppedImage.jpeg",
      false
    );
    
    let file = new File([blob], blob.name);

    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    var formData = new FormData();
    formData.append("image", file);
    xhr.open("POST", `/user/upload/${id}`, true);

    // Add following event listener
    xhr.upload.addEventListener("progress", function (e) {
      setProgressValue((e.loaded / e.total) * 100 || 0);
    });

    xhr.addEventListener("readystatechange", function (e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        setUser((user) => {
          return { ...user, photo: xhr.response.filePath };
        });
        stateHandler();
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        setError(e.currentTarget.response.substring(0,20));
      }
    });
    xhr.send(formData);
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  setTimeout(() => {
    setProgressValue(0);
  }, 3000);

  return (
    <form
      className="fixed top-0 left-0 z-50
    w-screen h-full md:h-screen 
       bg-white dark:bg-[#333]
       md:bg-black md:bg-opacity-20
overflow-scroll
       "
      onSubmit={(e) => e.preventDefault()}
      encType="multipart/form-data"
    >
      <div className="flex justify-center">
        <div
          className="mt-5 mx-auto md:border border-gray-400 bg-white md:rounded-lg p-3  
        h-full md:h-auto  md:max-w-[80vw] dark:bg-[#333]"
        >
          <div className="flex justify-between">
            <h3 className="mr-8 text-lg">Upload your photo ( Maximum 10mb )</h3>
            <button className="p-1" onClick={stateHandler}>
              <CloseIcon fontSize="small" />
            </button>
          </div>
          {!srcImg && (
            <img
              src={photo}
              alt="profile picture"
              className="w-full mt-4 max-w-xs md:max-w-md mx-auto"
            />
          )}
          {srcImg && (
            <div className="mt-4 w-full flex justify-center items-center">
              <ReactCrop
                src={srcImg}
                onImageLoaded={onLoad}
                crop={crop}
                minWidth={100}
                minHeight={100}
                keepSelection={true}
                ruleOfThirds={true}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </div>
          )}

          {progressValue > 0 && (
            <div className="mt-1 h-2 w-full bg-gray-300 rounded-md">
              <div
                className={`h-2 bg-blue-500 rounded-md`}
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          )}
          <div className="mt-5 flex justify-center">
            <input
              className="hidden"
              type="file"
              name="photo"
              id="photoInput"
              ref={inputRef}
              accept="image/*"
              onChange={onSelectFile}
            />
            <Button
              className="my-2 px-3 py-2 text-sm rounded-lg text-white bg-blue-500 font-medium active:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-400 "
              onClick={(e) => inputRef.current.click()}
            >
              Upload a photo
            </Button>

            <Button
              type="button"
              className="ml-2 my-2 px-3 py-2 text-sm rounded-lg text-white bg-blue-500 font-medium active:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-400"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() => saveImage(completedCrop)}
            >
              Save
            </Button>
            <small className="text-red-500 dark:text-red-400 block">{error}</small>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChangePhotoModal;
