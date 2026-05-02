import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ padding: 30, border: "1px solid #ccc", borderRadius: 8 }}>
                <h2>Login</h2>

                <button onClick={() => navigate("/home")}>
                    Login as User
                </button>

                <br /><br />

                <button onClick={() => alert("Admin login coming next")}>
                    Login as Admin
                </button>
            </div>
        </div>
    );
}


