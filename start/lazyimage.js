import Image from "next/image";

const LazyImage = (e) => {
    
    return(
        <Image 
            src={e.src!==undefined?e.src:""} 
            loading='lazy' 
            title={
                e.title!==undefined?e.title:""
            } 
            alt={
                e.alt!==undefined?e.alt:""
            } 
            layout='fill'
        />
    )
}
export default LazyImage;