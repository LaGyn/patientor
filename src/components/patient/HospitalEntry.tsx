/* eslint-disable array-callback-return */

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DiagnoseEntry, HospitalEntry as Hospital, Patient } from '../../types';

const HospitalEntry: React.FC<{ entry: Hospital, patients: Patient[], diagnosis: DiagnoseEntry[] }> = ({ entry, patients, diagnosis }) => {
  const id = useParams().id
  const patient = patients.find((p: { id: string | undefined; }) => p.id === id)
  const patientCase = patient?.entries.map(d => d)
  console.log(patientCase); // Tulostaa entriesin = taulukon jossa oliot
  const diag = patientCase?.find(c => c.diagnosisCodes)
  console.log(diag?.diagnosisCodes); // tulostaa taulukon jossa diagnoosit
  const patientDiagnoses = diag?.diagnosisCodes;
  //const diagnoses = patient?.entries.map(e => e.diagnosisCodes?.map(d => d)); // tämä tekee arrayn arrayn sisälle, siksi ei voinut verrata taulukoita!
  const desc = diagnosis.filter(d => patientDiagnoses?.includes(d.code)).map(d => d);//Filtteröidään uuteen desc taulukkoon diagnosis-listalta ne alkiot,
  // joiden code-arvo sisältyy diagnoses taulukkoon. Etsitään nimet koodeille.
  console.log(desc);//Tulostaa henkilön diagnoosi oliot

  const style = {
    margin: 15
  }

  return (
    <div>
      <Card variant="outlined" key={entry.id}>
        <div style={style}>
          <p>{entry.date} <LocalHospitalIcon /></p>
          <i>{entry.description}</i>
          <ul>
          {entry.diagnosisCodes?.map(code => <li key={code}>{code} {desc.map(c => {if (c.code === code) {return c.name;}})} </li>)}
          </ul>
          <p>Diagnose by {entry.specialist}</p>
        </div>
      </Card>
    </div>
  )
}

export default HospitalEntry;