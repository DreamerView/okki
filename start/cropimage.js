/*jshint esversion: 6 */
import { useState,useCallback,memo } from 'react';
import Cropper from 'react-easy-crop';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const ResizeImage = ({item,ux}) => {
    const router = useRouter();
    const lang = router.locale;
    const send = useDispatch();
    const [position,setPosition] = useState({width:'',height:'',x:'',y:''});
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels);
        setPosition({width:croppedAreaPixels.width,height:croppedAreaPixels.height,x:croppedAreaPixels.x,y:croppedAreaPixels.y});
    }, []);
    const SaveResult = () => {
        const image = document.createElement('img');
        image.src = item.image;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = position.width;
            canvas.height = position.height;
            ctx.drawImage(image, position.x, position.y,position.width, position.height, 0, 0, position.width, position.height);
            const srcRes = ctx.canvas.toDataURL("image/webp");
            send({type:"getCropImage",set:{id:item.id,image:srcRes}});
            send({type:"setCropImage",set:false});
        };
    };
    return(
    <div className="main__crop_image">
        <div className="main__crop_image_block">
            <Cropper
                image={item.image}
                crop={crop}
                zoom={zoom}
                aspect={3 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
        </div>
        <div className='main__crop_image_nav'>
                <button onClick={()=>{SaveResult()}} className="main__block_button green_background">{ux['save'][lang]}</button>
        </div>
    </div>
    )
};
export default memo(ResizeImage);