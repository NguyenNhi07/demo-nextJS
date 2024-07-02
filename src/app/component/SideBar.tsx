import setting from "../img/setting 1.png";
import keySquare from "../img/key-square.png";
import useSquare from "../img/user-square 1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();
  const handleUser: () => void = () => {
    router.push("/user");
  };
  return (
    <>
      <div>
        <div className="pt-[30px] w-[306px] shadow-[0_10px_60px_#E2ECF9] h-[1191px]">
          <div className="flex justify-start items-center gap-[10px] ml-[25px]">
            <Image src={setting} alt="" className="w-[37px] h-[36.78px]" />
            <h1 className="text-[26px] leading-[29px] font-semibold">
              Dashboard
            </h1>
          </div>

          <div className="mt-[50px] ml-[25px]">
            <div className="rounded-[8px] bg-[#5932EA] w-[250px] h-[43.73px]">
              <div className="ml-[10px] flex justify-start gap-[15px] relative top-[9px]">
                <div>
                  <Image src={keySquare} alt="" className="w-6 h-[22.87px]" />
                </div>
                <p className="font-medium text-sm text-white relative top-[2px]">
                  Departments
                </p>
              </div>
            </div>

            <button
              onClick={() => handleUser()}
              className="rounded-lg bg-white w-[250px] h-[43.73px] flex border-none"
            >
              <div className="ml-[10px] flex justify-start gap-[15px] relative top-[9px]">
                <div>
                  <Image
                    src={useSquare}
                    alt=""
                    className="w-6 h-[23.86px] relative"
                  />
                </div>
                <p className="font-medium text-sm text-[#9197B3] items-center relative top-[3px]">
                  User
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
