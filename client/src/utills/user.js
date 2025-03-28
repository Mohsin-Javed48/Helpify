const userVariable = 'user';

export const getUser = () => {
  try {
    console.log('Getting user from localStorage');
    const userData = localStorage.getItem(userVariable);
    if (!userData) {
      console.log('No user data found in localStorage');
      return null;
    }
    
    const parsedUser = JSON.parse(userData);
    console.log('Retrieved user data successfully:', !!parsedUser);
    
    // Check if this is an actual user object with required fields
    if (!parsedUser || (!parsedUser.user && !parsedUser.token)) {
      console.warn('Invalid user data format in localStorage');
      return null;
    }
    
    return parsedUser;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    // Clear potentially corrupted data
    localStorage.removeItem(userVariable);
    return null;
  }
};

export const setUser = (user) => {
  try {
    if (!user) {
      console.error('Attempted to save invalid user data');
      return;
    }
    
    console.log('Saving user data to localStorage');
    
    // Ensure we're storing a proper user object
    // If it's just a token string, wrap it in an object
    const userData = typeof user === 'string' 
      ? { token: user } 
      : user;
      
    localStorage.setItem(userVariable, JSON.stringify(userData));
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data to localStorage:', error);
  }
};

export const clearUser = () => {
  try {
    console.log('Clearing user data');
    localStorage.removeItem(userVariable);
    localStorage.removeItem('jwt');
    console.log('User data cleared successfully');
  } catch (error) {
    console.error('Error clearing user data:', error);
    // Force clear as fallback
    localStorage.clear();
  }
};
