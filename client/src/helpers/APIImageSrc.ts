export function getAPIImageSrc(src: string) {
  return `${process.env.REACT_APP_API_URL}/${src}`;
}
