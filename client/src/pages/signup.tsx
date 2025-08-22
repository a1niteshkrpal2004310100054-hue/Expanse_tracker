import SignupForm from "@/components/signupForm";

function Signup() {
  return (
    <div className="bg-gray-800 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className="bg-gray-700 flex w-full max-w-sm flex-col gap-6 rounded-xl p-10 shadow-2xl">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
