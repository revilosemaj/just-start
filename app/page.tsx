import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="fixed top-0 w-full">
        <nav className="bg-gray-500 w-full h-20">
          <ul className="flex w-full h-full justify-around items-center">
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Project</Link>
            </li>
            <li>
              <Link href="#">Just Start</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link href="#">WIP</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Hero section */}
        <section className="flex justify-center items-center w-full h-[1024px]">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex-col items-center bg-red-500 w-[38rem]">
              <h1 className="text-6xl mb-5">Oliver James Aco</h1>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium error, hic totam suscipit possimus <br />
                impedit provident unde laboriosam <br />
              </p>
              <button className="bg-green-500 px-12 py-6 rounded-full">
                Download
              </button>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="bg-yellow-200 w-[38rem] h-[38rem] border-dashed border-cyan-800 border-8 flex justify-center items-center">
              <h1 className="text-blue-400 text-3xl">IMAGE</h1>
            </div>
          </div>
        </section>
        {/* About section */}
        <section className="flex justify-center items-center w-full h-[1024px] border-t-8 border-dashed border-cyan-500">
          <div className="basis-2/6 h-full flex justify-center items-center">
            <div className="flex-col items-start bg-red-500 w-[38rem]">
              <h1 className="text-6xl mb-5">About me</h1>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium error, hic totam suscipit possimus <br />
                impedit provident unde laboriosam <br />
              </p>
            </div>
          </div>
          <div className="basis-4/6 h-full flex justify-center items-center">
            <div className="bg-yellow-200 w-[38rem] h-[38rem] border-dashed border-cyan-800 border-8 flex justify-center items-center">
              <h1 className="text-blue-400 text-3xl">IMAGE</h1>
            </div>
          </div>
        </section>
        {/* My work section */}
        <section className="flex-col justify-center items-center w-full h-[1024px] border-t-8 border-dashed border-cyan-500">
          <div className="w-full h-full flex justify-center items-center p-20">
            <div className="flex-col items-start w-full">
              <h1 className="text-6xl mb-10">My recent work</h1>
              <div className="flex mb-10">
                <button>All</button>
              </div>
              <div className="flex item-center">
                <div className="basis-2/6 h-[20rem] border-dashed border-red-200 border-4 mr-10 flex items-center justify-center">
                  Image 1
                </div>
                <div className="basis-2/6 h-[20rem] border-dashed border-red-200 border-4 mr-10 flex items-center justify-center">
                  Image 2
                </div>
                <div className="basis-2/6 h-[20rem] border-dashed border-red-200 border-4 mr-10 flex items-center justify-center">
                  Image 3
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
