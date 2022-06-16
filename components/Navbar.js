import Link from "next/Link";

//top navbar

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>
        {/* user is signed-in and has a username */}

        {username && (
          <>
            <li>
              <Link href="/admin"></Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt="profile img"></img>
              </Link>
            </li>
          </>
        )}
        {/* user is not signed-in OR  has not created a username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log In</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
