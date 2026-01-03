type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function PrimaryButton({
  type = "button",
  children,
  onClick,
}: {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 rounded-md py-1 px-2 text-white cursor-pointer hover:bg-blue-400 focus:bg-blue-800"
    >
      {children}
    </button>
  );
}
