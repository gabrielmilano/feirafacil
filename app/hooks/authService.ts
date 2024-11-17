const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://feira.mateuslh.com';

export const saveToken = (token: string) => {
  document.cookie = `token=${token}; path=/; samesite=strict;`;
};

export const getToken = () => {
  
  const name = 'token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  
  return null;
};

export const loginUser = async (credentials: { usuario: string; senha: string }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    
    if (!response.ok) {
      const errorDetails = await response.json(); 
      console.error('Erro ao realizar login:', errorDetails);
      throw new Error('Erro ao realizar login');
    }

    const data = await response.json();
    const token = data.content.token;  
    saveToken(token);  
    return data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

export const logoutUser = () => {
 
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  
  window.location.href = '/pages/public/login'; 
};

