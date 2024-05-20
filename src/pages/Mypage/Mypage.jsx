import React, { useState, useEffect } from 'react';

const Mypage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/assist/common/carzen/CarAllInfoInquiry', {
            method: 'POST',
            headers: {
                'Authorization': '토큰적어주기',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                REGINUMBER: '23사5678',
                OWNERNAME: '홍길동'
            })
        })
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            {data ? (
                <div>
                    <h1>{data.CARVENDER}</h1>
                    <p>{data.CARNAME}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Mypage;
