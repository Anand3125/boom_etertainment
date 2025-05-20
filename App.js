import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { FontAwesome } from '@expo/vector-icons';


const videoFeed = [
  {
    id: 1,
    uri: 'https://media.istockphoto.com/id/493319015/video/super-girl-running-in-the-meadow-at-sunset.mp4?s=mp4-640x640-is&k=20&c=QbFNb3xfmDLww3UYahFt2aNYPHsep8-iJY7K-sM3-jg=',
    user: 'motion_vibes',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 2,
    uri: 'https://cdn.pixabay.com/video/2025/05/04/276646_large.mp4',
    user: 'explorer99',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 3,
    uri: 'https://cdn.pixabay.com/video/2023/03/08/153821-806526710_large.mp4',
    user: 'adventure_gal',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    uri: 'https://cdn.pixabay.com/video/2024/08/30/228947_large.mp4',
    user: 'urban_sky',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 5,
    uri: 'https://cdn.pixabay.com/video/2020/07/07/44087-438195567_large.mp4',
    user: 'motion_vibes',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    uri: 'https://cdn.pixabay.com/video/2023/01/15/146586-789804246_large.mp4',
    user: 'nature_lover',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  }
];

export default function App() {
  const [likedPosts, setLikedPosts] = useState({});

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
<View style={styles.header}>
  <View style={styles.leftContainer}>
    <Image
      source={require('./assets/logo.jpeg')}
      style={styles.logo}
    />
    <Text style={styles.headerTitle}>Boom</Text>
    <Text style={styles.header2Title}>Entertainment</Text>
  </View>
  
  <TouchableOpacity onPress={handleLogout}>
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
</View>


        {/* Story Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storyScroll}
        >
          {/* Add Post Circle */}
          <TouchableOpacity style={styles.storyItem}>
            <View style={styles.addPostCircle}>
              <Icon name="plus" size={22} color="#fff" />
            </View>
            <Text style={styles.storyText}>Your Story</Text>
          </TouchableOpacity>

          {/* Other user avatars */}
          {videoFeed.map((item) => (
            <View key={item.id} style={styles.storyItem}>
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
              <Text style={styles.storyText}>
                {item.user.length > 10 ? item.user.slice(0, 10) + '…' : item.user}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Video Feed */}
        {videoFeed.map((item, index) => (
          <View key={item.id} style={styles.postContainer}>
            <View style={styles.userHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{item.user}</Text>
            </View>

            <Video
              source={{ uri: item.uri }}
              style={styles.video}
              useNativeControls
              resizeMode="cover"
              isLooping
              shouldPlay={index === 0}
            />

            {/* Action Icons Section */}
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <FontAwesome
  name={likedPosts[item.id] ? 'heart' : 'heart-o'}
  size={24}
  color={likedPosts[item.id] ? 'red' : '#fff'}
  style={styles.icon}
/>

              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="message-circle" size={24} color="#fff" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="send" size={24} color="#fff" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Icon name="bookmark" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: 'black',
  },
  header: {
    marginTop:31,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
  backgroundColor: 'black', // Optional
  elevation: 3,             // For Android shadow
  shadowColor: '#000',      // For iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
},

  leftContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

  logo: {
  width: 40,
  height: 40,
  marginRight: 8,
  borderRadius: 5,
},

 headerTitle: {
  fontSize: 25,
  fontWeight: 'bold',
  color: 'white',
},
 header2Title: {
  marginTop:5,
  fontSize: 14,
  fontWeight: 'bold',
  color: 'white',
},

  logoutText: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: '600',
  },
  storyScroll: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  addPostCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9147ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#9147ff',
  },
  storyText: {
    marginTop: 6,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 70,
  },
  postContainer: {
    marginBottom: 25,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  video: {
    width: '100%',
    height: 400,
    backgroundColor: '#000',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 8,
  },
  icon: {
    marginRight: 16,
  },
  
});
