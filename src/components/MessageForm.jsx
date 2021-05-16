import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

const MessageForm = (props) => {
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const { chatId, creds, userName } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = value.trim();
    if (text.length > 0) sendMessage(creds, chatId, { text });

    setValue("");

    isTyping(props, chatId);
  };
  const handleChange = (event) => {
    setValue(event.target.value);

    if (event.target.value !== "") {
      setTyping(true);
    } else {
      setTyping(false);
    }
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };

  return (
    <div>
      {typing ? `${userName} is typing...` : null}
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          placeholder="Send a message..."
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <label htmlFor="upload-button">
          <span className="image-button">
            <PictureOutlined className="picture-icon" />
          </span>
        </label>
        <input
          type="file"
          multiple={false}
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <button type="submit" className="send-button">
          <SendOutlined className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
