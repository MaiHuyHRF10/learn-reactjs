import React, { useState } from 'react';

Counter.propTypes = {

};

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            {count}

            <button onClick={() => setCount(x => x + 1)}>Increast</button>
        </div>
    );
}

export default Counter;