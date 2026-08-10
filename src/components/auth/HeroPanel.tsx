import heroBackground from "../../assets/Container.png";

export default function HeroPanel() {
  return (
    <div
      className="relative hidden h-full w-full flex-col justify-between overflow-hidden p-10 lg:p-14 md:flex"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(6,46,30,0.1), rgba(6,46,30,0.5)), url(${heroBackground})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      
    </div>
  );
}
