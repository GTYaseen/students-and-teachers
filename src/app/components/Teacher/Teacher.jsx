import React from "react";
import { Button, Modal, Input } from "antd";
import axios from "axios";
import { useState } from "react";

function Teacher() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [teacherData, setTeacherData] = useState({
    name: "",
    age: "",
    specialization: "",
  });

  const showModalT = () => {
    setIsModalOpen(true);
  };

  const handleOkT = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/saveTeacherData",
        {
          name: teacherData.name,
          age: teacherData.age,
          grade: teacherData.sp,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setIsModalOpen(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);

  };

  const handleTeacherInputChange = (field, value) => {
    setTeacherData({
      ...teacherData,
      [field]: value,
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        type="primary"
        onClick={showModalT}
        style={{ backgroundColor: "#13c2c2" }}
      >
        الاستاذ
      </Button>
      <Modal
        title="Teacher Modal"
        open={isModalOpen}
        onOk={handleOkT}
        onCancel={handleCancel}
      >
        <center>
          <p>اسم الاستاذ</p>
          <Input
            placeholder="حسين"
            onChange={(e) => handleTeacherInputChange("name", e.target.value)}
          />
          <p>عمر الاستاذ</p>
          <Input
            placeholder="91"
            onChange={(e) => handleTeacherInputChange("age", e.target.value)}
          />
          <p>تخصص</p>
          <Input
            placeholder="تاريخ"
            onChange={(e) =>
              handleTeacherInputChange("specialization", e.target.value)
            }
          />
        </center>
      </Modal>
    </div>
  );
}

export default Teacher;
