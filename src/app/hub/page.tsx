import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hub from "@/components/hub/Hub";
import GradientBlob from "@/components/common/GradientBlog";

export default function HubPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Gradient Blobs */}
      <GradientBlob
        className="top-0 right-0 w-250 h-250"
        colors="from-orange-500/20 via-pink-500/10 to-purple-500/5"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-0 left-0 w-225 h-225"
        colors="from-indigo-500/15 via-violet-500/10 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10">
        <Navbar />
        <Hub />
        <Footer />
      </div>
    </main>
  );
}
