import React, { useCallback, useContext, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataDispatchContext } from './App';
import Button from './componants/Button';

const musicList = [
    {name: "test1", value:"test1.mp3"},
    {name: "test2", value:"test2.mp3"},
    {name: "test3", value:"test3.mp3"}
]

const SelectMusic = React.memo(({optionList, onChange, value}) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)} >
            {optionList.map((it, idx) => <option value={it.value} key={idx}>{it.name}</option>)}
        </select>
    )
});



const StartStudy = () => {

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true)
    const [time, setTime] = useState(0);
    const [music, setMusic] = useState("test1.mp3");
    const audioRef = useRef();
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
        onCreate(time, date);
        navigate("/", {replace:true});
    },[time]);

    const handleMusic = useCallback((value) => {
        const audio = document.getElementById("audio")
        setMusic(value);
        audio.load();
        audio.oncanplaythrough = () =>{
            audio.play()
        }
    }, []);

    return (
        <>
        <div className="studyEditor">
            <section>
                <h4>????????????</h4>
                    <div>
                    <SelectMusic value={music} onChange={handleMusic} optionList={musicList} />
                    </div> 
                    <br/>
                    <div>
                        <audio src={process.env.PUBLIC_URL + `/assets/bgm/${music}`} loop controls id="audio"></audio>
                       
                    </div>
            </section>
            <section>
                <h4>????????????</h4>
                <div style={{fontSize: '200px'}}>
        <span>{parseInt(time/3600)}</span>:<span>{parseInt((time%3600)/60)}</span>:<span>{parseInt(time%60)}</span>
      </div>
      
      <button onClick={handleStart} disabled={isActive ? "disabled" : ""} className="Button Button_positive">Start</button>
  
      
      <button onClick={handlePauseResume} className="Button Button_default">{isPaused ? "Resume" : "Pause"}</button>


      <Button onClick={handleReset} text={"Reset"} type={"negative"} />
            </section>
            <Button text={"????????????"} type={"positive"} onClick={handleCreate} />
    </div>

    </>
    );
};

export default StartStudy;