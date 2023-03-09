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
  const diagnoses = patient?.entries.map(e => e.diagnosisCodes?.map(d => d));
  console.log(diagnoses?.map(d => d === diagnosis.map(c => c.code)))
  console.log(diagnoses?.length);
  /*
  for (let i = 0; i < diagnoses.length; i++) {
    
    let toPrint = diagnosis.map(c => c.code === diagnoses[i]) 
    console.log(toPrint);
    
  }*/
  //Monesko listalla tietty koodi on? Samalla indeksillä löytyy nimi.
  /*
  const listDiagnose = diagnosis.map(d => d.code)
  diagnoses?.forEach(d => {
    if (listDiagnose.includes(d)) {
      return true
    }
  })
  console.log(listDiagnose); // Kaikkien diagnoosien koodit*/
  console.log(diagnoses); //Henkilön lista diagnooseista koodina
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
          {patient?.entries.map(e => e.diagnosisCodes?.map(code => <li key={code}>{code} {diagnosis.map(c => c.name)}</li>))}
        </ul>
      </Typography>
    </div>
  )
}

export default PatientPage;
