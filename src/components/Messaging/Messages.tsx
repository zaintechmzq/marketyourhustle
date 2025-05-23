import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Divider, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { 
  Send as SendIcon, 
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { collection, query, where, orderBy, onSnapshot, addDoc, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { formatMessageDate, markConversationAsRead } from '../../utils/messaging';

const Messages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversationUser, setConversationUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(!isMobile);
  const messagesEndRef = useRef(null);
  const currentUser = auth.currentUser;

  // Fetch user conversations
  useEffect(() => {
    if (!currentUser) return;

    const conversationsQuery = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(conversationsQuery, async (snapshot) => {
      const conversationsData = [];
      
      for (const docSnapshot of snapshot.docs) {
        const conversationData = docSnapshot.data();
        const otherUserId = conversationData.participants.find(id => id !== currentUser.uid);
        
        // Get other user's details
        try {
          const userDoc = await getDoc(doc(db, 'users', otherUserId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            conversationsData.push({
              id: docSnapshot.id,
              otherUserId,
              otherUserName: userData.displayName || 'User',
              otherUserPhoto: userData.photoURL || '',
              lastMessage: conversationData.lastMessage || '',
              timestamp: conversationData.lastMessageTimestamp ? conversationData.lastMessageTimestamp.toDate() : new Date(),
              unread: conversationData.readBy ? !conversationData.readBy[currentUser.uid] : false
            });
          }
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
      
      setConversations(conversationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Fetch messages for the active conversation
  useEffect(() => {
    if (!activeConversation) return;

    const messagesQuery = query(
      collection(db, 'conversations', activeConversation.id, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          senderId: data.senderId,
          text: data.text,
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
          isCurrentUser: data.senderId === currentUser?.uid
        };
      });

      setMessages(messagesData);
      
      // Mark as read
      if (currentUser) {
        markConversationAsRead(activeConversation.id, currentUser.uid);
      }
      
      // Scroll to bottom
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [activeConversation, currentUser]);

  // Get conversation user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!activeConversation) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', activeConversation.otherUserId));
        if (userDoc.exists()) {
          setConversationUser(userDoc.data());
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
    
    fetchUserDetails();
  }, [activeConversation]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation || !currentUser) return;
    
    try {
      // Add message to subcollection
      await addDoc(collection(db, 'conversations', activeConversation.id, 'messages'), {
        senderId: currentUser.uid,
        text: newMessage,
        timestamp: serverTimestamp()
      });
      
      // Update conversation doc
      await updateDoc(doc(db, 'conversations', activeConversation.id), {
        lastMessage: newMessage,
        lastMessageTimestamp: serverTimestamp(),
        lastSenderId: currentUser.uid,
        [`readBy.${activeConversation.otherUserId}`]: false
      });
      
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToList = () => {
    if (isMobile) {
      setShowChat(false);
    }
  };

  if (!currentUser) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h6">Please sign in to access messages</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: { xs: 'calc(100vh - 120px)', md: 'calc(100vh - 180px)' }, p: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          overflow: 'hidden', 
          borderRadius: 2
        }}
      >
        <Grid container sx={{ height: '100%' }}>
          {/* Conversations List - Hide on mobile when showing chat */}
          {(!isMobile || !showChat) && (
            <Grid 
              item 
              xs={12} 
              md={4} 
              sx={{ 
                height: '100%', 
                borderRight: { xs: 0, md: 1 }, 
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="medium">Messages</Typography>
                <TextField 
                  placeholder="Search conversations..." 
                  size="small" 
                  fullWidth 
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Box>
              <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                {conversations.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="text.secondary">No conversations yet</Typography>
                  </Box>
                ) : (
                  conversations.map((conversation) => (
                    <React.Fragment key={conversation.id}>
                      <ListItem 
                        button 
                        selected={activeConversation?.id === conversation.id}
                        onClick={() => handleConversationSelect(conversation)}
                        sx={{
                          bgcolor: activeConversation?.id === conversation.id ? 
                            `${theme.palette.primary.main}15` : 'inherit',
                          '&:hover': {
                            bgcolor: activeConversation?.id === conversation.id ? 
                              `${theme.palette.primary.main}25` : 'action.hover'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            src={conversation.otherUserPhoto} 
                            alt={conversation.otherUserName}
                          >
                            {conversation.otherUserName?.[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={
                            <Typography 
                              variant="subtitle2" 
                              fontWeight={conversation.unread ? 'bold' : 'normal'}
                            >
                              {conversation.otherUserName}
                            </Typography>
                          }
                          secondary={
                            <Box
                              component="span"
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  maxWidth: '120px',
                                  color: conversation.unread ? 'text.primary' : 'text.secondary',
                                  fontWeight: conversation.unread ? 'medium' : 'normal'
                                }}
                              >
                                {conversation.lastMessage || 'No messages yet'}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {formatMessageDate(conversation.timestamp)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))
                )}
              </List>
            </Grid>
          )}
          
          {/* Chat Area - Hide on mobile when showing conversations list */}
          {(!isMobile || showChat) && (
            <Grid 
              item 
              xs={12} 
              md={8} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column'
              }}
            >
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderBottom: 1, 
                      borderColor: 'divider', 
                      display: 'flex', 
                      alignItems: 'center',
                      bgcolor: theme.palette.background.paper
                    }}
                  >
                    {isMobile && (
                      <IconButton 
                        edge="start" 
                        onClick={handleBackToList} 
                        sx={{ mr: 1 }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    )}
                    <Avatar 
                      src={activeConversation.otherUserPhoto} 
                      alt={activeConversation.otherUserName}
                      sx={{ mr: 1.5 }}
                    >
                      {activeConversation.otherUserName?.[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {activeConversation.otherUserName}
                      </Typography>
                      {conversationUser && conversationUser.businessType && (
                        <Typography variant="caption" color="text.secondary">
                          {conversationUser.businessType}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Messages Area */}
                  <Box 
                    sx={{ 
                      flexGrow: 1, 
                      overflow: 'auto', 
                      p: 2, 
                      bgcolor: theme.palette.grey[50]
                    }}
                  >
                    {messages.length === 0 ? (
                      <Box sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <Typography color="text.secondary">
                          No messages yet. Send a message to start the conversation.
                        </Typography>
                      </Box>
                    ) : (
                      messages.map((message) => (
                        <Box
                          key={message.id}
                          sx={{
                            display: 'flex',
                            justifyContent: message.isCurrentUser ? 'flex-end' : 'flex-start',
                            mb: 2
                          }}
                        >
                          {!message.isCurrentUser && (
                            <Avatar
                              src={activeConversation.otherUserPhoto}
                              alt={activeConversation.otherUserName}
                              sx={{ width: 32, height: 32, mr: 1, mt: 1 }}
                            >
                              {activeConversation.otherUserName?.[0]}
                            </Avatar>
                          )}
                          <Box>
                            <Paper
                              elevation={1}
                              sx={{
                                p: 2,
                                maxWidth: '70%',
                                borderRadius: 2,
                                bgcolor: message.isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
                                color: message.isCurrentUser ? theme.palette.primary.contrastText : 'inherit'
                              }}
                            >
                              <Typography variant="body1">{message.text}</Typography>
                            </Paper>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block', mt: 0.5, textAlign: message.isCurrentUser ? 'right' : 'left' }}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </Box>
                  
                  {/* Message Input */}
                  <Box 
                    component="form" 
                    onSubmit={handleSendMessage}
                    sx={{ 
                      p: 2, 
                      borderTop: 1, 
                      borderColor: 'divider', 
                      display: 'flex', 
                      alignItems: 'center',
                      bgcolor: theme.palette.background.paper
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Type a message..."
                      size="small"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      sx={{ mr: 1 }}
                      autoComplete="off"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      disabled={!newMessage.trim()}
                      type="submit"
                      sx={{ minWidth: '120px' }}
                    >
                      Send
                    </Button>
                  </Box>
                </>
              ) : (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%' 
                  }}
                >
                  <Typography color="text.secondary">
                    Select a conversation to start messaging
                  </Typography>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Messages;
