// Result Model/Interface
export interface QuizResult {
  id: string; // Unique result ID
  studentName: string; // Student name
  quizName: string; // Quiz name/identifier
  score: number; // Number of correct answers
  totalQuestions: number; // Total questions in quiz
  percentage: number; // Percentage score
  dateAttempted: Date; // When quiz was taken
  answers: QuestionAnswer[]; // Question-wise answers
}

export interface QuestionAnswer {
  questionIndex: number; // Index of question
  questionText: string; // Question text
  userAnswer: number; // User's selected answer index
  userAnswerText: string; // User's answer text
  correctAnswer: number; // Correct answer index
  correctAnswerText: string; // Correct answer text
  isCorrect: boolean; // Whether answer was correct
}

// Example result structure:
// {
//   id: "r1234567890",
//   studentName: "John Doe",
//   quizName: "General Knowledge Quiz",
//   score: 8,
//   totalQuestions: 10,
//   percentage: 80,
//   dateAttempted: new Date("2024-01-20"),
//   answers: [...]
// }
