import { externalApi } from "../../../api/services/external";

export const GetStations = async (filterList, setPositionArr, setStations, stationIdx) => {
    try {
        const response = await externalApi.getAllStation(60, stationIdx, filterList);
        
        if (response.status === 200 && typeof(response.data) === 'object') {
            const resultsMap = new Map();

            response.data.items.forEach((item) => {
                const { latitude, longtitude, charger_status } = item;
                const key = `${latitude},${longtitude}`;

                //충전소 상태 체크(2는 사용중)
                if (!resultsMap.has(key)) {
                    item.avail_count = (charger_status === "2") ? 1 : 0;
                    item.tot_count = 1;
                    resultsMap.set(key, item);
                } else {
                    const existingItem = resultsMap.get(key);
                    if (charger_status === "2") {
                        existingItem.avail_count += 1;
                    }
                    existingItem.tot_count += 1;
                }
            });

            const results = Array.from(resultsMap.values());
            const arr = results.map((r) => ({
                title: r.chrstnNm,
                latlng: { lat: r.latitude, lng: r.longtitude },
                available: r.tot_count > r.avail_count
            }));

            setPositionArr(arr);
            setStations(results);
        }
    } catch (err) {
        console.error(err);
    }
};