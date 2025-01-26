import PostDetail from '../../components/PostDetail';

export async function getServerSideProps({ params }) {
  const { postId } = params;

  try {
    const response = await fetch(
      `https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts/${postId}?_embed`
    );
    const post = await response.json();

    return {
      props: { post },
    };
  } catch (error) {
    return { notFound: true }; // Magpapakita ng 404 page kung walang post
  }
}

export default function PostPage({ post }) {
  return <PostDetail post={post} />;
}
