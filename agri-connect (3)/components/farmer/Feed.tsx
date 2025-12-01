
import React, { useState, useRef } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { Post, Comment } from '../../types';
import { CameraIcon } from '../shared/icons/CameraIcon';
import { XIcon } from '../shared/icons/XIcon';

const mockPosts: Post[] = [
  {
    id: 1,
    author: { name: 'Jane Doe', avatar: 'https://picsum.photos/id/1025/100/100' },
    content: 'First batch of tomatoes are looking great this year! The organic fertilizer is working wonders. 🍅',
    imageUrl: 'https://picsum.photos/seed/tomato/600/400',
    likes: 125,
    comments: [
        { id: 'c1-1', author: { name: 'Samuel Lee', avatar: 'https://picsum.photos/id/1011/100/100' }, content: 'Looking good, Jane!', timestamp: '1h ago' },
    ],
    timestamp: '2h ago',
  },
  {
    id: 2,
    author: { name: 'Samuel Lee', avatar: 'https://picsum.photos/id/1011/100/100' },
    content: 'Anyone have experience with drip irrigation for corn fields? Looking for tips to conserve water.',
    likes: 78,
    comments: [],
    timestamp: '5h ago',
  },
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null);
  const [newCommentContent, setNewCommentContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPostImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPostImage(null);
    setPreviewUrl(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handlePost = () => {
    if (!newPostContent.trim() && !postImage) return;

    const newPost: Post = {
      id: Date.now(),
      author: { name: 'Alex Johnson', avatar: 'https://picsum.photos/id/1027/100/100' },
      content: newPostContent,
      imageUrl: previewUrl || undefined, // Use the preview URL for the post
      likes: 0,
      comments: [],
      timestamp: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    handleRemoveImage();
  };
  
  const handleLike = (postId: number) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const toggleCommentSection = (postId: number) => {
    setActiveCommentPostId(prevId => (prevId === postId ? null : postId));
    setNewCommentContent('');
  };
  
  const handlePostComment = (postId: number) => {
    if (!newCommentContent.trim()) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: { name: 'Alex Johnson', avatar: 'https://picsum.photos/id/1027/100/100' },
      content: newCommentContent,
      timestamp: 'Just now',
    };

    setPosts(posts.map(p =>
      p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
    ));
    setNewCommentContent('');
  };


  return (
    <Card title="Community Feed">
      {/* Create Post */}
      <div className="mb-6">
        <textarea
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          rows={3}
          placeholder="What's on your mind, Alex?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>
        {previewUrl && (
          <div className="mt-2 relative">
            <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex justify-between items-center mt-2">
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-green-600 dark:text-green-400 hover:text-green-700 p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Add image"
              >
                <CameraIcon />
              </button>
            </div>
            <Button onClick={handlePost}>Post</Button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-t dark:border-gray-700">
            <div className="flex items-start space-x-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  <p className="font-bold text-gray-800 dark:text-white">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="mt-3 rounded-lg w-full object-cover max-h-80" />}
                <div className="flex items-center space-x-6 mt-4 text-gray-500">
                    <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1 hover:text-red-500 transition-colors"><span>❤️</span><span>{post.likes}</span></button>
                    <button onClick={() => toggleCommentSection(post.id)} className="flex items-center space-x-1 hover:text-blue-500 transition-colors"><span>💬</span><span>{post.comments.length}</span></button>
                </div>

                {/* Comment Section */}
                {activeCommentPostId === post.id && (
                  <div className="mt-4 pt-4 border-t dark:border-gray-700">
                    {/* New Comment Form */}
                    <div className="flex items-start space-x-3 mb-4">
                      <img src="https://picsum.photos/id/1027/100/100" alt="Your avatar" className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1">
                        <textarea
                          className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                          rows={2}
                          placeholder="Write a comment..."
                          value={newCommentContent}
                          onChange={(e) => setNewCommentContent(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button onClick={() => handlePostComment(post.id)} className="mt-2 text-xs !px-3 !py-1">Post Comment</Button>
                        </div>
                      </div>
                    </div>
                    {/* Existing Comments */}
                    <div className="space-y-3">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start space-x-3">
                          <img src={comment.author.avatar} alt={comment.author.name} className="w-9 h-9 rounded-full object-cover" />
                          <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                            <div className="flex items-baseline space-x-2">
                              <p className="font-bold text-sm text-gray-800 dark:text-white">{comment.author.name}</p>
                              <p className="text-xs text-gray-500">{comment.timestamp}</p>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                      {post.comments.length === 0 && <p className="text-xs text-center text-gray-500 py-2">No comments yet.</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Feed;
