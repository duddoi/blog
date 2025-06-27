import styled, { css } from 'styled-components';
// import palette from '../../lib/styles/palette';
import Select from 'react-select';

const MyDropdown = styled(Select)`
  width: auto;
  display: block;
  border-radius: 4px;
  font-size: 12px;
  line-height: 18px;
  ${(props) =>
    props.$nonLine &&
    css`
      .css-13cymwt-control {
        border: none;
      }
      .css-1u9des2-indicatorSeparator {
        display: none;
      }
    `}
`;

export default function Dropdown({ options, handleChange, nonLine }) {
  return (
    <MyDropdown
      options={options}
      placeholder={options[0].label}
      onChange={handleChange}
      $nonLine={nonLine}
    />
  );
}
