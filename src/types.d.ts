interface Employee {
  id: number;
  profile: string;
  work_email: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  phone_number: string;
  gender: "male" | "female" | "other";
  DOB: Date;
  job_title: string;
  department: string;
  type: string;
  level: string;
  DOJ: Date;
  location: string;
  salary: number;
  frequency: string;
  supervisor: string;
  shift: string;
  leaves: {
    annual: number;
    sick: number;
  };
}
