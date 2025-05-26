import { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import {
  ButtonGroup,
  Container,
  Controls,
  Title,
  UploadArea,
  UploadIcon,
  UploadText,
} from "./App.styled";
import "./App.css";

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleDownload = () => {
    if (!processedImage) return;
    const a = document.createElement("a");
    a.href = processedImage;
    a.download = "no-background.png";
    a.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setOriginalImage(URL.createObjectURL(file));
    setIsLoading(true);

    try {
      const resultBlob = await removeBackground(file);
      const outputUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(outputUrl);
    } catch (error) {
      console.error("Failed to remove background:", error);
      alert("Background removal failed. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl) return;

    setOriginalImage(imageUrl);
    setIsLoading(true);
    setShowUrlInput(false);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const resultBlob = await removeBackground(blob);
      const outputUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(outputUrl);
    } catch (error) {
      console.error("Failed to remove background from URL:", error);
      alert("Failed to process image URL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Background Removal</Title>
      <Controls />
      {isLoading && (
        <div className="loading">
          <div className="spinner" />
          <p className="processing-msg">🔄 Please wait, image is processing...</p>
        </div>
      )}

      {!processedImage && !isLoading && !showUrlInput && (
        <UploadArea>
          <UploadIcon>⬆️</UploadIcon>
          <UploadText>
            Drag & drop an image here, paste it, or click to select
          </UploadText>
          <ButtonGroup>
            <button className="primary-btn" onClick={handleUploadClick} disabled={isLoading}>
              Upload Image
            </button>
            <button className="secondary-btn" onClick={() => setShowUrlInput(true)} disabled={isLoading}>
              Use Image URL
            </button>
          </ButtonGroup>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUpload}
            style={{ display: "none" }}
            disabled={isLoading}
          />
        </UploadArea>
      )}

      {showUrlInput && (
        <div className="url-input">
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isLoading}
          />
          <div className="url-btns">
            <button className="primary-btn" onClick={handleUrlSubmit} disabled={isLoading}>
              Submit
            </button>
            <button className="cancel-btn" onClick={() => { setShowUrlInput(false); setImageUrl(""); }} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="image-section">
        {originalImage && (
          <div>
            <h3>Original Image</h3>
            <img src={originalImage} alt="Original" width="300" />
          </div>
        )}

        {processedImage && (
          <div>
            <h3>Removed Background</h3>
            <img src={processedImage} alt="Processed" width="300" />
            <div className="download-container">
              <button className="download-btn" onClick={handleDownload} disabled={isLoading}>
                ⬇️ Download PNG
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
