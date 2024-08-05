/* eslint-disable react/prop-types */
const PostCard = ({ post }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.body}</p>
      <div className="mt-2 text-gray-600">
        Views: {post.views} | Likes: {post.reactions.likes} | Dislikes:{" "}
        {post.reactions.dislikes}
      </div>
    </div>
  );
};

export default PostCard;
