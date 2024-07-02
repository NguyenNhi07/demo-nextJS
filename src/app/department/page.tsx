"use client";
import { useFormik } from "formik";
import { useState } from "react";
import customAxios from "../config/axios";
import * as Yup from "yup";
import SideBar from "../component/SideBar";
import DepartmentItem from "../component/DepartmentItem";
import Delete from "../component/Delete";
import PageNation from "../component/Pagination";
import SearchItem from "../component/SearchItem";
import LogOut from "../component/Logout";
import useDepartments from "../hooks/useDepartment";
import { DepartmentType } from "../config/type";

function Department() {
  const [addItem, setAddItem] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [prepareDelete, setPrepareDelete] = useState<number>(0);

  const { departments, isLoading, mutate, isValidating } = useDepartments({});

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field can not be empty"),
    }),
    onSubmit: async (values) => {
      try {
        await customAxios.post("/department", {
          name: values.name,
        });
        await mutate();
        setAddItem(false);
        formik.resetForm();
      } catch (error: any) {
        console.error("Error adding department:", error.message);
      }
    },
  });
  const handleClickClose: (e: any) => void = (e) => {
    const target = e.target as HTMLElement;
    if (target.className.includes("bg-black/50")) setAddItem(false);
  };

  const handleDelete: (id: number) => void = async (id) => {
    try {
      await customAxios.delete(`/department/${id}`);
      await mutate();
      setShowDelete(false);
    } catch (error: any) {
      console.error("Error deleting department:", error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <SideBar />

        <div>
          <div className="w-[986px] h-[1081px] mt-[50px] ml-[70px] shadow-[0_10px_60px_#E2ECF9]">
            {/* Header */}
            <div className="pt-10">
              <div>
                <div>
                  <div className="flex justify-between items-center">
                    <div className="w-[216px] h-[44px] ml-10">
                      <h1 className="text-[22px] font-semibold">
                        All Departments
                      </h1>
                    </div>
                    <LogOut />
                  </div>

                  {/* Add Item Button */}
                  <button
                    onClick={() => {
                      setAddItem(true);
                    }}
                    className="h-[34px] w-[113px] relative top-[-10px] left-[30px] border-none bg-[#5932ea] text-white text-sm font-normal rounded-lg"
                  >
                    Add New Item
                  </button>

                  {/* search */}
                  <SearchItem />

                  <div className="border-b-[1px] border-solid border-[#EEEEEE]">
                    <div className="flex justify-between ms-10 mb-[15px]">
                      <div>
                        <p className="h-[27.96px] text-sm font-medium text-[#B5B7C0]">
                          Name
                        </p>
                      </div>
                      <div className="pr-[70px]">
                        <p className="h-[27.96px] text-sm font-medium text-[#B5B7C0]">
                          Action
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Department List */}
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-3/6">
                <div className="text-[30px] font-semibold">Loading...</div>
              </div>
            ) : (
              <>
                {departments?.items.map((departmentItem) => (
                  <DepartmentItem
                    key={departmentItem.id}
                    name={departmentItem.name}
                    departmentItem={departmentItem}
                    setShowDelete={setShowDelete}
                    setPrepareDelete={setPrepareDelete}
                    mutate={mutate}
                    isValidating={isValidating}
                  />
                ))}

                <PageNation totalPage={departments?.meta.totalPages || 1} />
              </>
            )}
          </div>

          {addItem && (
            <form
              onSubmit={formik.handleSubmit}
              className="fixed z-50 top-0 right-0 bg-black/50 w-screen h-screen flex justify-center items-center"
              onClick={(e) => handleClickClose(e)}
            >
              <div className=" bg-white h-[90px] w-[450px] shadow-[0_0_10px_rgba(163,163,163,0.3)] flex px-[20px] justify-between items-center top-[151px] left-[520px] gap-5 rounded-[15px]">
                <input
                  type="text"
                  placeholder="Department Name"
                  className={`focus:outline-none w-[350px] h-[30px] pl-[10px] text-base border-[1px] border-[rgba(0,0,0,0.3)] rounded`}
                  {...formik.getFieldProps("name")}
                />
                <button
                  className="h-[30px] w-[120px] border-[1px] rounded border-solid border-[rgba(0,0,0,0.3)]"
                  disabled={isValidating}
                >
                  {isValidating ? "Waiting..." : "Add"}
                </button>
              </div>
            </form>
          )}
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

export default Department;
