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

Index.getInitialProps = () => {
    if (typeof window === 'undefined') {
        console.log('On server!');
        // Request should be made to 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    } else {
        console.log('On browser');
        // Request can be make to empty base url
    }

    return axios
        .get(
            // Request Option #1
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser'
        )
        .then((res) => {
            const response = res.data;
            console.log(response);
            return response;
        })
        .catch((err) => {
            console.log(err);
            return { currentUser: null };
        });
};

export default Index;
