import React, { useState } from "react";

interface QuestionData {
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface AddQuestionFormProps {
  onSubmit: (data: QuestionData) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (correctAnswer === null) {
      alert("من فضلك اختر الإجابة الصحيحة");
      return;
    }

    onSubmit({ question, answers, correctAnswer });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-white mb-1">عنوان السؤال</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="space-y-3">
        {["أ", "ب", "ج", "د"].map((label, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="correctAnswer"
              checked={correctAnswer === index}
              onChange={() => setCorrectAnswer(index)}
              className="accent-green-500"
            />
            <input
              type="text"
              placeholder={`الإجابة ${label}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="flex-1 border rounded-xl text-white border-gray-300  px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}
      </div>

      {/* <div className="text-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          حفظ السؤال
        </button>
      </div> */}
    </div>
  );
};

export default AddQuestionForm;
