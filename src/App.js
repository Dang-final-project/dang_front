import "./App.css";
import BasicPopup from "./components/popup/BasicPopup";
import ContentsPopup from "./components/popup/ContentsPopup";
import SelectPopup from "./components/popup/SelectPopup";

function App() {
    return (
        <div>
            <BasicPopup>예약</BasicPopup>
            <ContentsPopup></ContentsPopup>
            <SelectPopup title="예약하시겠습니까?">
                <textarea></textarea>
            </SelectPopup>
        </div>
    );
}

export default App;
