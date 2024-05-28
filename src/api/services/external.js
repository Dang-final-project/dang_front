import api from "../api";

export const externalApi = {
    getAllStation: (count, pageIdx, filterList) => {
        const params = {
            serviceKey: process.env.REACT_APP_STATION_API_KEY,
            type: 'json',
            numOfRows: count,
            pageNo: pageIdx
        }
        if (JSON.stringify(filterList) !== '{}') {
            params['sortKey'] = 'chrstnType';
            Object.entries(filterList)
            .filter(([key, value]) => value !== undefined && value !== null && value !== "")
            .forEach(([key, value]) => params[key] = value)

        }
        return api.get('https://apis.data.go.kr/3740000/suwonEvChrstn/getdatalist', {params})
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