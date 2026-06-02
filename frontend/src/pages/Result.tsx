import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import PageWrapper from "../components/ui/PageWrapper";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import ResultCard from "../components/ResultCard";

import api from "../api/api";
import type { QuestionType } from "../types/session.type";

const Result = () => {
  const { id } = useParams();

  const [results, setResults] = useState<QuestionType[]>([]);
  const [overallScore, setOverallScore] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setTimeout(async () => {
        try {
          setLoading(true);
          const session = await api.get(`/sessions/${id}`);
          if (
            session.data.session.questions &&
            session.data.session.questions.length > 0
          ) {
            const hasAnswers = session.data.session.questions.every(
              (item: QuestionType) => item.answers.length > 0,
            );
            if (!hasAnswers) {
              toast.error("Questions are not answered");
              navigate("/");
            }
            setResults(session.data.session.questions);
            setOverallScore(session.data.session.overallScore);
          }
        } catch (err) {
        } finally {
          setLoading(false);
        }
      }, 3000);
    };
    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <Spinner
          text="Analyzing Performance"
          subtext="Our AI is reviewing your answers and generating detailed feedback..."
        />
      </PageWrapper>
    );
  }

  const getOverallScoreColor = (score: number) => {
    if (score >= 35) return "text-emerald-400";
    if (score >= 15) return "text-amber-400";
    return "text-red-400";
  };

  const getOverallScoreRing = (score: number) => {
    if (score >= 35) return "border-emerald-500/30";
    if (score >= 15) return "border-amber-500/30";
    return "border-red-500/30";
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-emerald-400";
    if (score >= 4) return "text-amber-400";
    return "text-red-400";
  };

  return (
    <PageWrapper className="sm:p-8">
      {/* Overall Score Section */}
      <Card className="w-full max-w-5xl flex-row items-center gap-10 mb-10">
        <div
          className={`relative shrink-0 flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-full border-[8px] ${getOverallScoreRing(overallScore)} shadow-[0_0_40px_rgba(255,255,255,0.03)]`}
        >
          <div className="flex flex-col items-center">
            <span
              className={`text-5xl sm:text-6xl font-bold tracking-tight ${getOverallScoreColor(overallScore)}`}
            >
              {overallScore}
            </span>
            <span className="text-xs font-semibold text-zinc-600 mt-1 uppercase tracking-widest">
              Overall
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-800 tracking-tight">
            Interview Evaluation Complete
          </h1>
          <p className="text-zinc-600 leading-relaxed text-sm sm:text-base max-w-2xl">
            Great job completing the session! We've analyzed your responses
            based on clarity, structure, and problem-solving skills. Review the
            detailed feedback below to identify your core strengths and
            actionable areas for improvement.
          </p>
        </div>
      </Card>

      {/* Detailed Breakdown */}
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <h2 className="text-xl font-bold text-zinc-800 tracking-wide px-2 uppercase text-center sm:text-left">
          Detailed Breakdown
        </h2>

        {results.length > 0 &&
          results.map((item, index) => (
            <ResultCard
              item={item}
              index={index}
              getScoreColor={getScoreColor}
            />
          ))}
      </div>

      {/* Footer Action */}
      <div className="w-full max-w-5xl mt-12 mb-8 flex justify-center">
        <Button onClick={() => navigate("/")} className="w-auto px-10">
          Start New Interview
        </Button>
      </div>
    </PageWrapper>
  );
};

export default Result;
