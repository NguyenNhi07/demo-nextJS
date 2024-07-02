import { useRouter } from "next/navigation";
import customAxios from "../config/axios";

function LogOut() {
  const router = useRouter();
  const logoutHandle: () => void = async () => {
    try {
      await customAxios.post("/auth/logout");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="mr-10">
        <button
          onClick={() => logoutHandle()}
          className="h-[34px] w-[101px] rounded-lg border-none bg-[#5932ea] text-white text-sm font-medium"
        >
          <div className="logout-content">
            <p className="logout-text">Log Out</p>
          </div>
        </button>
      </div>
    </>
  );
}

export default LogOut;
