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

export function debounce<T extends Function>(func: T, timeout = 300): T {
  let timer: ReturnType<typeof setTimeout>;

  return function(this: never, ...args: never[]) {
    const self = this;
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(self, args); }, timeout);
  } as never as T;
}