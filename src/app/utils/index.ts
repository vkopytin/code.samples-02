export function cookieExists(cookie: string): boolean { 
  return document.cookie
    .split(';')
    .some((item) => item.trim().startsWith(`${cookie}=`));
}

export function cookieRead(cookieName: string): string | undefined {
    let cookies = document.cookie;
    let cookieArray = cookies.split("; ");
 
    for (let i = 0; i < cookieArray.length; i++) {
       let cookie = cookieArray[i];
       let [name, value] = cookie.split("=");
      
       if (name === cookieName) {
          return decodeURIComponent(value);
       }
    }
    
    return;
}