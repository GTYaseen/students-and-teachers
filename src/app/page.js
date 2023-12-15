"use client";
import "./page.module.css";
import Container from "./components/container/container";
import Student from "./components/student/student";
import Teacher from "./components/Teacher/Teacher";
import { Header } from "./components/header/Header";

function App() {
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
    <>
      <Header brand={"Kataki"} headerLinks={headerLinks} />
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
