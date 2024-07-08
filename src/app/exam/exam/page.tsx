import ExamRoom from './ExamRoom';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-2">
      <h1>Exam</h1>
      <ExamRoom />
    </div>
  );
}
