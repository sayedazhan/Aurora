import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function login(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function register(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function logout() {
  return supabase.auth.signOut();
}

export async function getSession() {
  return supabase.auth.getSession();
}

export async function getUser() {
  return supabase.auth.getUser();
}