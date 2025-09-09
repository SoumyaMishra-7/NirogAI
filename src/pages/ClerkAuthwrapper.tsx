import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  type: "signin" | "signup";
}

const ClerkAuthWrapper = ({ type }: Props) => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const role = localStorage.getItem("selectedRole") || "user";

  useEffect(() => {
    if (isSignedIn) {
      navigate(`/${role}/dashboard`);
    }
  }, [isSignedIn, role, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        {type === "signin" ? (
          <SignIn routing="path" path={`/${role}/signin`} />
        ) : (
          <SignUp routing="path" path={`/${role}/signup`} />
        )}
      </div>
    </div>
  );
};

export default ClerkAuthWrapper;
