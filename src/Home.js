import { useCallback, useContext, useEffect, useState } from "react";
import { DataStateContext } from "./App";
import Button from "./componants/Button";
import Header from "./componants/Hedear";
import DataList from "./componants/DataList";

const Home = () => {
    const dataList = useContext(DataStateContext);
    const [month, setMonth] = useState(new Date());
    const [data, setData] = useState([]);
    const headerText = `${month.getFullYear()}년 ${month.getMonth() + 1}`;
    useEffect(() => {
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getTime();
        const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59).getTime();
        setData(dataList.filter((it) => parseInt(firstDay) <= parseInt(it.date) && parseInt(it.date) <= parseInt(lastDay)));
    }, [dataList, month]);

    const increaseMonth = useCallback(() => {
        setMonth(new Date(month.getFullYear(), month.getMonth + 1));
    }, [month]);

    const decreaseMonth = useCallback(() => {
        setMonth(new Date(month.getFullYear(), month.getMonth - 1));
    }, [month]);

    return (
        <>
        <Header leftChild={<Button type={"default"} text={"<"} onClick={decreaseMonth} />}headText={headerText} rightChild={<Button type={"default"} text={">"} onClick={increaseMonth}/>}/>
        <DataList  dataList={data} />
        </>
    );
};

export default Home;