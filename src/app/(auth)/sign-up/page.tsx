import SignUpForm from "@/components/auth/SignUpForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <SignUpForm />
      <Footer />
    </main>
  );
}
