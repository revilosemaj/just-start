import StarfieldBackground from "@/components/StarfieldBackground";
import Main from "./components/Main";

export default function Home() {
  return (
    <>
      <Main />
      <StarfieldBackground
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
    </>
  );
}
