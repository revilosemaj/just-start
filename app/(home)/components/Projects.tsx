import Image from "next/image";

export default function Projects() {
  return (
    <section className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white text-black">
      <div className="w-full h-full flex justify-center items-center p-20">
        <div className="flex-col items-start w-full">
          <h1 className="text-6xl text-[#00ADB5] font-extrabold mb-10">
            My recent work
          </h1>
          <div className="flex mb-10">
            <button className="px-4 py-2 border-black border-2 rounded-full hover:text-black hover:bg-white text-white bg-black">
              All
            </button>
          </div>
          <div className="flex item-center">
            <div className=" border-dashed border-red-200 border-4 mr-10 flex items-center justify-center">
              <Image
                src="https://picsum.photos/300/300"
                width={300}
                height={300}
                alt="image 1"
              />
            </div>
            <div className=" border-dashed border-red-200 border-4 mr-10 flex items-center justify-center">
              <Image
                src="https://picsum.photos/300/300"
                width={300}
                height={250}
                alt="image 2"
              />
            </div>
            <div className=" border-dashed border-red-200 border-4 mr-10 flex items-center justify-center">
              <Image
                src="https://picsum.photos/300/300"
                width={300}
                height={300}
                alt="image 3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
