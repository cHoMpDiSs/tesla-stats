import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthCallback = () => {
  const [code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the authorization code and state from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    const stateParam = urlParams.get("state");

    setCode(codeParam);
    setState(stateParam);

    if (codeParam) {
      // Redirect to /getMe with the code and state as query parameters
      router.push({
        pathname: "/vehicleData",
        query: { code: codeParam, state: stateParam },
      });
    }
  }, [router]);

  return (
    <div>
      <h1>Processing your Tesla account...</h1>
      <p>{code ? "Redirecting to /getMe..." : "Waiting for authorization code..."}</p>
    </div>
  );
};

export default AuthCallback;
