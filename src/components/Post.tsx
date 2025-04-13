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
  Tooltip,
  Link,
  Divider,
} from '@mui/material';
import {
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkFilled,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  LocalOffer as TagIcon,
  Category as CategoryIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Post as PostType } from '../types/community';
import ReactionPicker from './ReactionPicker';
import { useReactions } from '../hooks/useReactions';
import { useBookmarks } from '../hooks/useBookmarks';
import { useComments } from '../hooks/useComments';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { formatRelativeTime, formatFullDate } from '../utils/dateUtils';
import ThreadedComments from './ThreadedComments';

interface PostProps {
  post: PostType;
  onComment: (content: string) => Promise<void>;
}

const REACTION_LABELS: { [key: string]: string } = {
  '👍': 'Like',
  '❤️': 'Love',
  '🎉': 'Celebrate',
  '💡': 'Insightful',
  '🙏': 'Thanks',
  '🔥': 'Hot',
};

const Post: React.FC<PostProps> = ({ post, onComment }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commentContent, setCommentContent] = useState('');
  const [authorData, setAuthorData] = useState<any>(null);
  const { addReaction, removeReaction } = useReactions(post.id);
  const { addBookmark, removeBookmark } = useBookmarks();
  const { 
    comments, 
    loading: commentsLoading, 
    addComment,
    deleteComment,
    editComment,
    likeComment 
  } = useComments(post.id);
  const user = auth.currentUser;
  const [userNames, setUserNames] = useState<{[key: string]: string}>({});
  const [userAvatars, setUserAvatars] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const authorDoc = await getDoc(doc(db, 'users', post.authorId));
        if (authorDoc.exists()) {
          setAuthorData(authorDoc.data());
        }
      } catch (err) {
        console.error('Error fetching author data:', err);
      }
    };
    fetchAuthorData();
  }, [post.authorId]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userIds = Array.from(new Set(comments.map(comment => comment.authorId)));
      const names: {[key: string]: string} = {};
      const avatars: {[key: string]: string} = {};
      
      for (const userId of userIds) {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            names[userId] = userData.displayName || 'Anonymous User';
            avatars[userId] = userData.photoURL || '';
          } else {
            names[userId] = 'Unknown User';
            avatars[userId] = '';
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          names[userId] = 'Unknown User';
          avatars[userId] = '';
        }
      }
      
      setUserNames(names);
      setUserAvatars(avatars);
    };

    if (comments.length > 0) {
      fetchUserData();
    }
  }, [comments]);

  const handleReaction = async (emoji: string) => {
    try {
      await addReaction(emoji);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const handleRemoveReaction = async (emoji: string) => {
    try {
      await removeReaction(emoji);
    } catch (error) {
      console.error('Error removing reaction:', error);
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

  const handleSubmitComment = async (content: string, parentId?: string) => {
    if (!content.trim()) return;
    
    try {
      await addComment(content, parentId);
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      await likeComment(commentId);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (commentId: string, content: string) => {
    try {
      await editComment(commentId, content);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const reactions = Object.entries(post.reactions || {}).map(([emoji, data]) => ({
    emoji,
    label: REACTION_LABELS[emoji] || emoji,
    count: data.count,
    reacted: data.users?.includes(user?.uid || '') || false,
  }));

  const isBookmarked = post.bookmarkedBy?.includes(user?.uid || '') || false;

  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            src={authorData?.photoURL}
            sx={{ width: 40, height: 40 }}
          >
            {authorData?.displayName?.charAt(0) || 'U'}
          </Avatar>
        }
        action={
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link
              component={RouterLink}
              to={`/profile/${post.authorId}`}
              color="inherit"
              sx={{ 
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              {authorData?.displayName || 'Anonymous User'}
            </Link>
            {post.category && (
              <Chip
                label={post.category}
                size="small"
                sx={{
                  backgroundColor: '#FF7F50',
                  color: 'white',
                  height: 24,
                  fontWeight: 500,
                }}
              />
            )}
          </Box>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {formatRelativeTime(post.createdAt)}
            </Typography>
          </Box>
        }
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
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        {post.isHtml ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {post.tags?.map((tag) => (
            <Chip
              key={tag}
              icon={<TagIcon sx={{ fontSize: 16 }} />}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ height: 24 }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, py: 1, borderTop: 1, borderColor: 'divider' }}>
        <ReactionPicker
          reactions={reactions}
          onReact={(emoji) => {
            if (reactions.some(r => r.emoji === emoji && r.reacted)) {
              handleRemoveReaction(emoji);
            } else {
              handleReaction(emoji);
            }
          }}
        />
        <Button
          size="small"
          startIcon={<CommentIcon />}
          sx={{ textTransform: 'none' }}
        >
          {comments.length}
        </Button>
        <Button
          size="small"
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={{ textTransform: 'none' }}
        >
          Share
        </Button>
        <Button
          size="small"
          startIcon={isBookmarked ? <BookmarkFilled /> : <BookmarkIcon />}
          onClick={handleBookmark}
          sx={{
            textTransform: 'none',
            color: isBookmarked ? 'primary.main' : 'text.secondary',
          }}
        >
          {isBookmarked ? 'Saved' : 'Save'}
        </Button>
      </CardActions>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Avatar 
            src={user?.photoURL || ''}
            sx={{ width: 32, height: 32 }}
          >
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
                handleSubmitComment(commentContent);
                setCommentContent('');
              }
            }}
            InputProps={{
              sx: {
                borderRadius: 2,
                backgroundColor: 'action.hover',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Box>

        <ThreadedComments
          comments={comments}
          postId={post.id}
          onReply={handleSubmitComment}
          onLike={handleLikeComment}
          onDelete={handleDeleteComment}
          onEdit={handleEditComment}
        />
      </Box>
    </Card>
  );
};

export default Post; 