import Groq from "groq-sdk";
import { env } from "../../env.ts";

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

type QuestionType = {
  questionText: string;
  category: string;
  sessionId: string;
  orderIndex: number;
};

type GeneratedQuestionsType = {
  questions: QuestionType[];
};

export const generateQuestions = async (
  jobDescription: string,
  resumeText: string,
  sessionId: string,
): Promise<GeneratedQuestionsType> => {
  const propmt = `
    You are an expert technical interviewer.
    
    Job Description:
    ${jobDescription}
    
    Candidate Resume:
    ${resumeText}
    
    Generate exactly 5 interview questions tailored to this role and candidate.
    Mix behavioral, technical, and situational questions.
    
    Return ONLY valid JSON in this format:
    {
      "questions": [
        { "questionText": "...", "category": "behavioral", "orderIndex": 0, "sessionId": ${sessionId} },
        { "questionText": "...", "category": "technical", "orderIndex": 1, "sessionId": ${sessionId} },
        ...
      ]
    }
  `;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an expert technical interviewer. Always respond with valid JSON string only.",
      },
      { content: propmt, role: "user" },
    ],
    model: "llama-3.3-70b-versatile",
  });

  if (!response.choices[0]?.message.content) {
    throw new Error("GROQ FAILED");
  }

  const cleaned = response.choices[0]?.message.content
    .replace(/```json\n?|\n?```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

type AnswerType = {
  answerText: string,
  score: number,
  feedback: string,
  strengths: string,
  improvements: string,
  questionId: string,
}

export const gradeAnswer = async (
  answerText: string,
  questionText: string,
  jobDescription: string,
  questionId: string
): Promise<AnswerType> => {
  const prompt = `You are grading an interview answer for the following role:

Job Description:
${jobDescription}

Interview Question:
${questionText}

Candidate's Answer:
${answerText}

Grade this answer and return ONLY this exact JSON structure:
{
  "answerText":${answerText},
  "score": 7,
  "feedback": "2-3 sentence overall coaching comment about the answer",
  "strengths": "What the candidate did well in their answer",
  "improvements": "One specific thing they should improve or add next time",
  "questionId": ${questionId}
}

Scoring guide:
0-3: Poor — vague, off-topic, or very incomplete
4-5: Below average — some relevant points but missing key details  
6-7: Good — solid answer with minor gaps
8-9: Great — clear, structured, and relevant
10: Perfect — concise, specific, uses STAR method or strong examples
  `;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a strict but fair interview coach grading a candidate's answer.
Always respond with raw valid JSON only. No markdown, no code fences, no backticks, no explanation. Just the JSON object.`,
      },
      { content: prompt, role: "user" },
    ],
    model: "llama-3.3-70b-versatile",
  });

  if (!response.choices[0]?.message.content) {
    throw new Error("GROQ FAILED");
  }

  const cleaned = response.choices[0]?.message.content
    .replace(/```json\n?|\n?```/g, "")
    .trim();

  return JSON.parse(cleaned);
};
