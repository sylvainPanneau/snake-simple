import React, { useState, useEffect } from 'react';
import css from './App.css';

export default function Food({ head }) {
    const [food, setFood] = useState([{ x: 0, y: 0 }]);
    const [eaten, setEaten] = useState(false);

    useEffect(() => {
        const newFood = [...food];
        let x = Math.floor(Math.random() * 20);
        let y = Math.floor(Math.random() * 20);
        newFood.pop();
        newFood.unshift({ x, y });
        setFood(newFood);
        setEaten(false);
    }, [eaten]);

    return {
        eaten,
        render: (
            <div>
                {food.map(
                    dot => <div
                        key={dot.x + '-' + dot.y}
                        className={css.food}
                        style={{
                            left: `${dot.x * 10}px`,
                            top: `${dot.y * 10}px`,
                            backgroundColor: 'red',
                            width: '10px',
                            height: '10px',
                            position: 'absolute',
                        }}
                    />
                )}
                {head.x === food[0].x && head.y === food[0].y && !eaten && setEaten(true)}
            </div>
        )
    }
}
