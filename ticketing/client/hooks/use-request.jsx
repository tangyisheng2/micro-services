import { useState } from 'react';
import axios from 'axios';

/**
 *
 * @param {string} url query url
 * @param {string} method query method: must be {get | post | patch}
 * @param {*} body query body
 * @returns
 */
function useRequest({ url, method, body, onSuccess }) {
    const [errors, setErrors] = useState(null);
    console.log(url, method, body);
    const doRequest = () => {
        setErrors(null);
        axios[method](url, body)
            .then((res) => {
                const response = res;
                // If no errer and onSuccess is defined, run onSuccess()
                if (onSuccess) {
                    onSuccess(response.data);
                }
            })
            .catch((err) => {
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
