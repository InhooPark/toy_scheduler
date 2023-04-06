import React, { useCallback, useEffect, useState } from "react";

const Schedule = ({ schedule, index }) => {
  const scheduleTimeArr = Array.apply(null, new Array(72));
  scheduleTimeArr.fill("false");
  const [arr, setArr] = useState(scheduleTimeArr);

  function getTimeBlock() {
    const timeblock = localStorage.getItem(schedule);
    setArr(timeblock.split(","));
  }
  function timeBlockClick(key) {
    const timeblock = localStorage.getItem(schedule).split(",");
    if (timeblock[key] === "true") timeblock[key] = "false";
    else timeblock[key] = "true";
    localStorage.setItem(schedule, timeblock);

    getTimeBlock();
  }
  function deleteSchedule() {
    const schedules = localStorage.getItem("Schedule");
    const result = schedules.split(",").filter((v) => v !== schedule);

    localStorage.setItem("Schedule", result.toString());
    localStorage.removeItem(schedule);

    window.location.reload();
  }

  useEffect(() => {
    const timeblock = localStorage.getItem(schedule);
    if (timeblock === null || timeblock === undefined) {
      localStorage.setItem(schedule, arr.toString());
    } else {
      setArr(timeblock.split(","));
    }
  }, []);

  return (
    <li>
      <p className="delete" onClick={deleteSchedule}>
        X
      </p>
      <p className="title">{schedule}</p>
      <ul className="timeblock_wrap">
        {arr &&
          arr.map((timeblock, key) => {
            return timeblock === "true" ? (
              <li className="timeblockCheck" key={key} onClick={() => timeBlockClick(key)}></li>
            ) : (
              <li className="timeblock" key={key} onClick={() => timeBlockClick(key)}></li>
            );
          })}
      </ul>
    </li>
  );
};

export default Schedule;
