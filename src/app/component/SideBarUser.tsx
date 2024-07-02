import setting from "../img/setting 1.png";
import keySquare from "../img/key-square-4.png";
import useSquare from "../img/user-square-5.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();
  const handleDepartment: () => void = () => {
    router.push("/department");
  };
  return (
    <>
      <div className="left-content">
        <div className="pt-[30px] w-[306px] shadow-[0_10px_60px_0_#E2ECF9] h-[1191px]">
          <div className="flex justify-start items-center gap-[10px] ml-[25px]">
            <Image src={setting} alt="" className="w-[37px] h-[36.78px]" />
            <h1 className="text-[26px] leading-[29px] font-semibold">
              Dashboard
            </h1>
          </div>

          <div className="mt-[50px] ml-[25px]">
            <button
              onClick={() => handleDepartment()}
              className="rounded-lg bg-white w-[250px] h-[43.73px] border-none"
            >
              <div className="ml-[10px] flex justify-start gap-[15px] relative">
                <div className="departments-icon-container">
                  <Image src={keySquare} alt="" className="w-6 h-[22.87px]" />
                </div>
                <p className="font-medium text-sm text-[#9197B3] relative top-[2px]">
                  Departments
                </p>
              </div>
            </button>

            <div className="rounded-lg bg-[#5932EA] w-[250px] h-[43.73px] flex border-none">
              <div className="ml-[10px] flex justify-start gap-[15px] relative top-[9px]">
                <div className="users-icon-container">
                  <Image src={useSquare} alt="" className="w-6 h-[23.86px]" />
                </div>
                <p className="font-medium text-sm text-white items-center relative bottom-2 top-[3px]">
                  User
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
