import { CheckIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { cn } from "@sglara/cn";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type EditButtonProps = {
  id?: string;
  tableName: string;
  fieldName: string;
  className?: string;
  value?: string | number | null;
};

export default function EditableField({
  id,
  tableName,
  fieldName,
  value,
  className,
}: EditButtonProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState<
    string | number | null | undefined
  >(value ?? "");

  // // Keep internal state in sync when the `value` prop changes (e.g. session updates)
  // useEffect(() => {
  //   setFieldValue(value ?? "");
  // }, [value]);

  const { data: session } = useSession(); //simulate save to session user

  const editHandler = async () => {
    if (isEditing) {
      console.log(fieldValue);
      // change data on session user
    }
    setIsEditing(!isEditing);
  };
  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={fieldValue as string}
          className="border border-gray-300 rounded-md px-2 py-1"
          onChange={(e) => setFieldValue(e.target.value)}
          autoFocus
        />
      ) : (
        <span>{fieldValue ?? value}</span>
      )}

      <button onClick={editHandler} className={cn("cursor-pointer", className)}>
        {isEditing ? (
          <CheckIcon className="size-5 text-gray-500" />
        ) : (
          <PencilSquareIcon className="size-5 text-gray-500" />
        )}
      </button>
    </>
  );
}
