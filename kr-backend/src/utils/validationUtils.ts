export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPassword = (password: string): boolean => {
    // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^.{4,}$/;
    return passwordRegex.test(password);
  };
  
  export const isValidName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };
  