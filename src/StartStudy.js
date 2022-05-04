import { useCallback, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataDispatchContext } from './App';
import Button from './componants/Button';

// const musicList = [
//     {name: "리스항구", src: process.env.PUBLIC_URL + "/assets/bgm/AboveTheTreetops.mp3"},
//     {name: "루디브리엄", src: process.env.PUBLIC_URL + "/assets/bgm/FantasticThinking.mp3"},

// ]

// const SelectMusic = () => {
    
// }


const StartStudy = () => {

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true)
    const [time, setTime] = useState(0);
    const {onCreate} = useContext(DataDispatchContext);
    const navigate = useNavigate();

    

    useEffect(() => {
        let interval = null;
        if(isActive&&isPaused===false){
            interval = setInterval(() => {
                setTime((time) => time + 1)
            }, 1000);
        }else{
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        }
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    const handleCreate = useCallback(() => {
        const date = new Date().getTime();
        console.log(date);
        onCreate(time, date);
        navigate("/", {replace:true});
    },[time]);
    
    return (
        <div className="studyEditor">
            <section>
                <h4>음악재생</h4>
            </section>
            <section>
                <h4>공부시간</h4>
                <div style={{fontSize: '200px'}}>
        <span>{parseInt(time/3600)}</span>:<span>{parseInt((time%3600)/60)}</span>:<span>{parseInt(time%60)}</span>
      </div>
      
      <button onClick={handleStart} disabled={isActive ? "disabled" : ""}>Start</button>
      <button onClick={handlePauseResume}>{isPaused ? "Resume" : "Pause"}</button>
      <Button onClick={handleReset} text={"Reset"} type={"negative"} />
            </section>
            <Button text={"저장하기"} type={"positive"} onClick={handleCreate} />
        </div>
    );
};

export default StartStudy;