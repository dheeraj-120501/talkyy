interface RecordTextProps {
  before: string;
  highlight: string;
  after: string;
}

function RecordText({ before, highlight, after }: RecordTextProps) {
  return (
    <div className="font-semibold">
      <span className="opacity-40">{before}</span>
      {before && " "}
      <span className="opacity-100">{highlight}</span>
      {after && " "}
      <span className="opacity-40">{after}</span>
    </div>
  );
}

export default RecordText;
