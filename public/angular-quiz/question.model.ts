// Question Model/Interface
export interface Question {
  id: string; // Unique identifier
  question: string; // Question text
  options: string[]; // Array of 4 options
  correct: number; // Index of correct answer (0-based)
  createdAt?: Date; // Optional: creation timestamp
  updatedAt?: Date; // Optional: update timestamp
}

// Example question structure:
// {
//   id: "q1",
//   question: "What is the capital of France?",
//   options: ["London", "Berlin", "Paris", "Madrid"],
//   correct: 2
// }
