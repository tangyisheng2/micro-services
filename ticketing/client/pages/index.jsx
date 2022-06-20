import BuildClient from '../api/build-client';

/**
 * This is the component of the index
 * @param {Object} param0 currentUser: The info of current loged in user
 * @returns React Object
 */
function Index({ currentUser }) {
    return (
        <>
            <h1>Home Page</h1>
            <p>Current User: {currentUser}</p>
        </>
    );
}

/**
 * This method fetch the data when the component first renders
 * @param {Object} param0 Request object that has the req field
 * @returns Fetched currentUser data
 */
Index.getInitialProps = ({ req }) => {
    const axiosClient = BuildClient({ req });
    return axiosClient
        .get('/api/users/currentuser')
        .then((res) => {
            const response = res.data;
            return { currentUser: response.currentUser.email };
        })
        .catch((err) => {
            console.log(err.message);
            return { currentUser: 'Not Authorized' };
        });
};

export default Index;
