function signUp() {
    return (
        <form>
            <h1>Sign Up Form</h1>
            <div>
                <div className="form-group">
                    <label>
                        Email Address
                        <input type="text" className="form-control" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password
                        <input type="password" className="form-control" />
                    </label>
                </div>
                <button className="btn btn-primary">signUp</button>
            </div>
        </form>
    );
}
export default signUp;
