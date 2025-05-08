import React from 'react'

const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  isEditing = false,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  handleUpdate,
  cancelEdit
}) => {
  return (
    <div className="mb-4">
      <h4>{isEditing ? 'Edit Post' : 'Create Post'}</h4>
      <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={isEditing ? editTitle : title}
          onChange={(e) =>
            isEditing ? setEditTitle(e.target.value) : setTitle(e.target.value)
          }
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content"
          value={isEditing ? editContent : content}
          onChange={(e) =>
            isEditing ? setEditContent(e.target.value) : setContent(e.target.value)
          }
          required
        />
        <button
          type="submit"
          className={`btn ${isEditing ? 'btn-warning' : 'btn-success'}`}
        >
          {isEditing ? 'Save Changes' : 'Create Post'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

export default PostForm

