import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataDispatchContext } from "../App";


const DataItem = ({id, date, time}) => {
    const {onRemove} = useContext(DataDispatchContext);
    const navigate = useNavigate();
    const handleRemove = useCallback(() => {
        if(window.confirm("삭제하시겠습니까?")){
            onRemove(id);
            navigate(0);
        }else{
            return;
        }
    }, [])
    return(
        <div className="studyItem">
            <div className="infoWrapper">
                <div className="studyDate">
                    {`${new Date(date).getMonth()}월 ${new Date(date).getDate()}일`}
                </div>
                <div className="studyTime">
                    {`${parseInt(time/3600)} : ${parseInt((time%3600)/60)} : ${parseInt(time%60)}`}
                </div>
            </div>
            <div className="btnWrapper">
                <button onClick={handleRemove}>삭제하기</button>
            </div>
        </div>
    )
}

export default DataItem;