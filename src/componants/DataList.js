import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DataItem from "./DataItem";

const optionList = [
    {
    value: "latest",
    name: "최신순"
},
{
    value: "oldest",
    name: "오래된 순"
}]

const SortMenu = ({optionList, onChange, value}) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)} >
            {optionList.map((it,idx) => <option key={idx} value={it.value}>{it.name}</option>)}

        </select>
    )
}

const DataList = ({dataList}) => {
    const [sort, setSort] = useState("latest");
    const navigate = useNavigate();
    const getSortedDataList = useMemo(() => {
        if(sort === "latest"){
            return dataList.sort((a, b) => parseInt(b.date) - parseInt(a.date));
        }else{
            return dataList.sort((a, b) => parseInt(a.date) - parseInt(b.date));
        }
    }, [sort, dataList]);  
    
    return (
        <div className="studyList">
            <div className="menuWrapper">
                <div className="leftCol">
                <SortMenu value={sort} onChange={setSort} optionList={optionList} />
                </div>
                <div className="rightCol">
                    <Button type={"positive"} text={"공부 시작하기"} onClick={() => {navigate("/start_study")}} />
                </div>
               
                
            </div>
            {getSortedDataList.map((it) => <DataItem key={it.id} id={it.id} date={it.date} time={it.time} />)}
        </div>
    )
}

export default DataList;