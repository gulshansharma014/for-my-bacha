import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: "100vh",
          padding: "40px 20px",
          background: "#fff6f8",
          color: "#5d2638",
          fontFamily: "Arial, sans-serif"
        }}>
          <h1>Something went wrong while loading the page.</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Missing <div id="root"></div> in index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
