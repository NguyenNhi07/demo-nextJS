function Delete({
  setShowDelete,
  handleDelete,
  prepareDelete,
  isValidating,
}: {
  setShowDelete: (param: boolean) => void;
  handleDelete: (param: number) => void;
  prepareDelete: number;
  isValidating: boolean;
}) {
  return (
    <>
      <div className="w-[500px] h-[200px] flex fixed bottom-[-10px] left-[650px] top-[300px] z-50 bg-[rgb(255,255,255)] shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
        <div className="flex w-full h-full justify-center items-center">
          <div className="w-full h-full flex flex-wrap justify-center items-center">
            <div className="flex flex-col gap-1">
              <div className="text-lg mt-[50px]">
                Bạn chắc chắn muốn xoá nội dung này
              </div>
            </div>
            <div className="w-full flex justify-between ms-[30px] relative">
              <button
                onClick={() => setShowDelete(false)}
                className="bg-[rgb(243,151,151)] w-[75px] h-[30px] rounded-[3px] border-none"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(prepareDelete)}
                className="bg-[#80eea1] w-[75px] h-[30px] rounded-[3px] border-none mr-7"
                disabled={isValidating}
              >
                {isValidating ? "Waiting..." : "Ok"}
              </button>
            </div>
          </div>
        </div>

        <div className="offWindow">
          <button
            onClick={() => setShowDelete(false)}
            className="absolute w-[30px] h-[30px] right-0 top-0 bg-[rgb(179,109,109)] border-none"
          >
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default Delete;
