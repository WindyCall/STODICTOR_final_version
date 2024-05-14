import styled, { css } from "styled-components";

export const ContainerBig = styled.div`
  /* margin: 0px auto; */
  max-width: 100px;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainerBig = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 400px;
`;

export const BarChartContainerBig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

// this width for bar width
export const Chart = css`
  margin-top: 10px;
  width: 23px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    width: 34px;
  }
`;

// font-size for number size
export const NumberBig = styled.span`
  font-size: 0.8em;
  text-align: center;
  color: ${(props) => props.color};
`;

export const MakeBarBig = styled.div`
  height: ${(props) => props.height}%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  ${Chart};
`;

export const BlackLineBig = styled.div`
  width: 1065px;
  height: 5px;
  background-color: grey;
`;
