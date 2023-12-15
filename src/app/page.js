"use client";
import "./page.module.css";
import Container from "./components/container/container";
import Student from "./components/student/student";
import Teacher from "./components/Teacher/Teacher";
import { Header } from "./components/header/Header";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FaHome } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

function App() {
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
  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "650px",
  };
  const slideImages = [
    {
      url: "https://cdn.discordapp.com/attachments/1041129857481977898/1185308882931814470/787e9b767b0a0c50ab752edfec94c280.jpg?ex=658f23eb&is=657caeeb&hm=74bc0d85b854bf3f8e8d8980deed6d861ca581a8ba97567a40d7b1bc0c891f19&",
    },
    {
      url: "https://cdn.discordapp.com/attachments/1041129857481977898/1185309765069451264/587127ef72916100f3e98e80b9b8f8e0.jpg?ex=658f24bd&is=657cafbd&hm=f44acd3ec95b48d251cccfc5d3c978f7bb487591f986bb4a4e45d929fce067b4&",
    },
    {
      url: "https://cdn.discordapp.com/attachments/1041129857481977898/1185311059498766436/eb58eaf70a50b612262be8fc5e5affbf.png?ex=658f25f2&is=657cb0f2&hm=9db4d1a3a69d7c50f625fa8a0d9d8d1af628203375897289b1b405d46ff610db&",
    },
  ];
  return (
    <>
      <Header
        brand={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IoMdOptions style={{ fontSize: "50px" }} />
            <p>Admin</p>
          </div>
        }
        headerLinks={headerLinks}
      />
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
      <Container>
        <div className="App">
          <Student />
          <Teacher />
        </div>
      </Container>
    </>
  );
}

export default App;
