import React from 'react';
import { Comment } from '../../types';

interface CommentsSectionProps {
  comments: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  return (
    <div className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-lg font-semibold text-text-main dark:text-text-main-dark mb-4">Comments ({comments.length})</h2>
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex items-start space-x-3">
            <img 
              className="h-8 w-8 rounded-full" 
              src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.name.replace(' ', '+')}&background=random`} 
              alt={comment.user.name} 
            />
            <div>
              <p className="font-semibold text-text-main dark:text-text-main-dark">{comment.user.name} <span className="text-xs font-normal text-text-secondary dark:text-text-secondary-dark ml-2">{new Date(comment.timestamp).toLocaleString()}</span></p>
              <p className="text-text-secondary dark:text-text-secondary-dark mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-text-secondary dark:text-text-secondary-dark">No comments yet.</p>
        )}
      </div>
      <div className="mt-6 flex items-start space-x-3">
        <img 
          className="h-8 w-8 rounded-full" 
          src="https://i.pravatar.cc/150?u=current-user" 
          alt="Current User" 
        />
        <div className="flex-1">
          <textarea 
            rows={2}
            placeholder="Add a comment..."
            className="w-full bg-background dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
