import { externalApi } from "../../../api/services/external";

export const GetStations = async (filterList, setPositionArr, setStations, idx = 0) => {
    console.log(idx);
    try {
        const pageIdx = idx;
        const count = 30;
        const response = await externalApi.getAllStation(count, pageIdx, filterList)
        console.log(response);
        if (response.status === 200) {
            if (response.data.totalCount === 0) {
                alert('조건에 맞는 충전소가 없습니다.')
                throw new Error('데이터 없음');
            }
            const results = [];
            if (typeof response.data === 'object') {
                const responseList = response.data.items;
                responseList.forEach((item) => {
                    const { latitude, longitude, charger_status, chrstn_id } = item;
                    const exItem = results.find((r) => r.latitude === latitude && r.longitude === longitude);

                    if (!exItem) {
                        item.avail_count = charger_status === "2" ? 1 : 0;
                        item.tot_count = 1;
                        results.push(item);
                    } else {
                        exItem.avail_count += charger_status === "2" ? 1 : 0;
                        exItem.tot_count += 1;
                    }
                });

                const resultsArr = Object.values(results.reduce((acc, item) => {
                    if (!acc[item.chrstn_id]) {
                        acc[item.chrstn_id] = { ...item };
                    } else {
                        acc[item.chrstn_id].avail_count += item.avail_count;
                    }
                    return acc;
                }, {}));
                console.log(resultsArr)
                const arr = resultsArr.map((r) => ({
                    title: r.chrstnNm,
                    latlng: { lat: r.latitude, lng: r.longitude }
                }));

                setPositionArr(arr);

                if (idx === 0) {
                    setStations(resultsArr);
                } else {
                    setStations((prev) => prev.concat(resultsArr));
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
};
