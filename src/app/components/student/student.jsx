import React from "react";
import { Button, Modal, Input } from "antd";
import axios from "axios";
import { useState } from "react";

function Student() {
  const [isModalOpens, setIsModalOpens] = useState(false);

  // Student data state
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const handleOkS = async () => {
    // Send data to the Express server
    try {
      const response = await axios.post(
        "http://localhost:5000/api/saveStudentData",
        {
          name: studentData.name,
          age: studentData.age,
          grade: studentData.grade,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setIsModalOpens(false);
  };
  const handleInputChange = (field, value) => {
    setStudentData({
      ...studentData,
      [field]: value,
    });
  };

  const showModalS = () => {
    setIsModalOpens(true);
  };
  const handleCancel = () => {
    setIsModalOpens(false);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        type="primary"
        onClick={showModalS}
        style={{ backgroundColor: "#13c2c2" }}
      >
        الطالب
      </Button>
      <Modal
        title="Student Modal"
        open={isModalOpens}
        onOk={handleOkS}
        onCancel={handleCancel}
      >
        <center>
          <p>اسم الطالب</p>
          <Input
            placeholder="حسين"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <p>عمر الطالب</p>
          <Input
            placeholder="21"
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
          <p>معدل</p>
          <Input
            placeholder="99%"
            onChange={(e) => handleInputChange("grade", e.target.value)}
          />
        </center>
      </Modal>
    </div>
  );
}

export default Student;
