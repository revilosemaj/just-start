import Image from "next/image";

export default function About() {
  return (
    <section
      className="sticky top-0 h-screen xl:flex items-center justify-center bg-black bg-gradient-to-b from-transparent to-white/30 backdrop-blur-sm [border-image-slice:15_15_15_15_fill]
          [border-image-width:10px]
          [border-image-outset:0]
          [border-image-repeat:round]
          [border-image-source:url('https://mdn.github.io/css-examples/tools/border-image-generator/border-image-3.png')]
          border-solid text-black text-xl"
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex-col items-start w-[38rem] text-justify">
          <h1 className="text-8xl mb-10 font-extrabold text-left drop-shadow-gray">
            Let&apos;s talk about me
          </h1>
          <p className="mb-5">
            <span className="font-extrabold">Hi, I&apos;m Oliver,</span> but you
            can call me Oli—
            <span className="font-extrabold">
              a Web Developer from the Philippines.
            </span>{" "}
            With over seven years of experience in the IT industry, I&apos;ve
            taken on various roles, including Web Developer, Software
            Engineering Analyst, and Frontend Developer (ReactJS).
          </p>
          <p className="mb-5">
            My responsibilities typically involve reviewing requirements,
            planning, development, testing, implementation, and collaborating
            with the team. I also troubleshoot errors, fix bugs, and enhance
            applications with new features. Thanks to my diverse experience
            across different areas of software development,{" "}
            <span className="font-extrabold">
              I’m confident I can contribute significantly to a company focused
              on growth and innovation.
            </span>
          </p>
          <p className="mb-5">
            When it comes to work attitude,{" "}
            <span className="font-extrabold">I’m a positive thinker</span> who
            focuses on solutions rather than blame. I’m{" "}
            <span className="font-extrabold">seeking a role</span> that aligns
            with my expertise and future career goals, as well as opportunities{" "}
            for continuous learning{" "}
            <span className="font-extrabold">
              that push me to grow and become the best version of myself.
            </span>
          </p>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center shadow-slate-900 shadow-lg">
          <Image
            src="https://picsum.photos/400"
            width={400}
            height={400}
            alt="sample image"
          />
        </div>
      </div>
    </section>
  );
}
