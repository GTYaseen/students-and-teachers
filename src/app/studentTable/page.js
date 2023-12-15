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
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getStudentData")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(list);
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
        <span style={{ display: "flex", justifyContent: "center" ,gap: "10px"}}>
          <Button size="large"><FaEdit style={{fontSize: "25px"}}/></Button>
          <Button size="large" danger><MdDelete style={{fontSize: "25px"}}/></Button>
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
        <h1 style={{ textAlign: "center" , marginTop: "20px",color:"white"}}>Student</h1>
        <Table columns={columns} dataSource={list} style={{marginTop: "20px"}}/>
      </Container>
    </div>
  );
}

export default Page;
