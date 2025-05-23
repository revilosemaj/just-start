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
        <section className="flex justify-center items-center w-full h-screen">
          <div className="bg-indigo-400 w-full h-full flex justify-center items-center">
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
          <div className="bg-red-400 w-full h-full flex justify-center items-center">
            <div className="bg-yellow-200 w-[38rem] h-[38rem] border-dashed border-cyan-800 border-8 flex justify-center items-center">
              <h1 className="text-blue-400 text-3xl">IMAGE</h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
