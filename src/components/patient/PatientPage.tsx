/* eslint-disable array-callback-return*/
import React from 'react'
import { ReactElement } from 'react';
import { useParams } from "react-router-dom";
import { DiagnoseEntry, Entry, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Typography } from '@mui/material';
import HospitalEntry from './HospitalEntry';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { assert } from 'console';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HealthCheckEntry from './HealthCheckEntry';

interface Props {
  patients : Patient[] // Tarvitaan jotta sen tietyn potilaan määrittely onnistuu
  //setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  entries : Entry[]
  diagnosis : DiagnoseEntry[]
  entry?: Entry
  //setEntry: React.Dispatch<React.SetStateAction<Entry>>
}
let icon: ReactElement | null = null;

const EntryDetails: React.FC<{ entry?: Entry, patients: Patient[], diagnosis: DiagnoseEntry[] }> = ({ entry, patients, diagnosis }) => {
  switch (entry?.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} patients={patients} diagnosis={diagnosis} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} patients={patients} diagnosis={diagnosis} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} patients={patients} diagnosis={diagnosis} />
    default:
      return assertNever(entry);
  }
}

const PatientPage = ({ patients, diagnosis } : Props) => {
  const id = useParams().id
  const patient = patients.find((p: { id: string | undefined; }) => p.id === id)
  console.log(diagnosis); //Diagnoosi oliot tietokannasta
  console.log(diagnosis.map(c => c.code));
  
  console.log(id);
  console.log(patient);
  // Gender icon:
  //let icon: string = '';
  if (patient?.gender === 'female') {
    icon = <FemaleIcon />;
  } else if (patient?.gender === 'male') {
    icon = <MaleIcon />;
  } else if (patient?.gender === 'other') {
    icon = <TransgenderIcon />
  }

  return (
    <div>
      <Typography>
        <h2>{patient?.name} {icon}</h2>
        <p>Socialsecurity number: {patient?.ssn}<br/>
        Occupation: {patient?.occupation}</p>
        <h3>Entries</h3>
        <div>
          {patient?.entries.map(entry => <EntryDetails key={entry?.id} entry={entry} patients={patients} diagnosis={diagnosis} />)}
        </div>
      </Typography>
    </div>
  )
}

export default PatientPage;

function assertNever(entry: undefined): ReactElement<any, any> | null {
  throw new Error('Function not implemented.');
}
/*
{patient?.entries.map(e => <p>{e.date} <i>{e.description}</i></p>)} 
<ul>
  {patient?.entries.map(e => e.diagnosisCodes?.map(code => <li key={code}>{code} {desc.map(c => {if (c.code === code) {return c.name;}})} <EntryDetails entry={entries.filter(e => e.type)} /></li>))}

</ul>*/