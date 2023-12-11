import FullWrapper from './FullWrapper';

function LoadingScreen() {
    return (
        <FullWrapper>
            <div className='w-full h-full min-h-screen flex justify-center items-center'>
                <h1 className='text-white font-sans text-4xl'>Loading...</h1>
            </div>
        </FullWrapper>
    );
}

export default LoadingScreen;