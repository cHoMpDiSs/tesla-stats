import { useEffect, useState } from "react";

const AuthCallback = () => {
  const [code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Retrieve the authorization code and state from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    const stateParam = urlParams.get("state");

    setCode(codeParam);
    setState(stateParam);
  }, []);

  const handleSubmit = () => {
    if (!code) return;

    setIsSubmitting(true);

    fetch("/getMe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, state }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from /getMe:", data);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting code to /getMe:", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <h1>Processing your Tesla account...</h1>
      <p>{code ? "Authorization code found!" : "No authorization code in URL."}</p>
      <button
        onClick={handleSubmit}
        disabled={!code || isSubmitting}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: code && !isSubmitting ? "pointer" : "not-allowed",
          opacity: code && !isSubmitting ? 1 : 0.6,
        }}
      >
        {isSubmitting ? "Processing..." : "Send Code to /getMe"}
      </button>
    </div>
  );
};

export default AuthCallback;
