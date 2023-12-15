"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Container from "../components/container/Container";
import axios from "axios";
import { Header } from "../components/header/Header";
import { Button } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Page() {
  const [list, setList] = useState([]); // State to store the data

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("http://localhost:5001/api/getTeacherData")
      .then((response) => {
        // Update the state with the fetched data
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts
  console.log(list);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "teachername", // Update to match the actual property name
      key: "teachername",
    },
    {
      title: "Age",
      dataIndex: "teacherage", // Update to match the actual property name
      key: "teacherage",
    },
    {
      title: "Specialization",
      dataIndex: "teachersp", // Update to match the actual property name
      key: "teachersp",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <Button size="large">
            <FaEdit style={{ fontSize: "25px" }} />
          </Button>
          <Button size="large" danger>
            <MdDelete style={{ fontSize: "25px" }} />
          </Button>
        </span>
      ),
    },
  ];

  const headerLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Students",
      href: "/studentTable",
    },
    {
      title: "Teachers",
      href: "/teachertable",
    },
  ];
  return (
    <div>
      <Header brand={"Kataki"} headerLinks={headerLinks} />
      <Container>
        <h1 style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          Teacher
        </h1>
        <Table
          columns={columns}
          dataSource={list}
          style={{ marginTop: "20px" }}
        />
      </Container>
    </div>
  );
}

export default Page;
