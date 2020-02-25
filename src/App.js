import React from "react";
import Programme from "./views/Programme";
import styled from "styled-components";

const AppWrapper = styled.div`


h1{
  padding: 20px;
}

img{
  height: 100%;
}

.TableWrapper {
  width: auto 0;
}

`
function App() {
  return (
    <AppWrapper>
      <Programme />
    </AppWrapper>
  );
}

export default App;
