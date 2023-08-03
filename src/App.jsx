import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sessionUrl, setSessionUrl] = useState();
  const [showIframe, setShowIframe] = useState(false);

  window.addEventListener("message", function (event) {
    if (event?.data?.status == "exit") {
      console.log("exit event to be captured here");
      setShowIframe(false);
    }
    if (event?.data?.status == "success") {
      console.log("success event to be captured here");
      setShowIframe(false);
    }
  });

  const CreateSession = async () => {
    const body = JSON.stringify({
      api_key: "", // Finbox provided API key
      link_id: "", // Random id for identification,this will be mapped against the statement
      from_date: "", // Start date range to fetch statements. Should be of format DD/MM/YYYY
      to_date: "", // End date range to fetch statements. Should be of format DD/MM/YYYY
      redirect_url: "", // Can be any URL on which you want to redirect
      // bank_name: "", // Bank name of bank you want to choose
      // mode: "", // Parameter to set the mode(i.e. pdf, aa, and online)
      // logo_url: "", // An optional parameter to show logo branding in bankconnect SDK. Should be a URL.
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      redirect: "follow",
    };

    const response = await fetch(
      "https://portaldev.finbox.in/bank-connect/v1/session/",
      requestOptions
    );
    const json = await response.json();

    console.log("response", json);
    if (response.ok) {
      setSessionUrl(json.redirect_url);
    } else {
      console.log(json.error);
    }
  };

  useEffect(() => {
    CreateSession();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Bank Connect SDK</h1>
      <div style={{ padding: "0 1rem" }}>
        <p>
          Bank-Connect-Frontend is basically a CLIENT side process. It is a
          product which takes user bank details as input and generates detailed
          excel reports as output. The objective of this product is to maintain
          a healthy relationship between the Users and the Bank.
        </p>
        <h4>There are three methods in Bank Connect SDK.</h4>
        <ol>
          <li>
            Account Aggregator(AA) : In AA users can fetch statements using
            phone OTP. Account Aggregation is powered by RBI.
          </li>
          <li>
            Netbanking : In Netbanking users can fetch statements from using
            username and passwords.
          </li>
          <li>
            Bank Statements : In this method users manually upload the pdf of
            their bank statements.
          </li>
        </ol>
        <p style={{ padding: "0.125rem" }}>
          Read documentation to know more about Bank Connect SDK. This contain
          the workflow of Bank Connect SDK.
        </p>
        <span style={{ padding: "0.875rem" }}>
          <a
            style={{ textDecoration: "none", cursor: "pointer" }}
            href="https://docs.finbox.in/bank-connect/"
          >
            Bank Connect SDK Documentation.
          </a>
        </span>
        <p style={{ padding: "0.125rem" }}>
          Click on Try It Out button to take demo of how Bank Connect SDK work.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <button
            style={{
              backgroundColor: "#0075FF",
              color: "white",
              padding: "1rem 4rem",
              border: "none",
              borderRadius: "30px",
            }}
            onClick={() => {
              setShowIframe(!showIframe);
            }}
          >
            Try It Out
          </button>
          {showIframe && (
            <div
              style={{
                height: "100",
                width: "100",
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                textAlign: "center",
                background: "rgba(0,0,0,0.9)",
              }}
            >
              <iframe
                style={{
                  justifyContent: "center",
                  marginTop: "4rem",
                  borderRadius: "10px",
                  border: "none",
                  boxSizing: "border-box",
                  zIndex: "4",
                  overflow: "hidden",
                }}
                src={sessionUrl}
                height="650"
                width="370"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
