import styled, { css } from 'styled-components';
import Select from 'react-select';
import classNames from 'classnames';
import { useRef } from 'react';
import palette from '../../lib/styles/palette';

const MyDropdown = styled(Select)`
  font-size: 12px;
  line-height: 16px;
  .react-select__control {
    border-color: transparent;
    border-radius: 6px;
    min-height: 32px;
    cursor: pointer;
    &.focus,
    &:focus {
      border-color: ${palette.indigo[3]};
      box-shadow: none;
      .react-select__indicator {
        transform: rotate(180deg);
        padding: 0 8px;
      }
    }
    &:hover {
      border-color: ${palette.indigo[3]};
    }

    .react-select__indicator {
      transform: rotate(0);
      transition: all 0.5s;
      padding: 0 8px;
      color: ${palette.indigo[5]};
    }
    .react-select__value-container {
      padding-right: 0;
    }
    .react-select__single-value {
      color: ${palette.gray[7]};
    }

    ${(props) =>
      props.$hasBg &&
      css`
        background: ${palette.indigo[0]};
      `}
  }
  .react-select__menu {
    .react-select__option {
      cursor: pointer;
      &.focus.active,
      &.active {
        background-color: ${palette.indigo[4]};
      }

      &.focus {
        background-color: ${palette.indigo[1]};
      }
    }
  }
`;

export default function Dropdown({ options, handleChange, hasBg }) {
  const selectRef = useRef(null);

  function removeFocus() {
    if (selectRef.current) {
      selectRef.current.blur(); // 포커스 제거
    }
  }
  return (
    <MyDropdown
      options={options}
      // placeholder={options[0].label}
      defaultValue={options[0]}
      onChange={handleChange}
      $hasBg={hasBg}
      isSearchable={false}
      classNamePrefix="react-select"
      components={{
        IndicatorSeparator: () => null,
      }}
      classNames={{
        control: ({ isFocused }) => classNames(isFocused ? 'focus' : ''),
        option: ({ isSelected, isFocused }) =>
          classNames(isSelected ? 'active' : '', isFocused ? 'focus' : ''),
      }}
      ref={selectRef}
      onMenuClose={removeFocus}
    />
  );
}
