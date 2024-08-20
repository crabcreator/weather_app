import './Loader.css';

interface LoaderProps {
    width: string;
    height: string;
    borderWidth: string;
}

export default function Loader({width, height, borderWidth}: LoaderProps) {

    return (
        <div className="loading-screen">
            <div className="loader"
            style={{width: width, height: height, borderWidth: borderWidth, borderTopWidth: borderWidth}}></div>
        </div>
    )
}