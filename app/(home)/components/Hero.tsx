import Image from "next/image";

export default function Hero() {
  return (
    <section className="sticky top-0 h-screen flex items-center justify-center bg-black flex-col-reverse xl:flex-row">
      <div className="w-full h-full hidden xl:flex justify-center items-center ">
        <div className="flex-col items-center w-[41rem] justify-center bg-black text-center">
          <h1 className="text-7xl font-extrabold text-[#eceabb] xl:mt-4 drop-shadow-yellow">
            Oliver James Aco
          </h1>
          <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 dark:bg-white" />
          <p className="text-4xl mb-5 font-extrabold text-[#00ADB5] drop-shadow">
            Frontend Developer
          </p>

          <button className="bg-white px-8 py-3 rounded-full flex m-auto mb-4 text-black hover:bg-[#00ADB5] hover:text-white hover:drop-shadow-gray">
            Download CV
          </button>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className="relative w-[38rem] h-[38rem] flex justify-center items-center bg-[url(/doodles_bg.png)] bg-no-repeat bg-cover bg-black rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden drop-shadow-custom">
          <Image
            src="/hero_img.png"
            width={550}
            height={550}
            alt="hero image"
            className="rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] absolute bottom-[-1.4rem]"
          />
        </div>
        <div className="flex-col items-center justify-center bg-black text-center mt-10 xl:hidden">
          <h1 className="text-7xl font-extrabold text-[#eceabb] xl:mt-4 drop-shadow-yellow">
            Oliver James Aco
          </h1>
          <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 dark:bg-white" />
          <p className="text-4xl mb-5 font-extrabold text-[#00ADB5] drop-shadow">
            Frontend Developer
          </p>

          <button className="bg-white px-8 py-3 rounded-full flex m-auto mb-4 text-black hover:bg-[#00ADB5] hover:text-white hover:drop-shadow-gray">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
}
