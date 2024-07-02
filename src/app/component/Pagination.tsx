import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PageNation({ totalPage }: { totalPage: number }) {
  const [pages, setPages] = useState<number>(1);
  const router = useRouter();

  const handleClick = (toPage: number) => {
    localStorage.setItem("currentPage", String(toPage));
    router.push(`/department?page=${toPage}`);
    setPages(toPage);
  };

  useEffect(() => {
    const currentPage = Number(localStorage.getItem("currentPage"));
    if (currentPage) {
      setPages(currentPage);
    }
  }, []);

  const pagesList: number[] = Array(totalPage)
    .fill(null)
    .map((_, i) => i + 1);

  return (
    <>
      <div className="flex justify-end mr-[58px] mt-[50px] gap-[10px]">
        {pagesList.map((toPage) => (
          <div className="flex gap-[13px]" key={toPage}>
            <button
              className={`w-[26px] h-[24px] rounded border-[1px] border-solid border-[#eeeeee] py-[6px] px-[9px] gap-[10px] flex items-center ${
                pages === toPage
                  ? "bg-[rgba(1,86,252,1)] text-white"
                  : "bg-[#efefef] text-[#333333]"
              }`}
              onClick={() => {
                handleClick(toPage);
              }}
            >
              {toPage}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default PageNation;
