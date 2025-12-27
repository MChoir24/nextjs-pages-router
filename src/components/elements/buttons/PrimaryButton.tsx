export default function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 rounded-md py-1 px-2 text-white cursor-pointer hover:bg-blue-400 focus:bg-blue-800"
    >
      {children}
    </button>
  );
}
