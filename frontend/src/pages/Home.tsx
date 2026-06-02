import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pdfToText from "react-pdftotext";

import api from "../api/api";

const Home = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resumeFile, setResumefile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    if (!resumeFile || !jobDescription.trim()) return;
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const resumeText = await pdfToText(resumeFile);
      const application = await api.post("/applications", {
        jobDescription,
        resumeText,
      });
      const session = await api.post(`/sessions/${application.data.application.id}`)
      navigate(`/quiz/${session.data.session.id}`)
    } catch (_) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const disabled = !jobDescription || !resumeFile;

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white text-black p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl bg-white border border-black p-8 sm:p-10 flex flex-col gap-8 "
      >
        <div className="flex flex-col gap-2 text-center mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            AI Interview Coach
          </h1>
          <p className="text-sm text-zinc-500">
            Share your job description and resume to begin
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="jobDescription"
            className="text-sm font-medium text-zinc-500 ml-1"
          >
            Job Description
          </label>
          <textarea
            className="w-full bg-zinc-200 border border-white/10 p-4 text-zinc-800 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 min-h-[180px] resize-y shadow-inner"
            value={jobDescription}
            name="jobDescription"
            id="jobDescription"
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="resumeFile"
            className="text-sm font-medium text-zinc-500 ml-1"
          >
            Resume
          </label>
          <input
            className="block w-full text-sm text-zinc-400 file:mr-5 file:py-3.5 file:px-6 file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-zinc-200 file:transition-all file:cursor-pointer file:shadow-sm cursor-pointer bg-zinc-300 border focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300"
            type="file"
            name="resumeFile"
            id="resumeFile"
            onChange={(e) =>
              e.target.files != null && setResumefile(e.target.files[0])
            }
          />
        </div>
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>{error}</p>
          </div>
        )}
        <button
          disabled={disabled}
          type="submit"
          className="mt-2 w-full border border-black font-semibold text-base py-4 px-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-black enabled:hover:bg-zinc-200 disabled:border-zinc-400 disabled:text-zinc-400 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Start Coaching Session"}
        </button>
      </form>
    </div>
  );
};

export default Home;
