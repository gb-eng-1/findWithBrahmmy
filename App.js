import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Image, StyleSheet, TextInput, TouchableOpacity, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Login = ({ navigation }) => {
  const [text, onChangeText] = React.useState('Username');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>

        {/* TextInput Example */}
        <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Password"
          keyboardType="numeric"
        />

        {/* Guest View Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Just navigate to the Home screen (or stay if it's on Home)
          style={styles.button}
        >
          <Text style={styles.buttonText}>Guest View</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const HomeScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0];
  const contentAnim = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(contentAnim, {
      toValue: menuVisible ? 0 : 250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Log the user out by changing the login state
    // Optionally, navigate back to the Login screen if needed
  };

  const lostItems = [
    {
      id: 1,
      image: 'https://i.ebayimg.com/00/s/MTU1OFgxNjAw/z/~NwAAOSwsI1f28Wb/$_57.JPG?set_id=8800005007',
      title: 'Lost Wallet',
      postedBy: 'Gian Sandrex Faa',
      description: 'A brown leather wallet with some cards.',
      itemType: 'Wallet',
      lastSeenDate: '2024-12-10',
      lastSeenLocation: 'Park, near the fountain',
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3G9lcIUniioSsnOBkpaNH2tomfEKf-2vvw&s',
      title: 'Missing Phone',
      postedBy: 'Glaiza Mae Bacay',
      description: 'A black iPhone 12 with a cracked screen.',
      itemType: 'Phone',
      lastSeenDate: '2024-12-12',
      lastSeenLocation: 'Coffee shop, Main Street',
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.hamburgerText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.topBarText}></Text>
        </View>

        {menuVisible && (
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}

        {/* Sidebar Menu */}
        <Animated.View style={[styles.drawerMenu, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>Submit Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Content Area */}
        <Animated.View style={[styles.content, { transform: [{ translateX: contentAnim }] }]}>
          {isLoggedIn ? (
            <ScrollView style={styles.itemList}>
              {lostItems.map((item) => (
                <View key={item.id} style={styles.itemContainer}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemInfo}>Posted By: {item.postedBy}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemInfo}>Item Type: {item.itemType}</Text>
                    <Text style={styles.itemInfo}>Last Seen: {item.lastSeenDate}</Text>
                    <Text style={styles.itemInfo}>Location: {item.lastSeenLocation}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <>
              {/* Login Form or Guest View Content */}
              <Image source={require('./assets/fwblogo.png')} style={styles.logo} />
              <TextInput style={styles.input} onChangeText={(text) => {}} value="Username" placeholder="Username" />
              <TextInput
                style={styles.input}
                onChangeText={(password) => {}}
                value="Password"
                placeholder="Password"
                secureTextEntry
              />
              <TouchableOpacity onPress={() => setIsLoggedIn(true)} style={styles.button}>
                <Text style={styles.buttonText}>Guest View</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  hamburgerText: {
    fontSize: 30,
  },
  topBarText: {
    fontSize: 20,
  },
  logo: {
    width: 200,
    height: 250,
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  drawerMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderColor: 'gray',
    zIndex: 1,
    paddingTop: 50, // For the top of the menu
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  itemList: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    marginLeft: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 12,
  },
  itemDescription: {
    fontSize: 14,
  },
});

export default MyStack;
