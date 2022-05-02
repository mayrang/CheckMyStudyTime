import { useEffect, useState} from 'react';

const StartStudy = () => {

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true)
    const [time, setTime] = useState(0);

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
      <button onClick={handleReset}>Reset</button>
            </section>
            <button onClick={()=>{console.log(time)}} >콘솔</button>
        </div>
    );
};

export default StartStudy;