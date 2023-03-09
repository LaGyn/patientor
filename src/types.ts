export type Diagnose = "Disorder of ligament" | "Other specified intervertebral disc displacement" |
"Sprain and strain of joints and ligaments of other and unspecified parts of head" | 
"Influenza with other respiratory manifestations, other influenza virus codeentified" |
"Acute upper respiratory infection, unspecified" | "Occupational exposure to radiation" |
"Acute cystitis" | "Unspecified visual loss" | "Streptococcal tonsillitis" | "Onycholysis" |
"Need for continuous supervision" | "Atopic dermatitis" | "Adjustment disorders" | "Fracture of thumb" |
"Other proliferative retinopathy";

export type Diagnosis = "M24.2" | "M51.2" | "S03.5" | "J10.1" | "J06.9" | "Z57.1" | "N30.0" | "H54.7" |
 "J03.0" | "L60.1" | "Z74.3" | "L20" | "F43.2" | "S62.5" | "H35.29";

export interface DiagnoseEntry {
  code: Diagnosis;
  name: Diagnose;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface Sickleave {
  startDate: string;
  endDate:string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: Sickleave;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;