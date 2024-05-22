import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarAPI = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.odcloud.kr/api/15039549/v1/uddi:aacd2890-94b3-4645-baba-da7f3561e83d_202004141517?page=1&perPage=20&serviceKey=4B1nW8qD9IBn0d7dknKCzNYFxKNer4bSpWUpGZ8VhpFr9XZ14V8xXcF9vAd0my6td3TGf47WXnmmtYH2V3JV3Q%3D%3D');
                console.log('API Response', response.data);

                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                        <div key={index} style={{
                            border: '1px solid #ccc',
                            padding: '3vh',
                            marginBottom: '3vh',
                            width: '100%',
                            height: '26vh',
                            alignItems: 'center',
                            borderRadius: '8px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                        }}>
                            <strong>모델명: {item.모델명}</strong>
                            <p>제조사: {item.제조사}</p>
                            <p>급속충전방식: {item.급속충전방식}</p>
                            <p>완속충전방식: {item.완속충전방식}</p>
                            <p>배터리용량: {item.배터리용량}</p>
                            <p>출시일: {item.출시일}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};


export default CarAPI;