"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Container from "../components/container/Container";
import axios from "axios";
import { Header } from "../components/header/Header";
import { Button, Popconfirm, Modal, Input } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

function Page() {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getStudentData")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [list]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/deleteStudentData/${id}`)
      .then((response) => {
        console.log(response.data);
        // Update the state after successful deletion
        setList((prevList) => prevList.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleOk = async () => {
    const { id, name, age, grade } = studentData;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateStudentData/${id}`,
        {
          name,
          age,
          grade,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setIsModalOpen(false);
  };
  const showModal = (id) => {
    setStudentData({
      name: "", // Reset the form when opening the modal
      age: "",
      grade: "",
    });
    setIsModalOpen(true);
    // Set the id in the teacherData state
    setStudentData((prevData) => ({
      ...prevData,
      id,
    }));
  };
  const handleStudentInputChange = (field, value) => {
    setStudentData({
      ...studentData,
      [field]: value,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "studentname",
      key: "studentname",
    },
    {
      title: "Age",
      dataIndex: "studentage",
      key: "studentage",
    },
    {
      title: "Grade",
      dataIndex: "studentgrade",
      key: "studentgrade",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <Button size="large" onClick={() => showModal(record.id)}>
            <FaEdit style={{ fontSize: "25px" }} />
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="large" danger>
              <MdDelete style={{ fontSize: "25px" }} />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const headerLinks = [
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "25px",
            gap: "5px",
          }}
        >
          <FaHome />
          Home
        </div>
      ),
      href: "/",
    },
    {
      title: (
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "25px" }}
        >
          <PiStudentBold />
          Students
        </div>
      ),
      href: "/studentTable",
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "25px",
            gap: "5px",
          }}
        >
          <FaChalkboardTeacher />
          Teachers
        </div>
      ),
      href: "/teachertable",
    },
  ];
  return (
    <div>
      <Header
        brand={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IoMdOptions style={{ fontSize: "50px" }} />
            <p>Admin</p>
          </div>
        }
        headerLinks={headerLinks}
      />
      <Container>
        <h1 style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          Student
        </h1>
        <Table
          columns={columns}
          dataSource={list}
          style={{ marginTop: "20px" }}
        />
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>اسم الطالب</p>
          <Input
            placeholder="Ahmed ali hassan"
            onChange={(e) => handleStudentInputChange("name", e.target.value)}
          />
          <p>عمر الطالب</p>
          <Input
            placeholder="23"
            onChange={(e) => handleStudentInputChange("age", e.target.value)}
          />
          <p>المعدل</p>
          <Input
            placeholder="91"
            onChange={(e) => handleStudentInputChange("grade", e.target.value)}
          />
        </Modal>
      </Container>
    </div>
  );
}

export default Page;
