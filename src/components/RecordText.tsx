interface RecordTextProps {
  before: string;
  highlight: string;
  after: string;
}

function RecordText({ before, highlight, after }: RecordTextProps) {
  return (
    <>
      <span className="opacity-50">{before}</span>
      {before && " "}
      <span className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {highlight}
      </span>
      {after && " "}
      <span className="opacity-50">{after}</span>
    </>
  );
}

export default RecordText;
