export function packOpts(
  opts: Record<string, any>
): string {
  if (!opts) {
    return '';
  }
  const args: string[] = [];
  Object.keys(opts).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(opts, key) && opts[key]) {
      args.push(`${key}=${opts[key]}`);
    }
  });
  return '?' + args.join('&');
}

export function getCookie(name: string) {
  return document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))?.[2] ?? '';
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function setCookie(name: string, value: string) {
  // don't make it really serious
  document.cookie = `${name}=${value}`;
}