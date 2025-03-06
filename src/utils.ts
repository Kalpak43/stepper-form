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

export const saveEmployeeData = async (employee: Employee) => {
  let profileUrl = null;

  if (employee.profile) {
    profileUrl = await uploadProfileImage(employee.profile);
    if (!profileUrl) {
      console.error("Failed to upload profile image.");
      return;
    }
  }

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
    },
  ]);

  if (error) {
    console.error("Error saving employee data:", error.message);
  } else {
    console.log("Employee data saved successfully.");
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
