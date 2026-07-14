const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const {zodToJsonSchema} = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number(),
    title: z.string(),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
});

const generateInterviewReport = async ({
    resume,
    selfDescription,
    jobDescription
}) => {

    const prompt = `
You are a Senior Technical Interviewer.

Return ONLY valid JSON.

Do NOT use markdown.

The JSON MUST have EXACTLY this structure:

{
  "matchScore": ..,
  "title": "...",
  "technicalQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "...",
      "intention": "...",
      "answer": "..."
    }
  ],
  "skillGaps": [
    {
      "skill": "...",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "...",
      "tasks": [
        "...",
        "..."
      ]
    }
  ]
}

Generate:
- 10 technical questions
- 5 behavioral questions
- 3-5 skill gaps
- 7 preparation days

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });

    console.log("RAW RESPONSE:");
    console.log(response.text);

    const parsed = JSON.parse(response.text);

    return interviewReportSchema.parse(parsed);
};

module.exports = { generateInterviewReport }


