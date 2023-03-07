import { ReactElement } from 'react';
import { useParams } from "react-router-dom";
import { Patient } from "../types";
//import patients from '../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}
let icon: ReactElement | null = null;

const PatientPage = ({patients, setPatients} : Props) => {
  //const [patients] = useState()
  const id = useParams().id
  const patient = patients.find((p: { id: string | undefined; }) => p.id === id)
  console.log(id);
  console.log(patient);
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
      <h2>{patient?.name} {icon}</h2>
      <strong>Socialsecurity number: {patient?.ssn}</strong><br/>
      <strong>Occupation: {patient?.occupation}</strong>
    </div>
  )
}

export default PatientPage;