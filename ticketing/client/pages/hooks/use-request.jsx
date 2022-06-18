import { useState } from 'react';
import axios from 'axios';

/**
 *
 * @param {string} url query url
 * @param {string} method query method: must be {get | post | patch}
 * @param {*} body query body
 * @returns
 */
function useRequest({ url, method, body }) {
    const [errors, setErrors] = useState(null);

    const doRequest = () => {
        setErrors(null);
        axios[method](url, body)
            .then((res) => {
                const response = res;
            })
            .catch((err) => {
                console.log(err);
                setErrors(
                    <div className="alert alert-danger">
                        <ul>
                            {err.response.data.map((err) => {
                                return <li key={err.message}>{err.message}</li>;
                            })}
                        </ul>
                    </div>
                );
            });
    };

    return { doRequest, errors };
}
export default useRequest;
