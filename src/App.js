import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header'
import PostForm from './components/PostForm'
import PostCard from './components/PostCard'

function App() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('user')

  const [editingPost, setEditingPost] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'user'
      setUserRole(role)
      fetchPosts(role)
    }
  }, [user])

  async function fetchUser() {
    const { data } = await supabase.auth.getUser()
    if (data?.user) setUser(data.user)
  }

  async function fetchPosts(role) {
    const query = supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (role !== 'admin') query.eq('user_id', user.id)
    const { data, error } = await query
    if (!error) setPosts(data)
  }

  async function handleSignup(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (!error) alert('Signup successful — check your email inbox!')
  }

  async function handleLogin(e) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (data?.user) {
      setUser(data.user)
      setEmail('')
      setPassword('')
    }
    if (error) alert('Login failed: ' + error.message)
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (!error) setUser(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ])

    if (!error) {
      setTitle('')
      setContent('')
      fetchPosts(userRole)
    } else {
      alert("Post creation failed.")
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('posts')
      .update({
        title: editTitle,
        content: editContent,
      })
      .eq('id', editingPost.id)

    if (!error) {
      setEditingPost(null)
      setEditTitle('')
      setEditContent('')
      fetchPosts(userRole)
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) fetchPosts(userRole)
  }

  function handleEdit(post) {
    setEditingPost(post)
    setEditTitle(post.title)
    setEditContent(post.content)
  }

  function cancelEdit() {
    setEditingPost(null)
    setEditTitle('')
    setEditContent('')
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">📝 Supabase Blog</h1>

      {!user ? (
        <>
          <h3>Login / Signup</h3>
          <form onSubmit={handleLogin} className="mb-4">
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleSignup}>Signup</button>
          </form>
        </>
      ) : (
        <>
          <Header user={user} userRole={userRole} onLogout={handleLogout} />

          <PostForm
            isEditing={!!editingPost}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editContent={editContent}
            setEditContent={setEditContent}
            handleUpdate={handleUpdate}
            cancelEdit={cancelEdit}
          />
        </>
      )}

      <h3>📚 {userRole === 'admin' ? 'All Posts' : 'Your Posts'}</h3>
      <div className="row">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            userRole={userRole}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default App


