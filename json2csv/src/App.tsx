import React, { useState } from "react";

const App: React.FC = () => {
  const [inputContent, setInputContent] = useState("変換したい内容を入力してください");
  const [convertedContent, setConvertedContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onClickHandler() {
    let jsonContent;
    let newErrorMessage;

    setInputContent(inputContent);
    if (inputContent === "") {
      setErrorMessage("入力フォームに何も入力されていません");
    } else {
      setErrorMessage("");
    }

    try {
      jsonContent = JSON.parse(inputContent);
    } catch (error) {
      newErrorMessage = error;
      setErrorMessage(`${newErrorMessage}`);
    }

    if (!newErrorMessage) {
      convert(jsonContent);
    }
  }

  function convert(jsonContent: Array<any>) {
    const header = Object.keys(jsonContent[0]).join(",") + "\n";

    const body = jsonContent
      // インラインコールバック関数
      .map(function (d) {
        return Object.keys(d)
          .map(function (key) {
            return d[key];
          })
          .join(",");
      })
      .join("\n");
    setConvertedContent(`${header + body}`);
  }

  function deleteItems() {
    setInputContent("");
    setConvertedContent("");
    setErrorMessage("");
  }

  return (
    <>
      <p>入力フォーム</p>
      <textarea onChange={(e) => setInputContent(e.target.value)} value={inputContent}></textarea>
      <button onClick={() => onClickHandler()}>変換</button>
      <p style={{ color: "red" }}>{errorMessage}</p>

      <p>変換後</p>
      <textarea value={convertedContent}></textarea>

      <p>
        入力フォームと変換後フォームの内容を削除する：
        <button onClick={() => deleteItems()}>クリア</button>
      </p>
    </>
  );
};

export default App;
