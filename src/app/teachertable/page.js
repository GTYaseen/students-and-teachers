"use client";
import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import Container from "../components/container/Container";
import { Input } from "antd";
import axios from "axios";
import { Header } from "../components/header/Header";
import { Button, Popconfirm } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

function Page() {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: "",
    age: "",
    sp: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/getTeacherData")
      .then((response) => {
        // Update the state with the fetched data
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [list]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/api/deleteTeacherData/${id}`)
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
    const { id, name, age, sp } = teacherData;
    try {
      const response = await axios.put(
        `http://localhost:5001/api/updateTeacherData/${id}`,
        {
          name,
          age,
          sp,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setIsModalOpen(false);
  };
  const showModal = (id) => {
    setTeacherData({
      name: "", // Reset the form when opening the modal
      age: "",
      sp: "",
    });
    setIsModalOpen(true);
    // Set the id in the teacherData state
    setTeacherData((prevData) => ({
      ...prevData,
      id,
    }));
  };
  const handleTeacherInputChange = (field, value) => {
    setTeacherData({
      ...teacherData,
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
      dataIndex: "teachername",
      key: "teachername",
    },
    {
      title: "Age",
      dataIndex: "teacherage",
      key: "teacherage",
    },
    {
      title: "Specialization",
      dataIndex: "teachersp",
      key: "teachersp",
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
          Teacher
        </h1>
        <Table
          columns={columns}
          dataSource={list}
          style={{ marginTop: "20px" }}
        />
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            onChange={(e) => handleTeacherInputChange("sp", e.target.value)}
          />
        </Modal>
      </Container>
    </div>
  );
}

export default Page;
