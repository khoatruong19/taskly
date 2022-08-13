import { Moment } from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import styled from 'styled-components';

interface IProps {
  onChange: (value: Moment) => void;
  value: Moment;
}

const DeliTimePicker = ({ onChange, value }: IProps) => (
  <TimePicker
    showSecond={false}
    onChange={onChange}
    hideDisabledOptions
    minuteStep={5}
    value={value}
    use12Hours
  />
);

const TimeSelector = styled(DeliTimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    background-color: #edeffe;
    font-weight: normal;
  }

  & .rc-time-picker-clear,
  & .rc-time-picker-clear-icon:after {
    font-size: 15px;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input,
  & .rc-time-picker-panel-input {
    font-family: 'Consolas', sans-serif;
    font-size: 16px;
    cursor: pointer;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

export default TimeSelector;
