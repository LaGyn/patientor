import { useState, useEffect } from "react";

import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { DiagnoseEntry, Entry, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/patient/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [entries] = useState<Entry[]>([]);
  const [diagnosis, setDiagnosis] = useState<DiagnoseEntry[]>([]);
  const [entry, ] = useState<Entry>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
      console.log(patients);
    };
    void fetchPatientList();
  }, []);
  
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosis = await diagnoseService.getAll();
      setDiagnosis(diagnosis);
      //console.log(diagnosis)
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage patients={patients} entries={entries} diagnosis={diagnosis} entry={entry} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
