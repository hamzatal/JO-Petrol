import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
    const [text, setText] = useState("");

    return (
        <div style={{ padding: 20 }}>
            <h1>React + Laravel App 🚀</h1>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Type something"/>
            <p>{text}</p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
