import { Upload } from "antd";
import { QText } from "../../common/Fonts";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export function PassportUploader() {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div>
      <QText level="large">Upload passport</QText>
      <Upload
        name="passport"
        listType="picture-card"
        className="passport-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload">
        {uploadButton}
      </Upload>
    </div>
  );
}
