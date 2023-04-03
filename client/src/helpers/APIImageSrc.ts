export function getAPIImageSrc(src:string,type:'rooms'){
    return `${process.env.REACT_APP_API_URL}/${type}/${src}`
}