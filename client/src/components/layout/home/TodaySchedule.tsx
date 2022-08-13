import moment from 'moment';
import { useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import styled from 'styled-components';
import { yellowColor } from '../../../constants';
import { DayTask, useGetDayTasksQuery } from '../../../generated/graphql';
import { sortFunction } from '../../../utils/date';
import Avatar from '../../common/Avatar';
import DayTaskModal from '../../common/DayTaskModal';
import PaddingWrapper from '../../common/PaddingWrapper';
import ScheduleTaskCard from '../../common/ScheduleTaskCard';

const Container = styled.div`
  flex: 1.5;
  height: 100vh;
  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftHeader = styled.div`
  width: 70%;
`;

const HeaderTitle = styled.p`
  font-weight: 500;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const DaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p:nth-child(1) {
    color: gray;
    margin-right: 0.25rem;
  }

  & > span:nth-child(2) {
    font-weight: 600;
    font-size: 2.5rem;
    color: ${yellowColor};
  }
`;

const IconsContainer = styled.div`
  & > span {
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.7);
  }

  & > span:hover {
    color: ${yellowColor};
  }
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4rem;
`;

export type FDayTask = Omit<DayTask, 'userId'>;

interface IProps {
  day: string;
  setDay: (type: 'acs' | 'dec') => void;
}

const TodaySchedule = ({ day, setDay }: IProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | FDayTask>(null);
  const [modalType, setModalType] = useState<'create' | 'update'>('create');

  const { data, loading } = useGetDayTasksQuery({
    variables: {
      date: day,
    },
  });

  const handleToggleModal = (
    action: 'open' | 'close',
    type: 'create' | 'update',
    task: FDayTask | null
  ) => {
    setSelectedTask(task);
    setModalType(type);
    if (action === 'open') setOpenModal(true);
    else setOpenModal(false);
  };

  return (
    <Container>
      <PaddingWrapper>
        <Header>
          <LeftHeader>
            <HeaderTitle>Today's schedule</HeaderTitle>
            <DaySelector>
              <p>{moment(new Date(day)).format('dddd')}</p>
              <span>{day}</span>
              <IconsContainer>
                <span onClick={() => setDay('dec')}>
                  <GoChevronLeft fontSize="2rem" />
                </span>
                <span onClick={() => setDay('acs')}>
                  <GoChevronRight fontSize="2rem" />
                </span>
              </IconsContainer>
            </DaySelector>
          </LeftHeader>
          <Avatar
            size="lg"
            cursor
            onClick={() => handleToggleModal('open', 'create', null)}
          />
        </Header>

        <TasksContainer>
          {data?.getDayTasksByDate?.success &&
            data?.getDayTasksByDate?.tasks
              .slice()
              .sort(sortFunction)
              .map((task) => (
                <ScheduleTaskCard
                  task={task}
                  key={task.id}
                  done={task.done}
                  openModal={() => handleToggleModal('open', 'update', task)}
                />
              ))}
          {data?.getDayTasksByDate?.success &&
            data.getDayTasksByDate.tasks.length === 0 && (
              <h2 style={{ textAlign: 'center' }}>No tasks...</h2>
            )}
        </TasksContainer>
      </PaddingWrapper>
      {openModal && (
        <DayTaskModal
          day={day}
          daySection={moment(day).format('L')}
          task={selectedTask}
          type={modalType}
          closeModal={() => handleToggleModal('close', 'create', null)}
        />
      )}
    </Container>
  );
};

export default TodaySchedule;
