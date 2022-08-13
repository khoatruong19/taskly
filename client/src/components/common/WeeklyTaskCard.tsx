import moment from 'moment';
import toast from 'react-hot-toast';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import styled from 'styled-components';
import { borderRadius, yellowColor } from '../../constants';
import {
  useDeleteWeeklyTaskMutation,
  WeeklyTask,
} from '../../generated/graphql';
import { convertTimeToMomentValue } from '../../utils/date';

const Container = styled.div`
  width: 100%;
  min-height: 5rem;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: ${borderRadius};
  position: relative;

  &:hover {
    opacity: 0.5;

    & > div:nth-child(1) {
      display: flex;
    }
  }
`;

const Wrapper = styled.div<{ add?: boolean }>`
  padding: 2rem;
  display: flex;
  align-items: ${(p) => p.add && 'center'};
  gap: 1.5rem;
  cursor: ${(p) => p.add && 'pointer'};
`;

const IconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${yellowColor};
  border-radius: 10px;

  & > span {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TaskTitle = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`;

const TaskTimestamp = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const TaskDescription = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  word-break: break-word;
`;

const TaskEdit = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: ${borderRadius};

  & > span {
    color: white;
    font-size: 2rem;
    cursor: pointer;

    &:nth-child(1):hover {
      color: lightgreen;
    }
    &:nth-child(2):hover {
      color: #f76f72;
    }
  }
`;

export const AddWeeklyTask = ({ openModal }: { openModal: () => void }) => {
  return (
    <Container onClick={openModal}>
      <Wrapper add>
        <IconContainer>
          <span>+</span>
        </IconContainer>
        <TaskTitle>Add new weekly pin</TaskTitle>
      </Wrapper>
    </Container>
  );
};

const WeeklyTaskCard = ({
  task,
  openModal,
}: {
  task: Partial<WeeklyTask>;
  openModal: () => void;
}) => {
  const [deleteWeeklyTask, _] = useDeleteWeeklyTaskMutation({
    variables: {
      deleteWeeklyTaskId: task.id as string,
    },
    update(cache, { data }) {
      if (data?.deleteWeeklyTask.success) {
        const normalizedId = cache.identify({
          id: task.id,
          __typename: 'WeeklyTask',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      }
    },
  });
  const handleDeleteTask = async () => {
    await deleteWeeklyTask();
    toast.success('Task deleted!');
  };

  return (
    <Container>
      <TaskEdit>
        <span onClick={openModal}>
          <MdOutlineEdit />
        </span>
        <span onClick={handleDeleteTask}>
          <MdOutlineDelete />
        </span>
      </TaskEdit>
      <Wrapper>
        <IconContainer>{task.icon}</IconContainer>
        <TaskInfo>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskTimestamp>
            {task.date} -{' '}
            {task.time &&
              moment(convertTimeToMomentValue(task.time.trim())).format('LT')}
          </TaskTimestamp>
          <TaskDescription>{task.description}</TaskDescription>
        </TaskInfo>
      </Wrapper>
    </Container>
  );
};

export default WeeklyTaskCard;
