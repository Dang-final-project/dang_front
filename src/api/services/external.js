import api from "../api";

export const externalApi = {
    getAllStation: (count, pageIdx, filterList={}) => {
        let filter = '';
        const params = {
            serviceKey: process.env.REACT_APP_STATION_API_KEY,
            type: 'json',
            numOfRows: count,
            pageNo: pageIdx,
        }
        console.log(filterList);
        // https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist?
        // serviceKey=KE8fpP1J%2B89PviF5ypn1iC2Pt13cnUqW7zS6rTyC01AY5TnWK7Ke2zgCzNUU8TF3zQyZiEr6YfRfclI79xarRg%3D%3D
        // &type=json
        // sortKey=chrstnType&filterKey=charger_status&filterValues=2&numOfRows=10&pageNo=0
        if (JSON.stringify(filterList) !== '{}') {
            filter += '?'
            // sortKey: 'chrstnType',
            // filterKey: "charger_status",
            // filterValues: 2
            Object.entries(filterList)
            .filter(([key, value]) => value !== undefined && value !== null && value !== "")
            .forEach(([key, value]) => {
                filter += `filterKey=${key}&filterValues=${value.replaceAll('+','%2B')}&`;
                // params['filterKey'] = key
                // params['filterValues'] = value
            })
        }
        return api.get(`https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist${filter}`, {params})
    },
    getFavStation: (likeStations,pageIdx,count) => {
        const params = {
            serviceKey: process.env.REACT_APP_STATION_API_KEY,
            type: 'json',
            sortKey: 'chrstnType',
            filterKey: 'chrstn_id',
            filterValues: likeStations,
            numOfRows: count,
            pageNo: pageIdx
        }
        return api.get('https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist', {params})
    }
}