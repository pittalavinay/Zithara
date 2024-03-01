import React, { useState, useEffect } from 'react';
import { Pagination } from './Pagination';
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

function Info() {
  const [data, setData] = useState([]);
  const [per, setPer] = useState([]);
  const [time, setTime] = useState(new Date());
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setPer(jsonData.slice(0, 20));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const pageHandler = (pageNumber) => {
    setPer(data.slice((pageNumber * 20) - 20, pageNumber * 20));
  };

  const convertDate = (dateStr) => {
    const parts = dateStr.split('/');
    const year = parts[2];
    const month = "0" + parts[0];
    const day = parts[1];
    return `${year}-${month}-${day}`;
  };

  const separateDateAndTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split(' ');
    return { date, time };
  };

  const processedData = per.map(item => {
    const { date, time } = separateDateAndTime(item.created_at);
    return { ...item, date, time };
  });

  const originalDate = time.toLocaleDateString().toLowerCase();
  const convertedDate = convertDate(originalDate);
  const filteredDatetime = processedData.filter(val => {
    const isDateTimeMatch =  val.time.toLowerCase().includes(time.toLocaleTimeString([], { hour12: false }).toLowerCase()) ||  val.date.toLowerCase().includes(convertedDate.toLocaleLowerCase());
    return isDateTimeMatch;
  });

  const filteredData = processedData.filter(val => {
    const isSearchMatch = val.customername.toLowerCase().includes(search.toLowerCase()) || val.locations.toLowerCase().includes(search.toLowerCase());
    return isSearchMatch;
  });

  const dataToRender = filteredDatetime.length > 0 ? filteredDatetime : filteredData;

  return (
    <div >
      <nav className='na'>
        <input type="text" placeholder="SEARCH FOR LOCATIONS AND CUSTOMERNAME" className="in" value={search} onChange={(e) => setSearch(e.target.value)} />
      </nav>
      <div className='dat'>
        <DateTimePicker className="datetimepic" format="yyyy-MM-dd HH:mm:ss" onChange={setTime} value={time} />
        <button className='bt1' onClick={() => setTime(new Date())}>Reset</button>
      </div>
      <div >
        <div className="box">
          <div class="container ">
            <table class="table table-dark table-hover">
              <thead>
                <tr style={{ color: "white", fontSize: "18px", background: "rgb(255, 140, 0,0.5)", height: "70px" }}>
                  <th>SNO</th>
                  <th>USERNAME</th>
                  <th>AGE</th>
                  <th>PHONENUMBER</th>
                  <th>LOCATION</th>
                  <th> TIME</th>
                  <th style={{ paddingLeft: "30px" }}>DATE </th>
                  <th>DATA</th>
                </tr>
              </thead>
              <tbody>
                {dataToRender.map((item) =>
                  <tr>
                    <th>{item.sno}</th>
                    <td>{item.customername}</td>
                    <td >{item.age}</td>
                    <td >{item.phone}</td>
                    <td>{item.locations}</td>
                    <td>{item.time}</td>
                    <td>{item.date}</td>
                    <td>{item.data}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination data={data} pagehandler={pageHandler} />
    </div>
  );
}

export default Info;
