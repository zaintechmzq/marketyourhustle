import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Divider,
  Link,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  Reply as ReplyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { formatRelativeTime } from '../utils/dateUtils';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { Link as RouterLink } from 'react-router-dom';
import { Comment } from '../types/community';

interface ThreadedCommentsProps {
  comments: Comment[];
  postId: string;
  onReply: (content: string, parentId?: string) => Promise<void>;
  onLike: (commentId: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  onEdit: (commentId: string, newContent: string) => Promise<void>;
}

const CommentComponent: React.FC<{
  comment: Comment;
  level: number;
  onReply: (content: string, parentId?: string) => Promise<void>;
  onLike: (commentId: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  onEdit: (commentId: string, newContent: string) => Promise<void>;
}> = ({ comment, level, onReply, onLike, onDelete, onEdit }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(level < 2);
  const [authorData, setAuthorData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const currentUser = auth.currentUser;
  const isOwner = currentUser?.uid === comment.authorId;
  const hasLiked = comment.likedBy?.includes(currentUser?.uid || '') || false;

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const authorDoc = await getDoc(doc(db, 'users', comment.authorId));
        if (authorDoc.exists()) {
          setAuthorData(authorDoc.data());
        }
      } catch (err) {
        console.error('Error fetching author data:', err);
      }
    };
    fetchAuthorData();
  }, [comment.authorId]);

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await onReply(replyContent, comment.id);
    setReplyContent('');
    setReplyOpen(false);
  };

  const handleEdit = async () => {
    if (!editContent.trim() || editContent === comment.content) {
      setIsEditing(false);
      return;
    }
    await onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  return (
    <Box sx={{ ml: level * 3, mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar
          src={authorData?.photoURL}
          sx={{ width: 32, height: 32 }}
        >
          {authorData?.displayName?.charAt(0) || 'U'}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Link
              component={RouterLink}
              to={`/profile/${comment.authorId}`}
              color="inherit"
              sx={{
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {authorData?.displayName || 'Anonymous User'}
            </Link>
            <Typography variant="caption" color="text.secondary">
              • {formatRelativeTime(comment.createdAt)}
            </Typography>
            {isOwner && (
              <>
                <IconButton
                  size="small"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => {
                    setIsEditing(true);
                    setAnchorEl(null);
                  }}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => {
                    onDelete(comment.id);
                    setAnchorEl(null);
                  }}>
                    Delete
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
          
          {isEditing ? (
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleEdit}
                  disabled={!editContent.trim() || editContent === comment.content}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Button
              size="small"
              startIcon={<ThumbUpIcon />}
              onClick={() => onLike(comment.id)}
              sx={{
                color: hasLiked ? 'primary.main' : 'text.secondary',
                textTransform: 'none',
              }}
            >
              {comment.likes > 0 && comment.likes}
            </Button>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => setReplyOpen(!replyOpen)}
              sx={{ textTransform: 'none' }}
            >
              Reply
            </Button>
          </Box>

          <Collapse in={replyOpen}>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Avatar
                src={currentUser?.photoURL || ''}
                sx={{ width: 32, height: 32 }}
              >
                {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    onClick={() => {
                      setReplyContent('');
                      setReplyOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                  >
                    Reply
                  </Button>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>

      {comment.replies && comment.replies.length > 0 && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 5,
              mt: 1,
              cursor: 'pointer',
            }}
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            <Typography variant="body2" color="text.secondary">
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </Typography>
          </Box>
          <Collapse in={showReplies}>
            {comment.replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                level={level + 1}
                onReply={onReply}
                onLike={onLike}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </Collapse>
        </>
      )}
    </Box>
  );
};

const ThreadedComments: React.FC<ThreadedCommentsProps> = ({
  comments,
  postId,
  onReply,
  onLike,
  onDelete,
  onEdit,
}) => {
  // Organize comments into a threaded structure
  const threadedComments = (comments || []).reduce((acc: Comment[], comment: Comment) => {
    if (!comment.parentId) {
      // This is a top-level comment
      const replies = (comments || []).filter(c => c.parentId === comment.id);
      return [...acc, { ...comment, replies: replies || [] }];
    }
    return acc;
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      {threadedComments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={{
            ...comment,
            likedBy: comment.likedBy || [],
            replies: comment.replies || []
          }}
          level={0}
          onReply={onReply}
          onLike={onLike}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Box>
  );
};

export default ThreadedComments; 