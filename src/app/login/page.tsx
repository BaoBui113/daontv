import bg_overlay from "@/assets/images/bg_overlay.jpg";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
export default function Login() {
  return (
    <>
      <div className="relative w-full h-screen">
        <Image src={bg_overlay} alt="bg overlay" fill />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
        <div className="absolute z-30 w-full max-w-[450px] mx-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
