

const DataItem = ({id, date, time}) => {

    return(
        <div className="studyItem">
            <div className="infoWrapper">
                <div className="studyDate">
                    {`${date.getMonth()}월 ${date.getDate()}일`}
                </div>
                <div className="studyTime">
                    {`${parseInt(time/3600)} : ${parseInt((time%3600)/60)} : ${parseInt(time%60)}`}
                </div>
            </div>
        </div>
    )
}

export default DataItem;