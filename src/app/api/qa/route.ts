import { NextRequest, NextResponse } from 'next/server';
import type { QASubmission, QASubmissionRequest, QASubmissionResponse } from '@/types/qa';

// In-memory persistent array across requests in this Node process
const storedSubmissions: QASubmission[] = [
  {
    id: 'QA-2026-8801',
    name: 'আব্দুল করিম',
    email: 'karim@example.com',
    category: 'দৈনন্দিন ফিকহ',
    question: 'সফরে গাড়িতে থাকা অবস্থায় কি ইশারায় ফরজ নামাজ আদায় করা যাবে?',
    detail: 'বাস বা ট্রেনে ভ্রমণের সময় যদি নামার কোনো সুযোগ না থাকে এবং ওয়াক্ত শেষ হয়ে যাওয়ার আশঙ্কা থাকে তখন কী করণীয়?',
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'published',
  },
  {
    id: 'QA-2026-8802',
    name: 'রাশেদ চৌধুরী',
    category: 'রোজা ও রমজান',
    question: 'চোখে ড্রপ বা নাকের স্প্রে ব্যবহার করলে কি রোজার কোনো ক্ষতি হয়?',
    detail: 'অ্যালার্জি ও সাইনাসের সমস্যার জন্য চিকিৎসকের পরামর্শে স্প্রে নিতে হয়।',
    submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'published',
  },
];

export async function POST(req: NextRequest): Promise<NextResponse<QASubmissionResponse>> {
  try {
    const body: QASubmissionRequest = await req.json();

    const { name, email, category, question, detail } = body;

    // Validation
    if (!question || typeof question !== 'string' || question.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'অনুগ্রহ করে কমপক্ষে ৫ অক্ষরের একটি স্পষ্ট প্রশ্ন লিখুন।',
          error: 'INVALID_QUESTION',
        },
        { status: 400 }
      );
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'অনুগ্রহ করে প্রশ্নের সঠিক বিভাগ নির্বাচন করুন।',
          error: 'INVALID_CATEGORY',
        },
        { status: 400 }
      );
    }

    // Email validation if supplied
    if (email && typeof email === 'string' && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          {
            success: false,
            message: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।',
            error: 'INVALID_EMAIL',
          },
          { status: 400 }
        );
      }
    }

    // Generate unique ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const submissionId = `QA-${new Date().getFullYear()}-${randomSuffix}`;

    const newSubmission: QASubmission = {
      id: submissionId,
      name: name?.trim() || 'বেনামী জিজ্ঞাসা',
      email: email?.trim() || undefined,
      category: category.trim(),
      question: question.trim(),
      detail: detail?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // Store in memory
    storedSubmissions.unshift(newSubmission);

    return NextResponse.json(
      {
        success: true,
        message: 'আপনার প্রশ্নটি সফলভাবে জমা হয়েছে! বিজ্ঞ মুফতি ও গবেষকগণের পর্যালোচনা শেষে উত্তর ওয়েবসাইটে প্রকাশিত হবে।',
        submission: newSubmission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('QA Submission API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'প্রশ্ন জমা নেওয়ার সময় একটি অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    total: storedSubmissions.length,
    submissions: storedSubmissions,
  });
}
