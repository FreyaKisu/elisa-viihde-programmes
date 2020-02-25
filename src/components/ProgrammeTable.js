import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import logo from "../assets/elisaviihde.png";

function ProgrammeTable() {
  const [data, setData] = useState({
    schedule: [],
    filterString: ""
  });
  const FetchData = async setData => {
    const result = await axios(
      "https://rest-api.elisaviihde.fi/rest/epg/schedule/live"
    );
    setData({
      ...data,
      schedule: result.data.schedule
    });
  };

  if (data.schedule.length === 0) {
    FetchData(setData);
  }

  const handleFilter = schedule => {
    return data.filterString
      ? schedule.filter(row => {
          const textChunk = row.name + " " + row.channel.name;
          return textChunk
            .toLowerCase()
            .includes(data.filterString.toLowerCase());
        })
      : schedule;
  };

  const handleFilterValue = e => {
    setData({
      ...data,
      filterString: e.target.value
    });
  };

  const shedule = data.schedule.map(row => row.programs).flat();

  return (
    <TableWrapper>
      <div>
        <HeaderWrapper>
          <img src={logo} alt="Elisa Viihde" />
          <h1 id="title">Live Programmes</h1>
        </HeaderWrapper>

        <Filter placeholder="Search channel or programme" onChange={handleFilterValue} />

        <div className="divTable">
          <div className="divTableRow">
            <div className="divTableHead">
              <div className="divTableHeading">Channel</div>
            </div>
            <div className="divTableHead">
              <div className="divTableHeading">Live Programme</div>
            </div>
            <div className="divTableHead">
              <div className="divTableHeading">Start</div>
            </div>
            <div className="divTableHead">
              <div className="divTableHeading">End</div>
            </div>
            <div className="divTableHead">
              <div className="divTableHeading">Length (minutes)</div>
            </div>
          </div>
          {handleFilter(shedule).map((row, key) => (
            <div key={key} className="divTableRow">
              <div className="divTableCell"> {row.channel.name} </div>
              <div className="divTableCell"> {row.name} </div>
              <div className="divTableCell">
                {" "}
                {row.startTime.split(" ")[1]}{" "}
              </div>
              <div className="divTableCell"> {row.endTime.split(" ")[1]} </div>
              <div className="divTableCell"> {row.lengthMinutes} </div>
            </div>
          ))}
        </div>
      </div>
    </TableWrapper>
  );
}

export default ProgrammeTable;

const TableWrapper = styled.div`
  padding: 1rem;

  .divTable {
    display: table;
    width: 100%;
  }
  .divTableRow {
    display: table-row;
    &:nth-child(odd) {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .divTableCell,
  .divTableHead {
    border: 1px solid #999999;
    display: table-cell;
    padding: 3px 10px;
  }
  .divTableHeading {
    background-color: #eee;
    display: table-header-group;
    font-weight: bold;
    color: #0068f0;
    background-color: #fff;
  }

  .divTableHead {
    background-color: #fff;
  }
  .divTableFoot {
    background-color: #eee;
    display: table-footer-group;
    font-weight: bold;
  }
  .divTableBody {
    display: table-row-group;
  }
`;

const HeaderWrapper = styled.div`
  background-color: #001bb6;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  opacity: 0.9;
`;

const Filter = styled.input`
  width: 100%;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
