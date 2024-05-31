import { externalApi } from "../../../api/services/external";

export const GetStations = async (filterList, setPositionArr, setStations, idx = 0) => {
    console.log(idx);
    try {
        const pageIdx = idx;
        const count = 10;
        const response = await externalApi.getAllStation(count, pageIdx, filterList)
        if (response.status === 200) {
            const results = [];
            if (typeof(response.data) === 'object') {
                response.data.items.forEach((item) => {
                    const cur_lat = item.latitude;
                    const cur_lng = item.longtitude;
                    const ex_item = results.find((r) => r.latitude === cur_lat && r.longtitude === cur_lng);
                    if (!ex_item) {
                        //충전소 상태 체크(2는 사용중)
                        if (item.charger_status === "2") {
                            item.avail_count = 1;
                        } else {
                            item.avail_count = 0;
                        }
                        item.tot_count = 1;
                        results.push(item);
                    } else {
                        if (item.charger_status === "2") {
                            ex_item.avail_count += 1;
                        }
                        ex_item.tot_count += 1;
                    }
                });
                const arr = [];
                results.forEach((r) => {
                    //console.log(r)
                    const p = { title: r.chrstnNm, latlng: { lat: r.latitude, lng: r.longitude } };
                    arr.push(p);
                });
                setPositionArr(arr);
                // 현재 filterList를 이전 filterList로 업데이트
                if(idx == 0){
                    setStations(results)
                }else {
                    setStations((prev) => prev.concat(results));
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
};
