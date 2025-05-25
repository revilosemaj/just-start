import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="relative">
        {/* Hero section */}
        <section className="sticky top-0 h-screen flex items-center justify-center bg-white">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex-col items-center w-[41rem] justify-center bg-black text-center">
              <h1 className="text-7xl font-extrabold text-white mt-4">
                Oliver James Aco
              </h1>
              <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 dark:bg-white" />
              <p className="text-4xl mb-5 font-extrabold text-[#00ADB5]">
                Web Developer | React Developer
              </p>

              <button className="bg-white px-8 py-3 rounded-full flex m-auto mb-4 text-black hover:bg-[#00ADB5] hover:text-white">
                Download CV
              </button>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="relative w-[38rem] h-[38rem] border-dashed  flex justify-center items-center bg-[url(/doodles_bg.png)] bg-no-repeat bg-cover bg-black rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden">
              <Image
                src="/hero_img.png"
                width={550}
                height={550}
                alt="hero image"
                className="rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] absolute bottom-[-1.4rem] "
              />
            </div>
          </div>
        </section>
        {/* About section */}
        <section className="sticky top-0 h-screen flex items-center justify-center bg-black text-[#00ADB5]">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex-col items-start w-[38rem]">
              <h1 className="text-6xl mb-5 text-black font-extrabold bg-white">
                Let&apos;s talk about me
              </h1>
              <p className="mb-5 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto vel corporis iusto. Minus laborum optio pariatur
                nihil explicabo! Quam quidem tempore tempora expedita ea labore
                rem asperiores magnam error nesciunt! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Eaque cumque inventore minima
                repellendus iusto corrupti totam commodi. Ipsa voluptate a animi
                doloribus assumenda nisi provident quia. Vel deleniti quo iusto.
              </p>
              <p className="mb-5 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto vel corporis iusto. Minus laborum optio pariatur
                nihil explicabo! Quam quidem tempore tempora expedita ea labore
                rem asperiores magnam error nesciunt! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Eaque cumque inventore minima
                repellendus iusto corrupti totam commodi. Ipsa voluptate a animi
                doloribus assumenda nisi provident quia. Vel deleniti quo iusto.
              </p>
              <p className="mb-5 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto vel corporis iusto. Minus laborum optio pariatur
                nihil explicabo! Quam quidem tempore tempora expedita ea labore
                rem asperiores magnam error nesciunt! Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Eaque cumque inventore minima
                repellendus iusto corrupti totam commodi. Ipsa voluptate a animi
                doloribus assumenda nisi provident quia. Vel deleniti quo iusto.
              </p>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white w-[38rem] h-[38rem] border-dashed border-black border-8 flex justify-center items-center">
              <h1 className="text-black text-3xl">IMAGE</h1>
            </div>
          </div>
        </section>
        {/* Project section */}
        <section className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white text-black">
          <div className="w-full h-full flex justify-center items-center p-20">
            <div className="flex-col items-start w-full">
              <h1 className="text-6xl mb-5 text-[#00ADB5] font-extrabold mb-10">
                My recent work
              </h1>
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
        {/* Contact section */}
        <section className="sticky top-0 h-screen flex items-center justify-center bg-black text-[#00ADB5]">
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex-col items-center w-[38rem]">
              <h1 className="text-6xl mb-5">Got project in mind?</h1>
              <div className="bg-transparent w-full h-[20rem] border-dashed border-white border-8 flex justify-center items-center">
                <h1 className="text-3xl">IMAGE</h1>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[38rem]">
              <form className="w-full h-full flex-col">
                <div className="flex justify-between w-full h-full mb-5">
                  <div className="flex-col">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full"
                    />
                  </div>
                  <div className="flex-col">
                    <label>Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex-col">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="w-full"
                  />
                </div>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full">
        <div className="w-full h-20 flex justify-center items-center bg-[#00ADB5] text-white">
          <p>All right reserved</p>
        </div>
      </footer>
    </>
  );
}
