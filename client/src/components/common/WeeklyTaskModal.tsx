import moment from 'moment';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { borderRadius, yellowColor } from '../../constants';
import {
  useCreateWeeklyTaskMutation,
  useUpdateWeeklyTaskMutation,
  WeeklyTask,
} from '../../generated/graphql';
import { TaskFormData } from '../../types/TaskFormData';
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
  task: Omit<WeeklyTask, 'userId'> | null;
  type: 'create' | 'update';
  closeModal: () => void;
}
//.format('LT')

const WeeklyTaskModal = ({ task, type, closeModal }: IProps) => {
  const [createTask, _] = useCreateWeeklyTaskMutation();
  const [updateTask, _more] = useUpdateWeeklyTaskMutation();
  const handleSubmitForm = async (data: TaskFormData) => {
    if (type === 'create') {
      await createTask({
        variables: {
          createInput: {
            title: data.title,
            description: data.description,
            date: moment(data.date).format('LL'),
            time: JSON.stringify(data.time),
            icon: data.icon,
          },
        },
        update(cache, { data }) {
          toast.success('Task created!');
          cache.modify({
            fields: {
              getAllWeeklyTasks(existing) {
                if (
                  data?.createWeeklyTask.success &&
                  data.createWeeklyTask.task
                ) {
                  const newTaskRef = cache.identify(data.createWeeklyTask.task);

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
            date: moment(data.date).format('LL'),
            time: JSON.stringify(data.time),
            icon: data.icon,
          },
        },
        update(cache, { data }) {
          toast.success('Task updated!');
          cache.modify({
            fields: {
              getAllWeeklyTasks(existing) {
                if (
                  data?.updateWeeklyTask.success &&
                  data.updateWeeklyTask.task
                ) {
                  const newTaskRef = cache.identify(data.updateWeeklyTask.task);

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
    }

    closeModal();
  };
  return (
    <Container>
      <Modal>
        <h1>
          {type === 'create' ? 'Create Weekly Task' : 'Update Weekly Task'}
          <span onClick={closeModal}>
            <MdClose />
          </span>
        </h1>
        <TaskForm
          type="weekly"
          taskData={task}
          handleSubmit={handleSubmitForm}
        />
      </Modal>
    </Container>
  );
};

export default WeeklyTaskModal;
