import type { QuestionType } from "../types/session.type";
import Card from "./ui/Card"

type PropsType = {
    item: QuestionType
    index: number,
    getScoreColor: (score: number) => string;
} 

const ResultCard = ({ item, index, getScoreColor }: PropsType) => {
  return (
    <Card
              key={item.id}
              className="p-6 sm:p-8 gap-8 transition-all hover:border-white/20"
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-black/5 pb-6">
                <div className="flex flex-col gap-3 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6D5ACF] bg-indigo-500/10 w-fit px-3 py-1 rounded-full">
                    Question {index + 1}
                  </span>
                  <h3 className="text-lg sm:text-xl font-medium text-zinc-600 leading-relaxed">
                    {item.questionText}
                  </h3>
                </div>
                <div className="shrink-0 flex flex-col items-center sm:items-end bg-white border border-black px-6 py-4">
                  <div
                    className={`text-4xl font-bold tracking-tight ${getScoreColor(item.answers[0].score || 0)}`}
                  >
                    {item.answers[0] && item.answers[0].score}
                  </div>
                  <span className="text-xs text-zinc-600 uppercase font-bold tracking-widest mt-1">
                    Score
                  </span>
                </div>
              </div>

              {/* Answer & Feedback Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest ml-1">
                    Your Answer
                  </h4>
                  <div className="bg-white border border-black p-5 text-zinc-600 text-sm leading-relaxed h-full">
                    { item.answers[0] && item.answers[0].answerText}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-[#6D5ACF] uppercase tracking-widest ml-1">
                    AI Feedback
                  </h4>
                  <div className="bg-indigo-500/5 border border-indigo-500 p-5 text-indigo-400 text-sm leading-relaxed h-full">
                    { item.answers[0] && item.answers[0].feedback}
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Strengths
                  </h4>
                  <div className="text-sm text-emerald-400 leading-relaxed bg-emerald-500/5 border border-emerald-500 p-5 h-full">
                    { item.answers[0] && item.answers[0].strengths}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Areas to Improve
                  </h4>
                  <div className="text-sm text-amber-400 leading-relaxed bg-amber-500/5 border border-amber-500 p-5 h-full">
                   { item.answers[0] && item.answers[0].improvements}
                  </div>
                </div>
              </div>
            </Card>
  )
}

export default ResultCard