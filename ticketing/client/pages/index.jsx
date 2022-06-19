import axios from 'axios';

function Index({ currentUser }) {
    console.log(currentUser);
    return (
        <>
            <h1>Home Page</h1>
            <p>Current User: {currentUser}</p>
        </>
    );
}

Index.getInitialProps = ({ req }) => {
    // console.log(req.headers);
    let url = '/api/users/currentuser';
    if (typeof window === 'undefined') {
        console.log('On server!');
        url =
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser';
        // Request should be made to 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    } else {
        console.log('On browser');
        url = '/api/users/currentuser';
        // Request can be make to empty base url
    }

    return axios
        .get(
            // Request Option #1
            url,
            {
                headers: req.headers,
            }
        )
        .then((res) => {
            const response = res.data;
            console.log(response);
            return { currentUser: response.currentUser.email };
        })
        .catch((err) => {
            // console.log(err);
            return { currentUser: 'Not Authorized' };
        });
};

export default Index;
