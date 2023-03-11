/* eslint-disable array-callback-return */
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DiagnoseEntry, OccupationalHealthcareEntry as Occupation, Patient } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry: React.FC<{ entry: Occupation, patients: Patient[], diagnosis: DiagnoseEntry[] }> = ({entry, patients, diagnosis}) => {
  const id = useParams().id
  const patient = patients.find((p: { id: string | undefined; }) => p.id === id)
  const patientCase = patient?.entries.map(d => d)
  console.log(patientCase); // Tulostaa entriesin = taulukon jossa oliot
  const diag = patientCase?.find(c => c.diagnosisCodes)
  console.log(diag?.diagnosisCodes); // tulostaa taulukon jossa diagnoosit
  const patientDiagnoses = diag?.diagnosisCodes;
  const desc = diagnosis.filter(d => patientDiagnoses?.includes(d.code)).map(d => d);
  console.log(desc);

  const style = {
    margin: 15
  }

  return (
      <div>
        <Card variant="outlined" key={entry.id}>
          <div style={style}>
            <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
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

export default OccupationalHealthcareEntry;