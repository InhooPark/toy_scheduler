import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Time from "./Time";
import Schedule from "./Schedule";

function App() {
  const timeArr = Array.apply(null, new Array(24));
  const [scheduleArr, setScheduleArr] = useState([null]);
  const [modal, setModal] = useState(false);
  const inputRef = useRef();

  function add(e) {
    e.preventDefault();

    if (e.target.title.value === "") {
      alert("값을 입력해주세요");
      return;
    }
    if (scheduleArr.includes(e.target.title.value)) {
      alert("중복된 값이 있습니다.");
      return;
    }

    setScheduleArr([...scheduleArr, e.target.title.value]);
    e.target.reset();
    setModal(false);
  }
  function createSchedule() {
    if (scheduleArr.length > 10) {
      alert("일정이 너무 많습니다!");
      return;
    }
    setModal(!modal);
  }

  useEffect(() => {
    let schedule = localStorage.getItem("Schedule");
    if (schedule === null || schedule === undefined || schedule === "") {
      localStorage.setItem("Schedule", []);
    } else {
      setScheduleArr(schedule.split(","));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Schedule", scheduleArr);
  }, [scheduleArr]);
  return (
    <>
      <header className="header">
        <h1> Today Scheduler </h1>
        <div className="addBtn">
          <button type="button" onClick={createSchedule}>
            Add schedule
          </button>
        </div>
      </header>
      <main className="main">
        <div className="time_wrap">
          <ul className="timeUL">
            {timeArr.map((time, index) => {
              return <Time index={index} key={index} />;
            })}
          </ul>
        </div>

        <div className="schedule">
          <ul>
            {scheduleArr.map((schedule, index) => {
              return index !== 0 ? <Schedule schedule={schedule} key={index} index={index} /> : <span key={index}></span>;
            })}
          </ul>
        </div>

        <div className={modal ? "modal on" : "modal"}>
          <form onSubmit={add}>
            <input ref={inputRef} name="title" type="text" placeholder="일정 입력" maxLength={10} />
            <div className="btn_wrap">
              <input type="submit" value={"작성"} />
              <input type="reset" value={"취소"} onClick={() => setModal(false)} />
            </div>
          </form>
        </div>
      </main>
      <footer className="footer">
        <p>Copyright 2023. PIH</p>
      </footer>
    </>
  );
}

export default App;
