import React, { useState, useEffect } from 'react';
import { User, PlusCircle, Edit2, Trash2, Save, X } from 'lucide-react';
import './note.css'; // Import the CSS file

const API_URL = 'http://localhost:5000/api';

const NotesApp = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAuthForm, setShowAuthForm] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [noteForm, setNoteForm] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API call helper with auth header
  const apiCall = async (endpoint, options = {}) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (err) {
      if (err.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please make sure the backend is running on http://localhost:5000');
      }
      throw err;
    }
  };

  // Auth functions
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!authForm.email || !authForm.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    if (authMode === 'register' && !authForm.name) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }
    
    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const payload = authMode === 'login' 
        ? { email: authForm.email, password: authForm.password }
        : authForm;
      
      const data = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      
      setToken(data.token);
      setUser(data.user || { name: authForm.name, email: authForm.email });
      setShowAuthForm(false);
      setAuthForm({ name: '', email: '', password: '' });
      setError('');
      
      setTimeout(() => {
        fetchNotes();
      }, 100);
    } catch (err) {
      setError(err.message);
      setAuthForm(prev => ({ ...prev, password: '' }));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setNotes([]);
    setShowAuthForm(true);
    setAuthForm({ name: '', email: '', password: '' });
    setNoteForm({ title: '', content: '' });
    setEditingNote(null);
    setError('');
    setLoading(false);
  };

  // Notes functions
  const fetchNotes = async () => {
    if (!token) return;
    
    try {
      const data = await apiCall('/notes');
      setNotes(data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('token') || err.message.includes('auth')) {
        logout();
      }
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    if (!noteForm.title || !noteForm.content) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await apiCall('/notes', {
        method: 'POST',
        body: JSON.stringify(noteForm),
      });
      
      setNotes([data, ...notes]);
      setNoteForm({ title: '', content: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, updatedNote) => {
    setLoading(true);
    setError('');
    try {
      const data = await apiCall(`/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedNote),
      });
      
      setNotes(notes.map(note => note._id === id ? data : note));
      setEditingNote(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    setLoading(true);
    setError('');
    try {
      await apiCall(`/notes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && !showAuthForm) {
      fetchNotes();
    }
  }, [token, showAuthForm]);

  if (showAuthForm) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">
            📝 Notes App
          </h1>
          
          <div className="backend-info">
            <p>
              <strong>Make sure your backend is running:</strong>
            </p>
            <p>
              cd backend && npm start
            </p>
            <p>
              Server should be running on http://localhost:5000
            </p>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="auth-form">
            {authMode === 'register' && (
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="form-input"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="form-input"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="form-input"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              onClick={handleAuth}
              className="btn-primary"
            >
              {loading ? 'Please wait...' : (authMode === 'login' ? 'Login' : 'Register')}
            </button>
          </div>
          
          <p className="auth-switch">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setError('');
                setAuthForm({ name: '', email: '', password: '' });
              }}
              className="auth-switch-btn"
            >
              {authMode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-app">
      {/* Header */}
      <div className="app-header">
        <div className="header-content">
          <h1 className="header-title">📝 My Notes</h1>
          <div className="user-info">
            <div className="user-display">
              <User className="h-5 w-5 text-gray-600" />
              <span>{user?.name || 'User'}</span>
            </div>
            <button
              onClick={logout}
              className="btn-logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Create Note Form */}
        <div className="create-note-card">
          <h2 className="create-note-title">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create New Note
          </h2>
          
          <div className="create-note-form">
            <input
              type="text"
              placeholder="Note title..."
              value={noteForm.title}
              onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
              className="note-input"
              required
            />
            
            <textarea
              placeholder="Write your note here..."
              value={noteForm.content}
              onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
              className="note-input note-textarea"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              onClick={createNote}
              className="btn-create"
            >
              {loading ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="note-card">
                {editingNote === note._id ? (
                  <EditNoteForm
                    note={note}
                    onSave={(updatedNote) => updateNote(note._id, updatedNote)}
                    onCancel={() => setEditingNote(null)}
                    loading={loading}
                  />
                ) : (
                  <div>
                    <div className="note-header">
                      <h3 className="note-title">{note.title}</h3>
                      <div className="note-actions">
                        <button
                          onClick={() => setEditingNote(note._id)}
                          className="btn-icon btn-edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteNote(note._id)}
                          className="btn-icon btn-delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="note-content">{note.content}</p>
                    
                    <div className="note-dates">
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                      {note.updatedAt !== note.createdAt && (
                        <span className="ml-4">
                          Updated: {new Date(note.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Edit Note Form Component
const EditNoteForm = ({ note, onSave, onCancel, loading }) => {
  const [editForm, setEditForm] = useState({
    title: note.title,
    content: note.content
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editForm);
  };

  return (
    <div className="edit-form">
      <input
        type="text"
        value={editForm.title}
        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        className="note-input"
        required
      />
      
      <textarea
        value={editForm.content}
        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
        className="note-input note-textarea"
        required
      />
      
      <div className="edit-actions">
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="btn-save"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save'}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="btn-cancel"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotesApp;