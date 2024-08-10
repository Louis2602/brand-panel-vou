const Empty = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default Empty;
