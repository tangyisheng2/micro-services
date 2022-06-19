import axios from 'axios';
import BuildClient from '../api/build-client';

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
    const axiosClient = BuildClient({ req });
    return axiosClient.get('/api/users/currentuser').then((res) => {
        const response = res.data;
        console.log(response);
        return { currentUser: response.currentUser.email };
    });
};

export default Index;
