import axios from "axios";

export const GetStations = async (filterList, setPositionArr, setStations) => {
    const handleFilter = (obj) => {
        return Object.entries(obj)
            .filter(([key, value]) => value !== undefined && value !== null && value !== "")
            .map(([key, value]) => `filterKey=${key}&filterValues=${value}`)
            .join("&");
    };

    let filterQuery = handleFilter(filterList);

    try {
        const key = process.env.REACT_APP_STATION_API_KEY;
        if (!key) {
            throw new Error("API key 없음");
        }
        const pageIdx = 0;
        const count = 30;
        let url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&numOfRows=${count}&pageNo=${pageIdx}`;
        //필터검색
        if (filterQuery !== "") {
            url = `https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?serviceKey=${key}&type=json&sortKey=chrstnType&${filterQuery}&numOfRows=${count}&pageNo=${pageIdx}`;
            console.log(url);
        }
        const response = await axios.get(url);
        if (response.status === 200) {
            const results = [];
            response.data.items?.forEach((item) => {
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
            console.log(results);
            const arr = [];
            results.forEach((r) => {
                //console.log(r)
                const p = { title: r.chrstnNm, fav: false, latlng: { lat: r.latitude, lng: r.longitude } };
                arr.push(p);
            });
            setPositionArr(arr);
            setStations(results);
        }
    } catch (err) {
        console.error(err);
        alert("결과값이 없습니다.");
    }
};
