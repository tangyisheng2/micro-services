import Link from 'next/link';
function Header({ currentUser }) {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        .filter((linkConfig) => linkConfig)
        // When the current user is set, the 1st and 2nd elem will be false, then filtered
        .map(({ label, href }) => {
            return (
                <li key={href} className="nav-item">
                    <Link href={href}>
                        <a className="nav-link">{label}</a>
                    </Link>
                </li>
            );
        });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a href="/" className="navbar-brand">
                    GitTix
                </a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">{links}</ul>
            </div>
        </nav>
    );
}
export default Header;
