import logo from './logo.svg';
import './App.css';
import { Route, Routes, Router, useNavigate } from 'react-router-dom';
import { FormField } from 'semantic-ui-react';
import { Button, Form, Checkbox, Table } from 'semantic-ui-react';
// import { fontSize } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
// import { Button, TextField } from '@mui/material';
// const API_URL = "https://638cafbcd2fc4a058a5d556b.mockapi.io/student"
  const API_URL="https://6471ae176a9370d5a41a8de0.mockapi.io/user"
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
            <Button color="inherit" onClick={() => navigate("/create")} >Create</Button>
            <Button color="inherit" onClick={() => navigate("/read")}>Read</Button>
            <Button color="inherit" onClick={() => navigate("/update")}>Update</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <h1 style={{ color: "brown" }}>CRUD WITH STUDENT & TEACHER MANAGEMENT</h1>
      <Routes>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/read' element={<Read />}></Route>
        <Route path='/update' element={<Update />}></Route>
      </Routes>
    </div>
  );
}

function Create() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [classs, setClasss] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");

  const openData = async () => {
    await axios.post(API_URL, { name, classs, rollNumber, teacher, subject })
    console.log(openData);
    navigate('/read')
  }
  return (
    <Form>
      <FormField>
        <label>Name</label>
        <input placeholder='enter the name' value={name} onChange={event => setName(event.target.value)} /><br></br>
      </FormField>
      <FormField>
        <label>Class</label>
        <input placeholder='enter the class' value={classs} onChange={event => setClasss(event.target.value)} /><br></br>
      </FormField>
      <FormField>
        <label>Roll Number</label>
        <input placeholder='enter the roll number' value={rollNumber} onChange={event => setRollNumber(event.target.value)} /><br></br>
      </FormField>
      <FormField>
        <label>Teacher</label>
        <input placeholder='enter the teacher name' value={teacher} onChange={event => setTeacher(event.target.value)} /><br></br>
      </FormField>
      <FormField>
        <label>Subject</label>
        <input placeholder='enter the subject' value={subject} onChange={event => setSubject(event.target.value)} /><br></br>
      </FormField><br></br>
      <Button id="button" onClick={openData}> Submit</Button>
    </Form>

  )
}
function Read() {
  const navigate = useNavigate();
  const [apiData, setAPIData] = useState([]);
  const updateUser = ({ name, classs, rollNumber, teacher, subject, id }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("classs", classs);
    localStorage.setItem("rollNumber", rollNumber);
    localStorage.setItem("teacher", teacher);
    localStorage.setItem("subject", subject);

    navigate("/update")
  }

  const callGetAPI = async () => {
    const res = await axios.get(API_URL);
    setAPIData(res.data);
  }
  const deleteUser = async (id) => {
    await axios.delete(API_URL + "/" + id)
    callGetAPI();
  }
  useEffect(() => {
    callGetAPI();
  }, []);
  return (
    <div className='read'>
      <Table singleLine>
        <Table.Header >
          <Table.Row >
            <Table.HeaderCell> Name</Table.HeaderCell>
            <Table.HeaderCell>Class</Table.HeaderCell>
            <Table.HeaderCell>Roll Number</Table.HeaderCell>
            <Table.HeaderCell>Teacher</Table.HeaderCell>
            <Table.HeaderCell>Subject</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            apiData.map(data => (

              <Table.Row key={data.id}>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.classs}</Table.Cell>
                <Table.Cell>{data.rollNumber}</Table.Cell>
                <Table.Cell>{data.teacher}</Table.Cell>
                <Table.Cell>{data.subject}</Table.Cell>
                <Table.Cell><Button onClick={() =>
                  deleteUser(data.id)}>Delete</Button></Table.Cell>
                <Table.Cell><Button onClick={() =>
                  updateUser(data)}>Update</Button></Table.Cell> 

              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  )
}
function Update() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [classs, setClasss] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [id, setId] = useState("");
  const updateUser = async () => {
    await axios.put(API_URL + "/" + id, {
      name, classs, rollNumber,teacher,subject
    })
    navigate("/read")
  }
  useEffect(() => {
    setId(localStorage.getItem("id"))
    setName(localStorage.getItem("name"))
    setClasss(localStorage.getItem("classs"))
    setTeacher(localStorage.getItem("teacher"))
    setRollNumber(localStorage.getItem("rollNumber"))
    setSubject(localStorage.getItem("subject"))
  }, [])
  return (
    <Form>
    <FormField>
      <label>Name</label>
      <input placeholder='enter the name' value={name} onChange={event => setName(event.target.value)} /><br></br>
    </FormField>
    <FormField>
      <label>Class</label>
      <input placeholder='enter the class' value={classs} onChange={event => setClasss(event.target.value)} /><br></br>
    </FormField>
    <FormField>
      <label>Roll Number</label>
      <input placeholder='enter the roll number' value={rollNumber} onChange={event => setRollNumber(event.target.value)} /><br></br>
    </FormField>
    <FormField>
      <label>Teacher</label>
      <input placeholder='enter the teacher name' value={teacher} onChange={event => setTeacher(event.target.value)} /><br></br>
    </FormField>
    <FormField>
      <label>Subject</label>
      <input placeholder='enter the subject' value={subject} onChange={event => setSubject(event.target.value)} /><br></br>
    </FormField><br></br>
    <Button id="button" onClick={updateUser}> Update</Button>
  </Form>
  )
}

export default App;