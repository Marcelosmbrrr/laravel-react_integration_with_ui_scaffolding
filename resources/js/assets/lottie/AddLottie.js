import animation from './add.json';
import Lottie from 'react-lottie';

export function AddLottie(){

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation
    };

    return (
    <div>
        <Lottie 
        options={defaultOptions}
        height={'100%'}
        width={'100%'}
        />
    </div>
    );
}