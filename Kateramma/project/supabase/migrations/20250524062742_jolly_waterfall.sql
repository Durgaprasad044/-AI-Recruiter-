/*
  # Initial Schema Setup for AI Recruiter Agent

  1. New Tables
    - users (handled by Supabase Auth)
    - jobs
      - Basic job posting information
      - Status tracking
      - Timestamps
    - candidates
      - Candidate profile information
      - Application status
      - Resume storage
    - interviews
      - Interview scheduling
      - Type and status tracking
      - Feedback storage
    - messages
      - Communication history
      - Template tracking
      - Delivery status

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  resume_url text,
  skills text[],
  experience_years integer,
  education text,
  status text NOT NULL DEFAULT 'new',
  match_score integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all candidates"
  ON candidates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create candidates"
  ON candidates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update candidates"
  ON candidates
  FOR UPDATE
  TO authenticated
  USING (true);

-- Job Applications junction table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  applied_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create applications"
  ON job_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update applications"
  ON job_applications
  FOR UPDATE
  TO authenticated
  USING (true);

-- Interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  scheduled_at timestamptz NOT NULL,
  feedback text,
  score integer,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all interviews"
  ON interviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create interviews"
  ON interviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their interviews"
  ON interviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  subject text NOT NULL,
  content text NOT NULL,
  template_id text,
  status text NOT NULL DEFAULT 'pending',
  sent_at timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their messages"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Message Templates table
CREATE TABLE IF NOT EXISTS message_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  tags text[],
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all templates"
  ON message_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create templates"
  ON message_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their templates"
  ON message_templates
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Support FAQ table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all FAQs"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create FAQs"
  ON faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their FAQs"
  ON faqs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);