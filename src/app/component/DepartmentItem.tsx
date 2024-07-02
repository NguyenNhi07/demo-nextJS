import { useState } from "react";
import customAxios from "../config/axios";
import { DepartmentType } from "../config/type";

function DepartmentItem({
  departmentItem,
  name,
  setShowDelete,
  setPrepareDelete,
  mutate,
  isValidating,
}: {
  departmentItem: DepartmentType;
  name: string;
  setShowDelete: (param: boolean) => void;
  setPrepareDelete: (param: number) => void;
  mutate: any;
  isValidating: boolean;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(name);

  const handleSave: (id: number) => void = async (id) => {
    try {
      await customAxios.patch(`/department/${id}`, {
        name: editName,
      });
      await mutate();
      setEdit(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="select-1"
      className="w-[888px] justify-center flex flex-wrap ml-10"
    >
      <div className="border-b-[1px] border-solid border-[#EEEEEE] w-[888px] flex justify-center">
        {edit ? (
          <>
            <div className="flex justify-between mt-[25px] mb-[25px] w-full">
              <div className="w-[209px] h-[27.96px]">
                {isValidating ? (
                  <p>Loading...</p>
                ) : (
                  <input
                    onChange={(e) => setEditName(e.target.value)}
                    type="text"
                    className="w-full h-[26px] text-sm font-medium text-[#232D32] focus:outline-none border-[1px] border-solid border-[rgba(0,0,0,0.3)] rounded ps-2"
                    value={editName}
                    disabled={isValidating}
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleSave(departmentItem.id);
                  }}
                  className="w-[68px] h-[29px] rounded text-sm border-[1px] border-solid border-[#00B087] bg-[#16c0986e] text-[#008767]"
                  disabled={isValidating}
                >
                  <p className="button-text">
                    {isValidating ? "Waiting" : "Save"}
                  </p>
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="w-[68px] h-[29px] rounded text-sm border-[1px] border-solid border-[#DF0404] bg-[#FFC5C5] text-[#DF0404]"
                  disabled={isValidating}
                >
                  <p className="button-text">Cancel</p>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between mt-[25px] mb-[25px] w-full">
              <div className="w-[209px] h-[27.96px]">
                <p className="text-sm font-medium text-[#292D32]">
                  {departmentItem.name}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEdit(true);
                  }}
                  className="w-[68px] h-[29px] rounded text-sm border-[1px] border-solid border-[#00B087] bg-[#16c0986e] text-[#008767]"
                >
                  <p className="button-text">Edit</p>
                </button>
                <button
                  onClick={() => {
                    setShowDelete(true);
                    setPrepareDelete(departmentItem.id);
                  }}
                  className="w-[68px] h-[29px] rounded text-sm border-[1px] border-solid border-[#DF0404] bg-[#FFC5C5] text-[#DF0404]"
                >
                  <p className="button-text">Delete</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DepartmentItem;
