import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Jobs
export const createJob = async (jobData) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert([{ ...jobData, created_by: supabase.auth.user()?.id }])
    .select();
  return { data, error };
};

export const updateJob = async (id, updates) => {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const getJobs = async () => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// Candidates
export const createCandidate = async (candidateData) => {
  const { data, error } = await supabase
    .from('candidates')
    .insert([candidateData])
    .select();
  return { data, error };
};

export const updateCandidate = async (id, updates) => {
  const { data, error } = await supabase
    .from('candidates')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const getCandidates = async () => {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// Interviews
export const createInterview = async (interviewData) => {
  const { data, error } = await supabase
    .from('interviews')
    .insert([{ ...interviewData, created_by: supabase.auth.user()?.id }])
    .select();
  return { data, error };
};

export const updateInterview = async (id, updates) => {
  const { data, error } = await supabase
    .from('interviews')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const getInterviews = async () => {
  const { data, error } = await supabase
    .from('interviews')
    .select(`
      *,
      jobs (*),
      candidates (*)
    `)
    .order('scheduled_at', { ascending: true });
  return { data, error };
};

// Messages
export const createMessage = async (messageData) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ ...messageData, created_by: supabase.auth.user()?.id }])
    .select();
  return { data, error };
};

export const updateMessage = async (id, updates) => {
  const { data, error } = await supabase
    .from('messages')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const getMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      candidates (*)
    `)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Templates
export const createTemplate = async (templateData) => {
  const { data, error } = await supabase
    .from('message_templates')
    .insert([{ ...templateData, created_by: supabase.auth.user()?.id }])
    .select();
  return { data, error };
};

export const updateTemplate = async (id, updates) => {
  const { data, error } = await supabase
    .from('message_templates')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const getTemplates = async () => {
  const { data, error } = await supabase
    .from('message_templates')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// FAQs
export const createFAQ = async (faqData) => {
  const { data, error } = await supabase
    .from('faqs')
    .insert([{ ...faqData, created_by: supabase.auth.user()?.id }])
    .select();
  return { data, error };
};

export const updateFAQ = async (id, updates) => {
  const { data, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const getFAQs = async () => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// Storage helpers
export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  return { data, error };
};

export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  return data.publicUrl;
};