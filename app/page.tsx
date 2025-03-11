import JupiterUI from "@/components/jupiter-ui";
import SparkleEffect from "@/components/sparkle-effect";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative pt-0">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-fit z-0"
      >
        <source src="/aa.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Sparkle Effect */}
      <SparkleEffect count={10} minSize={50} maxSize={15} />

      {/* UI Content */}
      <div className="relative z-10">
        <JupiterUI />
      </div>
    </main>
  );
}
