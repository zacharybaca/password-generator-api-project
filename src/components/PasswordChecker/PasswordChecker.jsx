import "./password-checker.css";
import { passwordScorer } from 'password-scorer';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function PasswordChecker() {
    const [result, setResult] = React.useState({
        score: '',
        feedback: [],
        description: ''
    });

    const [password, setPassword] = React.useState('')

    const navigate = useNavigate();

    function handleChange(e) {
        const {value} = e.target;
        setPassword(value);
    }

    const checkIfExposed = async () => {
       const result = await passwordScorer(password, 'en');
       setResult({
        score: result.score,
        feedback: result.feedback,
        description: result.description
       })

       setPassword('');
    }

    return (
        <div id="password-checker-main">
             <div id="password-checker-container">
                <h1>Is Your Password Secure Enough?</h1>
                <input type="password" id="check-password" name="password" onChange={handleChange} value={password} placeholder="Enter Password To Check" />
                <button type="button" onClick={checkIfExposed} disabled={!password}>Check Password</button>
                {result.score && result.score < 60 && <button type="button" onClick={() => navigate("/change-password")}>Change Password</button>}
            </div>
            <div id="result-container">
            {result.score !== "" ? <h1>Results</h1> : ""}
            {result.score && <h3><span id="score-span">Score:</span> {result.score}</h3>}
            {result.feedback.length > 0 && <ul>{result.feedback.map((statement, index) => <li key={index}><span id="feedback-span">Suggestion {index + 1}:</span> {statement}</li>)}</ul>}
            {result.description && <h3><span id="description-span">Description:</span> {result.description}</h3>}
            </div>
        </div>
       
    )
}
