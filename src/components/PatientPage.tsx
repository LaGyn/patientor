/* eslint-disable array-callback-return*/
import { ReactElement } from 'react';
import { useParams } from "react-router-dom";
import { DiagnoseEntry, Entry, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Typography } from '@mui/material';

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  entries : Entry[]
  diagnosis : DiagnoseEntry[]
}
let icon: ReactElement | null = null;

const PatientPage = ({patients, setPatients, entries, diagnosis} : Props) => {
  //const [patients] = useState()
  const id = useParams().id
  const patient = patients.find((p: { id: string | undefined; }) => p.id === id)
  console.log(diagnosis); //Diagnoosi oliot tietokannasta
  console.log(diagnosis.map(c => c.code));
  const patientCase = patient?.entries.map(d => d)
  console.log(patientCase); // Tulostaa entriesin = taulukon jossa oliot
  const diag = patientCase?.find(c => c.diagnosisCodes)
  console.log(diag?.diagnosisCodes); // tulostaa taulukon jossa diagnoosit
  const patientDiagnoses = diag?.diagnosisCodes;
  //const diagnoses = patient?.entries.map(e => e.diagnosisCodes?.map(d => d)); // tämä tekee arrayn arrayn sisälle, siksi ei voinut verrata taulukoita!
  const desc = diagnosis.filter(d => patientDiagnoses?.includes(d.code)).map(d => d);//Filtteröidään uuteen desc taulukkoon diagnosis-listalta ne alkiot,
  // joiden code-arvo sisältyy diagnoses taulukkoon. Etsitään nimet koodeille.
  
  console.log(desc);//Tulostaa henkilön diagnoosi oliot
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
        {patient?.entries.map(e => <p>{e.date} <i>{e.description}</i></p>)} 
        <ul>
          {patient?.entries.map(e => e.diagnosisCodes?.map(code => <li key={code}>{code} {desc.map(c => {if (c.code === code) {return c.name;}})}</li>))}
        </ul>
      </Typography>
    </div>
  )
}

export default PatientPage;
