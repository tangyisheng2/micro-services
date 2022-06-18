import { useState } from 'react';

function signUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = (e) => {
        e.preventDefault();

        console.log({ email, password });
    };

    return (
        <form onSubmit={submitData}>
            <h1>Sign Up Form</h1>
            <div>
                <div className="form-group">
                    <label>
                        Email Address
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                        />
                    </label>
                </div>
                <button className="btn btn-primary">signUp</button>
            </div>
        </form>
    );
}
export default signUp;
