import AuthCheck from "../../components/AuthCheck";
import MetaTags from "../../components/Metatags";
export default function AdminPostsPage({}) {
  return (
    <main>
      <MetaTags title="Admin Page" />
      <AuthCheck>
        <h1>Edit Post</h1>
      </AuthCheck>
    </main>
  );
}
