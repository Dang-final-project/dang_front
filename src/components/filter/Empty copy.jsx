import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Brand from './Brand';
const arr = [
    "티비유",
    "투루차저(휴맥스EV)",
    "나이스차저(한국전자금융)",
    "딜라이브",
    "서울시",
    "스타코프",
    "유니이브이"
]
const Empty = () => {
    return ( 
        <Card variant="outlined" sx={{
            display: 'flex',
            width: '50%',
            flexWrap: 'wrap'}}>
            <CardContent>
                {arr.map(c=> (
                    <Brand name={c} />
                ))}
            </CardContent>
        </Card>
    );
}
export default Empty;