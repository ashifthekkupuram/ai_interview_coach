import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

import PageWrapper from "../components/ui/PageWrapper";
import Card from "../components/ui/Card";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";

import api from "../api/api";

const Quiz = () => {
  const { id } = useParams();

  const [questions, setQuestions] = useState<any[]>([]);
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onAnswer = async () => {
    setLoading(true);
    try {
      await api.post(`/answers/${questions[index].id}`, { answerText: answer });
      setAnswer("");
      setIndex((prev) => prev + 1);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message === "Already answered") {
          toast.warning("Already Answered");
          setAnswer("");
          setIndex((prev) => prev + 1);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const session = await api.get(`/sessions/${id}`);
        if (
          session.data.session.questions &&
          session.data.session.questions.length > 0
        ) {
          setQuestions(session.data.session.questions);
        } else {
          navigate("/");
        }
      } catch (err) {
        toast.error("Failed to fetch session.")
        navigate("/")
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [id]);

  useEffect(() => {
    if (questions.length > 0 && index >= questions.length) {
      navigate(`/result/${id}`);
    }
  }, [index, questions, id]);

  return (
    <PageWrapper className="relative">
      <Card className="w-full max-w-3xl gap-8">
        {/* Header / Question Area */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6D5ACF]">
              {loading ? (
                <div className="h-4 w-24 bg-black/5 rounded animate-pulse" />
              ) : (
                `Question ${index + 1} of ${questions.length}`
              )}
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3 mt-2">
              <div className="h-8 w-full bg-black/5 rounded-xl animate-pulse" />
              <div className="h-8 w-4/5 bg-black/5 rounded-xl animate-pulse" />
            </div>
          ) : (
            <h2 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-zinc-800">
              {questions.length > 0 &&
                index < questions.length &&
                questions[index].questionText}
            </h2>
          )}
        </div>

        {/* Textarea Input */}
        <div className="mt-4">
          <TextArea
            label="Your Response"
            id="answer"
            disabled={loading}
            loading={loading}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-62.5"
          />
        </div>

        {/* Action Button */}
        <Button
          onClick={onAnswer}
          disabled={loading || (!answer && !loading)}
          loading={loading}
          loadingText="Processing Answer..."
          className="mt-2"
        >
          Submit Answer
        </Button>
      </Card>
    </PageWrapper>
  );
};

export default Quiz;
