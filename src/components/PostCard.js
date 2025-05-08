import React from 'react'

const PostCard = ({ post, user, userRole, onEdit, onDelete }) => {
  const canEditOrDelete = user && (userRole === 'admin' || user.id === post.user_id)

  return (
    <div className="col-md-6 mb-4">
      <div className="card p-3 shadow-sm">
        <h5>{post.title}</h5>
        <p>{post.content}</p>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          🕒 {new Date(post.created_at).toLocaleString()}
        </p>
        {userRole === 'admin' && (
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            👤 User ID: {post.user_id}
          </p>
        )}
        {canEditOrDelete && (
          <div>
            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => onEdit(post)}
            >
              ✏️ Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(post.id)}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard

