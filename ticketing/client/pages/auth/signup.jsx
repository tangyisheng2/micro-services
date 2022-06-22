import Router from 'next/router';
import { useState } from 'react';
import useRequest from '../../hooks/use-request';

function signUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState({});
    // const [errors, setErrors] = useState([]);
    console.log({ email, password });
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: () => {
            Router.push('/');
        },
    });

    const submitData = async (e) => {
        e.preventDefault();

        doRequest();

        // axios
        //     .post('/api/users/signup', {
        //         email,
        //         password,
        //     })
        //     .then((result) => {
        //         console.log(result);
        //         setSuccessMsg(result.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setErrors(err.response.data);
        //     });
    };

    return (
        <form onSubmit={submitData}>
            <h1>Sign Up Form</h1>
            {errors}
            {successMsg && (
                <div className="successMsg success">
                    <ul>
                        {successMsg &&
                            Object.keys(successMsg).map((entry) => {
                                return (
                                    <li
                                        key={entry}
                                    >{`${entry}: ${successMsg[entry]}`}</li>
                                );
                            })}
                    </ul>
                </div>
            )}
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
