"use client";
import { useState } from "react";
import customAxios from "../config/axios";
import LogOut from "../component/Logout";
import Delete from "../component/Delete";
import useUsers from "../hooks/useUsers";
import SideBarUser from "../component/SideBarUser";
import UserItem from "../component/UserItem";
import PageNationUser from "../component/PaginationUser";
import SearchItemUser from "../component/SearchItemUser";

function User() {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [prepareDelete, setPrepareDelete] = useState<number>(0);

  const { users, loading, mutate, isValidating } = useUsers();

  const handleDelete: (id: number) => void = async (id) => {
    try {
      await customAxios.delete(`/user/${id}`);
      await mutate();
      setShowDelete(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <SideBarUser />

        <div>
          <div className="w-[986px] h-[1081px] mt-[50px] ml-[70px] shadow-[0_10px_60px_#E2ECF9]">
            {/* Header */}
            <div className="pt-10">
              <div>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="w-[216px] h-[44px] ml-10">
                      <h1 className="text-[22px] font-semibold">All Users</h1>
                    </div>
                    <LogOut />
                  </div>

                  {/* Search Item */}
                  <SearchItemUser />

                  <div className="border-b-[1px] border-b-[#EEEEEE]">
                    <div className="flex justify-between ms-10 mb-[15px]">
                      <div>
                        <p className="h-[27.96px] text-sm font-medium text-[#B5B7C0]">
                          Name
                        </p>
                      </div>
                      <div className="relative left-[-62px]">
                        <p className="h-[27.96px] text-sm font-medium text-[#B5B7C0]">
                          Department
                        </p>
                      </div>
                      <div className="relative left-[-59px]">
                        <p className="h-[27.96px] text-sm font-medium text-[#B5B7C0]">
                          Email
                        </p>
                      </div>
                      <div className="pr-[70px] relative left-[-35px]">
                        <p className="h-[27.96px] text-sm font-medium text-[#B5B7C0]">
                          Action
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center h-3/6">
                <div className="text-[30px] font-medium">Loading...</div>
              </div>
            ) : (
              <>
                {users?.items.map((userItem) => (
                  <UserItem
                    key={userItem.id}
                    user={userItem}
                    setShowDelete={setShowDelete}
                    setPrepareDelete={setPrepareDelete}
                  />
                ))}
                <PageNationUser totalPage={users?.meta.totalPages || 1} />
              </>
            )}
          </div>
        </div>
      </div>

      {showDelete && (
        <Delete
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
          prepareDelete={prepareDelete}
          isValidating={isValidating}
        />
      )}
    </>
  );
}

export default User;
