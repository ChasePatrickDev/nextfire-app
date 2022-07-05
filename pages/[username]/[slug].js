import PostContent from "../../components/PostContent";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import MetaTags from "../../components/Metatags";

export async function getStaticProps({ params }) {
  const { getUserWithUsername, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // could imporove by  using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("post").get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    // { params: { username, slug}}
    //],
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  return (
    <main className={styles.container}>
      <MetaTags title={post.title} />
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <string>{post.heartCount || 0} 🤍</string>
        </p>
      </aside>
    </main>
  );
}
