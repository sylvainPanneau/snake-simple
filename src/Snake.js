import React, { useState, useEffect } from 'react';
import css from './App.css';
import Food from './Food';

export default function Snake({setGameOver, setScore, score}) {
    const [snakeDot, setSnakeDot] = useState([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
    const [direction, setDirection] = useState('right');
    const [internalClock, setInternalClock] = useState(0);
    const { eaten, render } = Food({ head: snakeDot[0] });

    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 37 && direction !== 'right') {
            setDirection('left');
        } else if (e.keyCode === 38 && direction !== 'down') {
            setDirection('up');
        } else if (e.keyCode === 39 && direction !== 'left') {
            setDirection('right');
        } else if (e.keyCode === 40 && direction !== 'up') {
            setDirection('down');
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setInternalClock(internalClock + 1);
        }, 50);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        // if head is at the same position as one of the dots, game over.
        // the dots considered should not be the head...
        const head = snakeDot[0];
        for (let i = 1; i < snakeDot.length; i++) {
            if (head.x === snakeDot[i].x && head.y === snakeDot[i].y){
                setGameOver(true);
                document.getElementById("start").style.display = "block";
            }
        }
        if (head.x < 0 || head.x > 63 || head.y < 0 || head.y > 35) {
            setGameOver(true);
            document.getElementById("start").style.display = "block";
        }
        
        const newSnakeDot = [...snakeDot];
        switch (direction) {
            case 'right':
                newSnakeDot.unshift({ x: snakeDot[0].x + 1, y: snakeDot[0].y });
                break;
            case 'left':
                newSnakeDot.unshift({ x: snakeDot[0].x - 1, y: snakeDot[0].y });
                break;
            case 'up':
                newSnakeDot.unshift({ x: snakeDot[0].x, y: snakeDot[0].y - 1 });
                break;
            case 'down':
                newSnakeDot.unshift({ x: snakeDot[0].x, y: snakeDot[0].y + 1 });
                break;
        }
        newSnakeDot.pop();
        setSnakeDot(newSnakeDot);
    }, [direction, internalClock]);

    useEffect(() => {
        if (eaten === true) {
            setScore(score => score + 1);
            const newSnakeDot = [...snakeDot];
            switch (direction) {
                case 'right':
                    newSnakeDot.unshift({ x: snakeDot[0].x + 1, y: snakeDot[0].y });
                    break;
                case 'left':
                    newSnakeDot.unshift({ x: snakeDot[0].x - 1, y: snakeDot[0].y });
                    break;
                case 'up':
                    newSnakeDot.unshift({ x: snakeDot[0].x, y: snakeDot[0].y - 1 });
                    break;
                case 'down':
                    newSnakeDot.unshift({ x: snakeDot[0].x, y: snakeDot[0].y + 1 });
                    break;
            }
            setSnakeDot(newSnakeDot);
        }
    }, [eaten]);


    return <div>
        {snakeDot.map(
            dot => <div
                key={dot.x + '-' + dot.y}
                className={css.snakeDot}
                style={{
                    left: `${dot.x * 10}px`,
                    top: `${dot.y * 10}px`,
                    backgroundColor: 'green',
                    width: '10px',
                    height: '10px',
                    position: 'absolute'
                }}
            />
        )}
        {render}
    </div>;
}
