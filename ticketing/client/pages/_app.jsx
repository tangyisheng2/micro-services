import 'bootstrap/dist/css/bootstrap.css';
import BuildClient from '../api/build-client';
/**
 * The custom app component
 * Note that the parameter passed in are different
 * from the page component
 * Page component：context === {req, res}
 * Custom App Component: context === {Component, ctx: {req, res}}
 * @param {Object} param0 The request component
 * @returns React Object
 */
function _app({ Component, pageProps, currentUser }) {
    return (
        <div>
            <h1>Header {currentUser.email}</h1>
            <Component {...pageProps} />
        </div>
    );
}

/**
 * This method fetch the data when the component first renders
 * Note: If you chained components, you need to manually run
 * the .getInitialProps() method in the nested component and
 * pass the result to the nested component
 * @param {Object} appContext The request Object from next.js
 * @returns Fetched data
 */
_app.getInitialProps = async (appContext) => {
    const client = BuildClient(appContext.ctx);
    // console.log(appContext.ctx);

    const data = (await client.get('/api/users/currentuser')).data;
    const pageProps = await appContext.Component.getInitialProps(
        appContext.ctx
    );
    return {
        pageProps,
        ...data,
    };
};

export default _app;
