import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Tooltip,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  EmojiEmotions as EmojiIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Timestamp;
  read: boolean;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  reactions: { [key: string]: string[] };
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Timestamp;
  unreadCount: number;
}

const Messages: React.FC = () => {
  const [chats, setChats] = useState<ChatUser[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [messageMenuAnchor, setMessageMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typing, setTyping] = useState(false);
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatMap = new Map<string, ChatUser>();
      
      snapshot.forEach((doc) => {
        const data = doc.data() as Message;
        const otherUserId = data.senderId === currentUser.uid ? data.receiverId : data.senderId;
        
        if (!chatMap.has(otherUserId)) {
          chatMap.set(otherUserId, {
            id: otherUserId,
            name: 'User ' + otherUserId.substring(0, 4),
            avatar: `https://ui-avatars.com/api/?name=User&background=random`,
            lastMessage: data.text,
            lastMessageTime: data.timestamp,
            unreadCount: data.senderId !== currentUser.uid && !data.read ? 1 : 0
          });
        } else {
          const chat = chatMap.get(otherUserId)!;
          if (data.timestamp > (chat.lastMessageTime || new Timestamp(0, 0))) {
            chat.lastMessage = data.text;
            chat.lastMessageTime = data.timestamp;
            if (data.senderId !== currentUser.uid && !data.read) {
              chat.unreadCount++;
            }
          }
        }
      });

      setChats(Array.from(chatMap.values()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!selectedChat || !currentUser) return;

    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Message))
        .filter(msg => 
          (msg.senderId === currentUser.uid && msg.receiverId === selectedChat.id) ||
          (msg.senderId === selectedChat.id && msg.receiverId === currentUser.uid)
        );
      setMessages(newMessages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [selectedChat, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !currentUser) return;

    try {
      await addDoc(collection(db, 'messages'), {
        senderId: currentUser.uid,
        receiverId: selectedChat.id,
        text: newMessage,
        timestamp: Timestamp.now(),
        read: false,
        type: 'text',
        participants: [currentUser.uid, selectedChat.id],
        reactions: {}
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat || !currentUser) return;

    try {
      const fileRef = ref(storage, `chat-files/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'messages'), {
        senderId: currentUser.uid,
        receiverId: selectedChat.id,
        text: file.name,
        timestamp: Timestamp.now(),
        read: false,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        fileUrl,
        fileName: file.name,
        participants: [currentUser.uid, selectedChat.id],
        reactions: {}
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    if (!currentUser) return;

    const messageRef = doc(db, 'messages', messageId);
    const message = messages.find(m => m.id === messageId);
    
    if (!message) return;

    const reactions = { ...message.reactions };
    if (!reactions[emoji]) {
      reactions[emoji] = [];
    }

    const userIndex = reactions[emoji].indexOf(currentUser.uid);
    if (userIndex === -1) {
      reactions[emoji].push(currentUser.uid);
    } else {
      reactions[emoji].splice(userIndex, 1);
      if (reactions[emoji].length === 0) {
        delete reactions[emoji];
      }
    }

    await updateDoc(messageRef, { reactions });
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex' }}>
      {/* Chat List */}
      <Paper
        sx={{
          width: isMobile ? (selectedChat ? 0 : '100%') : 300,
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'width 0.3s ease',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Messages
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                selected={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    color="primary"
                    badgeContent={chat.unreadCount}
                    invisible={chat.unreadCount === 0}
                  >
                    <Avatar src={chat.avatar} alt={chat.name} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ maxWidth: 200 }}
                    >
                      {chat.lastMessage}
                    </Typography>
                  }
                />
                {chat.lastMessageTime && (
                  <Typography variant="caption" color="text.secondary">
                    {chat.lastMessageTime.toDate().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

      {/* Chat Area */}
      {selectedChat && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {isMobile && (
              <IconButton onClick={() => setSelectedChat(null)} sx={{ mr: 1 }}>
                <CloseIcon />
              </IconButton>
            )}
            <Avatar src={selectedChat.avatar} alt={selectedChat.name} sx={{ mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">{selectedChat.name}</Typography>
              {typing && (
                <Typography variant="caption" color="text.secondary">
                  typing...
                </Typography>
              )}
            </Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          </Paper>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.senderId === currentUser?.uid ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    maxWidth: '70%',
                    backgroundColor: message.senderId === currentUser?.uid
                      ? 'primary.main'
                      : 'background.paper',
                    color: message.senderId === currentUser?.uid
                      ? 'primary.contrastText'
                      : 'text.primary',
                  }}
                >
                  {message.type === 'text' && (
                    <Typography variant="body1">{message.text}</Typography>
                  )}
                  {message.type === 'image' && (
                    <Box
                      component="img"
                      src={message.fileUrl}
                      alt="Shared image"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: 300,
                        borderRadius: 1,
                      }}
                    />
                  )}
                  {message.type === 'file' && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <FileIcon />
                      <Typography variant="body2" noWrap>
                        {message.fileName}
                      </Typography>
                      {message.fileUrl && (
                        <Button
                          size="small"
                          component="a"
                          href={message.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      )}
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 0.5,
                      mt: 0.5,
                      flexWrap: 'wrap',
                    }}
                  >
                    {Object.entries(message.reactions).map(([emoji, users]) => (
                      <Tooltip
                        key={emoji}
                        title={users.join(', ')}
                        onClick={() => handleReaction(message.id, emoji)}
                      >
                        <Chip
                          label={`${emoji} ${users.length}`}
                          size="small"
                          sx={{ cursor: 'pointer' }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      mt: 0.5,
                    }}
                  >
                    {message.timestamp.toDate().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message Input */}
          <Paper
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                color={showEmojiPicker ? 'primary' : 'default'}
              >
                <EmojiIcon />
              </IconButton>
              <IconButton
                onClick={() => fileInput?.click()}
                component="label"
              >
                <AttachFileIcon />
                <input
                  type="file"
                  hidden
                  ref={setFileInput}
                  onChange={handleFileUpload}
                />
              </IconButton>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                multiline
                maxRows={4}
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
            {showEmojiPicker && (
              <Box sx={{ position: 'absolute', bottom: '100%', right: 0 }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* Chat Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Clear Chat</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Block User</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Report</MenuItem>
      </Menu>
    </Box>
  );
};

export default Messages; 