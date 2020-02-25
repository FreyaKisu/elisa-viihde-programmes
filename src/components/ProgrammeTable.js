import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable, useSortBy, useFilters, useColumnOrder } from "react-table";
import { motion, AnimatePresence } from "framer-motion";
import matchSorter from "match-sorter";
import axios from "axios";

const TableWrapper = styled.div`
  padding: 1rem;

  .divTable {
    display: table;
    width: 100%;
  }
  .divTableRow {
    display: table-row;
  }
  .divTableHeading {
    background-color: #eee;
    display: table-header-group;
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

const FetchData = async setData => {
  const result = await axios(
    "https://rest-api.elisaviihde.fi/rest/epg/schedule/live"
  );
  setData({
    schedule: result.data.schedule
  });
};

function ProgrammeTable() {
  const [data, setData] = useState({
    schedule: []
  });
  if (data.schedule.length === 0) {
    FetchData(setData);
  }

  console.log(data);

  return (
    <TableWrapper>
      <div>
        <h1 id="title">Live Programmes</h1>
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
          <div className="divTableHeading">Length</div>
        </div>
        {data.schedule.map(column =>
          column.programs.map((column, key) => (
            <div key={key}>
              <div className="divTable">
                <div className="divTableBody">
                  <div className="divTableRow">
                    <div className="divTableCell"> {column.channel.name} </div>
                    <div className="divTableCell"> {column.name} </div>
                    <div className="divTableCell"> {column.startTime} </div>
                    <div className="divTableCell"> {column.endTime} </div>
                    <div className="divTableCell"> {column.length} </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </TableWrapper>
  );
}

export default ProgrammeTable;
