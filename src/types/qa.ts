export interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  date?: string;
  source?: string;
  mufti?: string;
  isUserSubmitted?: boolean;
  status?: 'published' | 'pending';
}

export interface QASubmission {
  id: string;
  name?: string;
  email?: string;
  category: string;
  question: string;
  detail?: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'published';
}

export interface QASubmissionRequest {
  name?: string;
  email?: string;
  category: string;
  question: string;
  detail?: string;
}

export interface QASubmissionResponse {
  success: boolean;
  message: string;
  submission?: QASubmission;
  error?: string;
}
