import { supabase } from "./supbase";
import { jwtDecode } from "jwt-decode";

export const checkAdmin = async (): Promise<boolean> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return false;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    console.error("Error fetching user role:", profileError?.message);
    return false;
  }

  return profile.role === "admin";
};

const uploadProfileImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `profiles/${fileName}`;

  const { data, error } = await supabase.storage
    .from("employees")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading profile image:", error.message);
    return null;
  }

  console.log("IMage upload successful");

  // Get the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("employees")
    .getPublicUrl(filePath);
  return urlData.publicUrl;
};

const signupUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error || !data.user) return null;

  return data.user.id;
};

export const saveEmployeeData = async (employee: Employee) => {
  const uuid = await signupUser(employee.work_email, employee.password);

  if (!uuid)
    return {
      success: false,
      error: "Unable to register user",
    };

  console.log(0);
  let profileUrl = null;

  console.log(1);

  if (employee.profile) {
    profileUrl = await uploadProfileImage(employee.profile);
    console.log(2);
    if (!profileUrl) {
      console.error("Failed to upload profile image.");
      console.log(3);
      return;
    }
  }

  console.log(4);
  const { error } = await supabase.from("employees").insert([
    {
      profile: profileUrl,
      work_email: employee.work_email,
      email: employee.email,
      first_name: employee.first_name,
      last_name: employee.last_name,
      display_name: employee.display_name,
      phone_number: employee.phone_number,
      gender: employee.gender,
      DOB: employee.DOB,
      job_title: employee.job_title,
      department: employee.department,
      type: employee.type,
      level: employee.level,
      DOJ: employee.DOJ,
      location: employee.location,
      salary: employee.salary,
      frequency: employee.frequency,
      supervisor: employee.supervisor,
      shift: employee.shift,
      leaves: employee.leaves,
      password: employee.password, // Ideally, hash this before storing
      uuid: uuid,
    },
  ]);
  console.log(5);

  if (error) {
    return {
      success: false,
      error: "Unable to register user",
    };
  } else {
    return {
      success: true,
      error: null,
      employee: {
        ...employee,
        profile: profileUrl,
      } as EmployeeWithId,
    };
  }
};

export const fetchEmployees = async () => {
  const { data, error } = await supabase.from("employees").select("*");

  if (error) {
    console.error("Error fetching employees:", error.message);
    return [];
  }

  return data;
};

export const fetchEmployeeFromId = async (id: string) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*") // Select all columns, modify if needed
    .eq("uuid", id) // Filter by UUID column
    .single(); // Ensure we get only one record

  if (error) {
    console.error("Error fetching employee:", error);
    return null;
  }

  return data;
};
