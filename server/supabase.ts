import { createClient } from "@supabase/supabase-js";

// Client for public/anon operations (with RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (bypasses RLS)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const uploadProfilePhoto = async (
  file: File,
  userId: string,
): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `profile-photos/${fileName}`;

  // Use admin client to bypass RLS
  const { error } = await supabaseAdmin.storage
    .from("job-applications")
    .upload(filePath, file);

  if (error) {
    throw new Error(`Failed to upload photo: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("job-applications").getPublicUrl(filePath);

  return publicUrl;
};
