import moment, { Moment } from 'moment';
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { yellowColor } from '../../constants';
import { WeeklyTask } from '../../generated/graphql';
import { TaskFormData } from '../../types/TaskFormData';
import { convertDayToDate, convertTimeToMomentValue } from '../../utils/date';
import { FDayTask } from '../layout/home/TodaySchedule';
import Calendar from './Calendar';
import EmojiPicker from './EmojiPicker';
import FormButton from './FormButton';
import TimeSelector from './TimeSelector';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & > div:nth-child(3) {
    width: max-content;
  }

  & > div:last-child {
    flex-direction: row;
    align-items: center;
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    font-size: 1.2rem;
    font-weight: 600;
  }

  input,
  textarea {
    outline: none;
    border-radius: 10px;
    background-color: white;
    padding: 1rem;
    border: 1px solid ${yellowColor};

    &:focus {
      border: 2px solid ${yellowColor};
    }
  }

  textarea {
    min-height: 6rem;
  }
`;

interface IProps {
  handleSubmit: (data: TaskFormData) => void;
  taskData: Omit<WeeklyTask, 'userId'> | null | FDayTask;
  type: 'weekly' | 'daily';
  day?: string;
}

const TaskForm = ({ taskData, handleSubmit, type, day }: IProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>((day && new Date(day)) || new Date());
  const [time, setTime] = useState<Moment>(moment());
  const [icon, setIcon] = useState('⭐');

  const handleChangeTimeValue = (value: Moment) => {
    setTime(value);
  };

  const handleSelectDate = (value: Date) => {
    setDate(value);
  };

  const handleSelectIcon = (value: string) => {
    setIcon(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ title, description, date, time, icon });
  };

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setDescription(taskData.description);
      if (Object.prototype.hasOwnProperty.call(taskData, 'date'))
        setDate(
          convertDayToDate((taskData as Omit<WeeklyTask, 'userId'>).date)
        );
      taskData?.time && type === 'weekly'
        ? setTime(moment(convertTimeToMomentValue(taskData.time.trim())))
        : setTime(moment(new Date(taskData.time as string)));

      setIcon(taskData.icon);
    }
  }, [taskData]);

  return (
    <FormContainer onSubmit={onSubmit}>
      <FormControl>
        <label htmlFor="">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          type="text"
          placeholder="Title..."
          value={title}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="">Description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Add a description..."
          value={description}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="">Time</label>
        <TimeSelector onChange={handleChangeTimeValue} value={time} />
      </FormControl>
      <FormControl>
        <Calendar day={day} dateData={date} setDay={handleSelectDate} />
      </FormControl>
      <FormControl>
        <label htmlFor="">Icon</label>
        <EmojiPicker setIcon={handleSelectIcon} icon={icon} />
      </FormControl>
      <div style={{ marginTop: '-3rem' }}>
        <FormButton text={!taskData ? 'Create' : 'Update'} disabled={false} />
      </div>
    </FormContainer>
  );
};

export default TaskForm;
