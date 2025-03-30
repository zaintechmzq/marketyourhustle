import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Chip,
  Menu,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';
import {
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilled,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Post as PostType } from '../types/community';
import ReactionPicker from './ReactionPicker';
import { useReactions, useBookmarks, useComments } from '../hooks/useFirebase';
import { auth } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface PostProps {
  post: PostType;
  onComment: (content: string) => Promise<void>;
}

const Post: React.FC<PostProps> = ({ post, onComment }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentContent, setCommentContent] = useState('');
  const { addReaction } = useReactions(post.id);
  const { addBookmark, removeBookmark } = useBookmarks();
  const { comments, loading: commentsLoading, addComment } = useComments(post.id);
  const user = auth.currentUser;
  const [userNames, setUserNames] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const fetchUserNames = async () => {
      const userIds = Array.from(new Set(comments.map(comment => comment.authorId)));
      const names: {[key: string]: string} = {};
      
      for (const userId of userIds) {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            names[userId] = userDoc.data().displayName || 'Anonymous User';
          } else {
            names[userId] = 'Unknown User';
          }
        } catch (err) {
          console.error('Error fetching user name:', err);
          names[userId] = 'Unknown User';
        }
      }
      
      setUserNames(names);
    };

    if (comments.length > 0) {
      fetchUserNames();
    }
  }, [comments]);

  const handleReact = async (emoji: string) => {
    try {
      await addReaction(emoji);
    } catch (err) {
      console.error('Error adding reaction:', err);
    }
  };

  const handleBookmark = async () => {
    try {
      if (post.bookmarkedBy?.includes(user?.uid || '')) {
        await removeBookmark(post.id);
      } else {
        await addBookmark(post.id);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + '/post/' + post.id);
  };

  const handleSubmitComment = async () => {
    if (!commentContent.trim()) return;
    
    try {
      await addComment(commentContent);
      setCommentContent('');
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const reactions = Object.entries(post.reactions || {}).map(([emoji, data]) => ({
    emoji,
    label: data.emoji,
    count: data.count,
    reacted: data.users?.includes(user?.uid || '') || false,
  }));

  const isBookmarked = post.bookmarkedBy?.includes(user?.uid || '') || false;

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Avatar>U</Avatar>}
        action={
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleShare}>Share</MenuItem>
        <MenuItem onClick={handleBookmark}>
          {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        </MenuItem>
      </Menu>
      <CardContent>
        {post.isHtml ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {post.tags?.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <ReactionPicker
            reactions={reactions}
            onReact={handleReact}
          />
          <Box sx={{ flex: 1 }} />
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleBookmark}>
            {isBookmarked ? (
              <BookmarkFilled color="primary" />
            ) : (
              <BookmarkIcon />
            )}
          </IconButton>
        </Box>
      </CardActions>
      <Box sx={{ p: 2, pt: 0 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {post.commentCount || 0} comments
        </Typography>
        
        {/* Comments list */}
        <Box sx={{ mb: 2 }}>
          {commentsLoading ? (
            <Typography variant="body2" color="text.secondary">Loading comments...</Typography>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <Box key={comment.id} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {(userNames[comment.authorId] || 'U').charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {userNames[comment.authorId] || 'Loading...'}
                  </Typography>
                  <Typography variant="body2">
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet
            </Typography>
          )}
        </Box>

        {/* Comment input */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
            InputProps={{
              endAdornment: (
                <Button
                  size="small"
                  onClick={handleSubmitComment}
                  disabled={!commentContent.trim()}
                >
                  Post
                </Button>
              ),
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default Post; 