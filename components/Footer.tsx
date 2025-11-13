export default function Footer() {
  return (
    <footer className="w-full border-t-1 border-[#00ADB5] cosmic-bg-contact">
      <div className="w-full min-h-16 sm:h-20 flex justify-center items-center text-white px-4">
        <p className="text-sm sm:text-base text-center">
          Copyright © {new Date().getFullYear()} Oliver James Aco. All right
          reserved
        </p>
      </div>
    </footer>
  );
}
