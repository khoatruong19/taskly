import { useState } from 'react';
import styled from 'styled-components';
import { grayColor } from '../../../constants';
import {
  useGetAllWeeklyTasksQuery,
  WeeklyTask,
} from '../../../generated/graphql';
import Avatar from '../../common/Avatar';
import Calendar from '../../common/Calendar';
import PaddingWrapper from '../../common/PaddingWrapper';
import WeeklyTaskCard, { AddWeeklyTask } from '../../common/WeeklyTaskCard';
import WeeklyTaskModal from '../../common/WeeklyTaskModal';

const Container = styled.div`
  flex: 1.25;
  height: 100vh;
  overflow: scroll;
  background-color: ${grayColor};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 4rem;
  background-color: ${grayColor};
`;

const HeaderTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
`;

const WeeklyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.2rem;
`;

const WeeklyHeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: normal;
  color: black;
`;

const WeeklyHeaderViewAll = styled.p`
  font-size: 1rem;
  font-weight: 800;
  color: #f8d57e;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

interface IProps {
  day: string;
  setDay: (value: Date) => void;
}

const TaskPinnedSide = ({ setDay, day }: IProps) => {
  const { data, loading, error } = useGetAllWeeklyTasksQuery();
  const [viewAll, setViewAll] = useState(false);
  const [openWeeklyModal, setOpenWeeklyModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'update'>('create');
  const [selectedTask, setSelectedTask] = useState<Omit<
    WeeklyTask,
    'userId'
  > | null>(null);

  const handleToggleModal = (
    action: 'open' | 'close',
    type: 'create' | 'update',
    task: null | Omit<WeeklyTask, 'userId'>
  ) => {
    setSelectedTask(task);
    setModalType(type);
    if (action === 'open') setOpenWeeklyModal(true);
    else setOpenWeeklyModal(false);
  };
  return (
    <Container>
      <PaddingWrapper>
        <Header>
          <Avatar size="sm" />
          <HeaderTitle>taskly</HeaderTitle>
        </Header>
        <WeeklyHeader>
          <WeeklyHeaderTitle>Weekly Pinned</WeeklyHeaderTitle>
          <WeeklyHeaderViewAll onClick={() => setViewAll(!viewAll)}>
            {viewAll ? 'View less' : 'View all'}
          </WeeklyHeaderViewAll>
        </WeeklyHeader>
        <CardsContainer>
          {data &&
            data.getAllWeeklyTasks?.tasks &&
            data.getAllWeeklyTasks?.tasks
              .slice(0, viewAll ? data.getAllWeeklyTasks?.tasks.length : 2)
              .map((task) => (
                <WeeklyTaskCard
                  key={task.id}
                  openModal={() => handleToggleModal('open', 'update', task)}
                  task={task}
                />
              ))}
          <AddWeeklyTask
            openModal={() => handleToggleModal('open', 'create', null)}
          />
        </CardsContainer>
        <Calendar day={day} setDay={setDay} />
      </PaddingWrapper>
      {openWeeklyModal && (
        <WeeklyTaskModal
          task={selectedTask}
          type={modalType}
          closeModal={() => handleToggleModal('close', 'create', null)}
        />
      )}
    </Container>
  );
};

export default TaskPinnedSide;
