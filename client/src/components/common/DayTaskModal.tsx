import moment from 'moment';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { borderRadius, yellowColor } from '../../constants';
import {
  useCreateDayTaskMutation,
  useUpdateDayTaskMutation,
} from '../../generated/graphql';
import { TaskFormData } from '../../types/TaskFormData';
import { FDayTask } from '../layout/home/TodaySchedule';
import TaskForm from './TaskForm';

moment.locale('en-nz');

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  max-width: 650px;
  width: 100%;
  max-height: 70vh;
  overflow: auto;
  padding: 0 2rem 2rem;
  background-color: white;
  border-radius: ${borderRadius};
  position: relative;

  h1 {
    position: sticky;
    padding: 3rem 0 0.5rem;
    background-color: white;
    top: 0;
    text-align: center;
    margin-bottom: 1.5rem;
    z-index: 999;

    & > span:nth-child(1) {
      position: absolute;
      font-size: 3rem;
      color: black;
      right: -2rem;
      top: 0;
      z-index: 99;

      &:hover {
        cursor: pointer;
        color: ${yellowColor};
      }
    }
  }
`;

interface IProps {
  task: FDayTask | null;
  type: 'create' | 'update';
  closeModal: () => void;
  daySection: string;
  day: string;
}

const DayTaskModal = ({ task, type, closeModal, daySection, day }: IProps) => {
  const [createTask, _] = useCreateDayTaskMutation();
  const [updateTask, _more] = useUpdateDayTaskMutation();
  const handleSubmitForm = async (data: TaskFormData) => {
    let exactTime: Date = data.time.toDate();
    exactTime.setDate(data.date.getDate());
    exactTime.setMonth(data.date.getMonth());
    if (type === 'create') {
      await createTask({
        variables: {
          createInput: {
            title: data.title,
            description: data.description,
            time: exactTime,
            date: moment(data.date).format('L'),
            icon: data.icon,
          },
        },
        update(cache, { data }) {
          toast.success('Task created!');
          cache.modify({
            fields: {
              getDayTasksByDate(existing) {
                if (
                  data?.createDayTask.success &&
                  data.createDayTask.task &&
                  data.createDayTask.task.date === daySection
                ) {
                  const newTaskRef = cache.identify(data.createDayTask.task);

                  const newTasksAfterCreation = {
                    ...existing,
                    tasks: [{ __ref: newTaskRef }, ...existing.tasks],
                  };

                  return newTasksAfterCreation;
                }
              },
            },
          });
        },
      });
    } else {
      await updateTask({
        variables: {
          updateInput: {
            id: task?.id as string,
            title: data.title,
            description: data.description,
            time: exactTime,
            date: moment(data.date).format('L'),
            icon: data.icon,
          },
        },
        update(cache, { data }) {
          toast.success('Task updated!');
          cache.modify({
            fields: {
              getDayTasksByDate(existing) {
                if (
                  data?.updateDayTask.success &&
                  data.updateDayTask.task &&
                  data.updateDayTask.task.date === daySection
                ) {
                  const newTaskRef = cache.identify(data.updateDayTask.task);

                  let tempTasks = [...existing.tasks];
                  tempTasks = tempTasks.filter(
                    (taskRef) => taskRef.__ref !== newTaskRef
                  );

                  const newTasksAfterCreation = {
                    ...existing,
                    tasks: [{ __ref: newTaskRef }, ...tempTasks],
                  };

                  return newTasksAfterCreation;
                }
              },
            },
          });
        },
      });
    }

    closeModal();
  };

  return (
    <Container>
      <Modal>
        <h1>
          {type === 'create' ? 'Create Daily Task' : 'Update Daily Task'}
          <span onClick={closeModal}>
            <MdClose />
          </span>
        </h1>
        <TaskForm
          day={day}
          type="daily"
          taskData={task}
          handleSubmit={handleSubmitForm}
        />
      </Modal>
    </Container>
  );
};

export default DayTaskModal;
