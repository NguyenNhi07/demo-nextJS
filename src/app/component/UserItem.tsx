import { useEffect, useState } from "react";
import { UsersType } from "../config/type";
import Select from "react-select";
import customAxios from "../config/axios";
import useDepartments from "../hooks/useDepartment";
import useUser from "../hooks/useUsers";

function UserItem({
  user,
  setShowDelete,
  setPrepareDelete,
}: {
  user: UsersType;
  setShowDelete: (param: boolean) => void;
  setPrepareDelete: (param: number) => void;
}) {
  const {
    departments,
    isLoading,
    isValidating: isValidatingDepartment,
  } = useDepartments({ limit: 0, getAll: true });

  const { mutate: mutateUser, isValidating: isValidatingUser } = useUser();

  const [selectDepartment, setSelectDepartment] = useState<{
    name: string;
    id: number;
  }>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState(user.username);

  useEffect(() => {
    setSelectDepartment({
      name:
        departments?.items.find(
          (departmentItem) => departmentItem.id === user.departmentId
        )?.name || "",
      id: user.departmentId,
    });
  }, [departments?.items, user.departmentId]);

  const handleSaveDepartment: (id: number) => void = async (id) => {
    try {
      await customAxios.patch(`/user/${id}/department`, {
        departmentId: selectDepartment?.id,
        username: editName,
      });
      await mutateUser();
      setIsEdit(false);
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  };

  const handleCancel: () => void = () => {
    if (user.username !== editName) {
      setEditName(user.username);
    }
  };

  return (
    <>
      <div id="select-1" className="w-[888px] flex flex-wrap ml-10">
        <div className="border-b-[1px] border-[#EEEEEE] w-full">
          <div className="flex justify-between mt-[25px] mb-[25px] w-full">
            {isEdit ? (
              <>
                <div className="w-[209px] h-[27.96px]">
                  {isValidatingUser ? (
                    <p>Waiting...</p>
                  ) : (
                    <input
                      onChange={(e) => setEditName(e.target.value)}
                      type="text"
                      className="h-[26px] focus:outline-none border-[1px] border-[rgba(0,0,0,0.3)] w-[160px] rounded ps-2"
                      value={editName}
                      disabled={isValidatingUser}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="w-[209px] h-[27.96px]">
                <p className="text-sm font-medium text-[#292D32]">
                  {user.username}
                </p>
              </div>
            )}

            {isEdit ? (
              <>
                <div className="text-sm relative right-[50px] bottom-[7px] w-[231px] left-[-40px]">
                  {isValidatingDepartment ? (
                    <p>Waiting...</p>
                  ) : (
                    <Select
                      value={selectDepartment}
                      options={departments?.items}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => String(option.id)}
                      onChange={(e) => {
                        e && setSelectDepartment(e);
                      }}
                      isDisabled={isValidatingUser}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="w-[230px] relative left-[-41px]">
                {isLoading ? (
                  <div className="loadingDepartment">Loading...</div>
                ) : (
                  <p className="text-sm">
                    {
                      departments?.items.find(
                        (departmentItem) =>
                          departmentItem.id === user.departmentId
                      )?.name
                    }
                  </p>
                )}
              </div>
            )}

            <div className="w-[209px] h-[27.96px] relative left-[4px]">
              <p className="text-sm font-medium text-[#292D32]">{user.email}</p>
            </div>

            {isEdit ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleSaveDepartment(user.id);
                  }}
                  className="w-[68px] h-[29px] bg-[#16c0986e] rounded border-[1px] border-solid border-[#00B087] text-[#008767] text-sm"
                  disabled={isValidatingUser || isValidatingDepartment}
                >
                  <p>
                    {isValidatingUser || isValidatingDepartment
                      ? "Waiting"
                      : "Save"}
                  </p>
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    handleCancel();
                  }}
                  className="w-[68px] h-[29px] text-[#DF0404] bg-[#FFC5C5] rounded border-[1px] border-solid border-[#DF0404] text-sm"
                  disabled={isValidatingUser || isValidatingDepartment}
                >
                  <p>Cancel</p>
                </button>
              </div>
            ) : (
              <div className="relative items-end flex gap-2">
                <button
                  onClick={() => setIsEdit(true)}
                  className="w-[68px] h-[29px] bg-[#16c0986e] rounded border-[1px] border-solid border-[#00B087] text-[#008767] text-sm"
                  disabled={isValidatingUser || isValidatingDepartment}
                >
                  <p>Edit</p>
                </button>

                <button
                  onClick={() => {
                    setPrepareDelete(user.id);
                    setShowDelete(true);
                  }}
                  className="w-[68px] h-[29px] text-[#DF0404] bg-[#FFC5C5] rounded border-[1px] border-solid border-[#DF0404] text-sm"
                  disabled={isValidatingUser || isValidatingDepartment}
                >
                  <p>Delete</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserItem;
