import { useState } from "react";

function App() {
  const [tel, setTel] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState("");

  const handleSendCode = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/2fa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userNumber: tel }),
    })
      .then((res) => res.json())
      .then(setCodeSent(true))
      .catch((err) => console.error(err));
  };
  const handleVerifyCode = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/2fa/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userNumber: tel, userCode: code }),
    })
      .then((res) => res.json())
      .then((res) => setCodeStatus(res.status))
      .catch((err) => console.error(err));
  };

  return (
    <section className="flex flex-col items-center py-4 bg-slate-100 h-screen">
      {!codeSent ? (
        <form className="w-96">
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Phone Number
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="p-2 rounded-lg mb-4"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </label>
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg"
            onClick={handleSendCode}
          >
            Submit
          </button>
        </form>
      ) : (
        <form className="w-96">
          <label className="flex flex-col text-sm font-medium text-slate-700">
            Verification Code
            <input
              type="tel"
              placeholder="Enter the code sent to your mobile number"
              className="p-2 rounded-lg mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg"
            onClick={handleVerifyCode}
          >
            Verify
          </button>
          {codeStatus === "approved" && (
            <p className="text-green-600 text-center m-2">
              Code verified successfully
            </p>
          )}
        </form>
      )}
    </section>
  );
}

export default App;
