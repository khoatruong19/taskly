import moment from 'moment';
import toast from 'react-hot-toast';
import { ImUndo } from 'react-icons/im';
import { MdDone, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import styled from 'styled-components';
import { borderRadius, grayColor, yellowColor } from '../../constants';
import {
  DayTask,
  useDeleteDayTaskMutation,
  useToggleDayTaskMutation,
} from '../../generated/graphql';

interface IProps {
  done?: boolean;
  over?: boolean;
}

const Container = styled.div<IProps>`
  position: relative;
  width: 100%;
  background-color: ${(p) =>
    p.done ? yellowColor : p.over ? '#F76F72' : grayColor};
  border-radius: ${borderRadius};

  &:hover {
    & > div:nth-child(1) {
      display: flex;
    }
  }

  .done-tag {
    position: absolute;
    left: -2.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${yellowColor};
    font-size: 1.3rem;
  }
`;

const Wrapper = styled.div`
  padding: 1.2rem 2rem;
  display: flex;
`;

const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 1rem;

  & > span {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const TaskInfo = styled.div`
  padding-top: 0.5rem;
  flex: 1;
  & > h1 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  & > p {
    font-size: 0.9rem;
    word-break: break-all;
  }
`;

const TaskTimestamp = styled.span`
  padding-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const TaskEdit = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: ${borderRadius};

  & > span {
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 99;

    &:nth-child(1):hover {
      color: ${yellowColor};
    }
    &:nth-child(2):hover {
      color: lightgreen;
    }
    &:nth-child(3):hover {
      color: #f76f72;
    }
  }
`;

const ScheduleTaskCard = ({
  done,
  over,
  task,
  openModal,
}: IProps & { task: Partial<DayTask>; openModal: () => void }) => {
  const [toggleTask, _more] = useToggleDayTaskMutation();
  const [deleteDayTask, _] = useDeleteDayTaskMutation({
    variables: {
      deleteDayTaskId: task.id as string,
    },
    update(cache, { data }) {
      if (data?.deleteDayTask.success) {
        const normalizedId = cache.identify({
          id: task.id,
          __typename: 'DayTask',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      }
    },
  });

  const handleToggleTask = async () => {
    await toggleTask({
      variables: {
        id: task.id as string,
      },
      update(_, { data }) {
        if (data?.toggleDayTask.success) {
          if (data.toggleDayTask.task?.done)
            toast.success('Task done! Woohoooo');
          else toast.error('Undone task!');
        }
      },
    });
  };

  const handleDeleteTask = async () => {
    await deleteDayTask();
    toast.success('Task deleted!');
  };
  return (
    <Container done={done} over={over}>
      <TaskEdit>
        <span onClick={handleToggleTask}>
          {task.done ? <ImUndo /> : <MdDone />}
        </span>
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
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </TaskInfo>
        <TaskTimestamp>
          {moment(new Date(task.time)).format('LT')}
        </TaskTimestamp>
      </Wrapper>
      {done && (
        <span className="done-tag">
          <MdDone />
        </span>
      )}
    </Container>
  );
};

export default ScheduleTaskCard;
