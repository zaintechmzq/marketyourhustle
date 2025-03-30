import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  Typography,
  Badge,
  Tooltip,
} from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';

interface Reaction {
  emoji: string;
  label: string;
  count: number;
  reacted: boolean;
}

interface ReactionPickerProps {
  reactions: Reaction[];
  onReact: (reaction: string) => void;
}

const AVAILABLE_REACTIONS = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '🎉', label: 'Celebrate' },
  { emoji: '💡', label: 'Insightful' },
  { emoji: '🙏', label: 'Thanks' },
  { emoji: '🔥', label: 'Hot' },
];

const ReactionPicker: React.FC<ReactionPickerProps> = ({ reactions, onReact }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReact = (emoji: string) => {
    onReact(emoji);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {reactions.map((reaction) => (
        <Tooltip key={reaction.emoji} title={`${reaction.label} • ${reaction.count}`}>
          <Badge
            badgeContent={reaction.count}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                right: -3,
                top: 3,
                border: `2px solid ${reaction.reacted ? '#1976d2' : 'transparent'}`,
                padding: '0 4px',
              },
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleReact(reaction.emoji)}
              sx={{
                fontSize: '1.25rem',
                bgcolor: reaction.reacted ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {reaction.emoji}
            </IconButton>
          </Badge>
        </Tooltip>
      ))}
      
      <IconButton size="small" onClick={handleClick}>
        <AddReactionIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', maxWidth: 200 }}>
          {AVAILABLE_REACTIONS.map((reaction) => (
            <Tooltip key={reaction.emoji} title={reaction.label}>
              <IconButton
                size="small"
                onClick={() => handleReact(reaction.emoji)}
                sx={{
                  fontSize: '1.5rem',
                  p: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                {reaction.emoji}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default ReactionPicker; 