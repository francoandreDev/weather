import { useState, useEffect } from 'react';

import './loading.css';

const Loading = () => {
    const allText = 'Loading...';
    const timer = 250;
    const [text, setText] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    const addText = () => {
        setText(allText.slice(0, count));
        setCount((count) => count + 1);
    };

    const reset = () => {
        setText('');
        setCount(0);
    };

    const asyncLoading = () => {
        setShow(true);
        setText(text.slice(0, -3));
        setTimeout(() => {
            reset();
            setShow(false);
        }, timer * 8);
    };

    useEffect(() => {
        setTimeout(() => {
            allText === text ? asyncLoading() : addText();
        }, timer);
    }, [count]);

    return (
        <div className="loading">
            <p>{text}</p>
            {show ? (
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : null}
        </div>
    );
};

export default Loading;
