import {
  FieldValue,
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import React, { createContext, useCallback, useContext, useState } from "react";
import TaskData from "../../modules/task/interface/task-data";
import { db } from "../config/firebase-config";
import useAppSnackbar from "../hook/useAppSnackBar";
import FileData from "../interface/file-data";
import CommentData from "../interface/comment-data";
import { useUser } from "./UserProvider";

interface TasksContextProps {
  tasks: TaskData[];
  getTasks: (payload: { room_id: string }) => Promise<void>;
  loadingTasks: boolean;

  currentTask: TaskData;
  getCurrentTask: (payload: { room_id: string; id: string }) => Promise<void>;
  loadingCurrentTask: boolean;

  createTask: (payload: {
    room_id: string;
    new_task: {
      title: string;
      assignee_id: string;
      content?: string;
      attach_files?: FileData[];
      comments?: CommentData[];
      status?: string;
      deadline?: Timestamp | Date | string;
    };
  }) => Promise<void>;
  creatingTask: boolean;

  updateTask: (payload: {
    room_id: string;
    id: string;
    updateData: {
      status?: string;
      assignee_id?: string;
      deadline?: Timestamp | Date | string;
      content?: string;
      title?: string;
    };
  }) => Promise<void>;
  updatingTask: boolean;

  deleteTask: (payload: { room_id: string; id: string }) => Promise<void>;
  deletingTask: boolean;
}

const TasksContext = createContext<TasksContextProps>({
  tasks: [],

  getTasks: async () => {},
  loadingTasks: false,

  currentTask: {
    id: "",
    title: "",
    status: "",
    assignee_id: "",
    creator_id: "",
    created_at: "",
  },
  getCurrentTask: async () => {},
  loadingCurrentTask: false,

  createTask: async () => {},
  creatingTask: false,

  updateTask: async () => {},
  updatingTask: false,

  deleteTask: async () => {},
  deletingTask: false,
});

interface TasksContextProviderProps {
  children: React.ReactNode;
}

const TasksProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [currentTask, setCurrentTask] = useState<TaskData>({
    id: "",
    title: "",
    status: "",
    assignee_id: "",
    creator_id: "",
    created_at: "",
  });
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingCurrentTask, setLoadingCurrentTask] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(false);
  const [creatingTask, setCreatingTask] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);

  const { showSnackbarError } = useAppSnackbar();
  const { user } = useUser();

  const getTasks = useCallback(
    async ({ room_id }: { room_id: string }) => {
      try {
        setLoadingTasks(true);
        onSnapshot(collection(db, "room", room_id, "task"), (taskDocs) => {
          setTasks(taskDocs.docs.map((taskDoc) => taskDoc.data() as TaskData));
        });
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setLoadingTasks(false);
      }
    },
    [showSnackbarError]
  );

  const getCurrentTask = useCallback(
    async ({ room_id, id }: { room_id: string; id: string }) => {
      try {
        setLoadingCurrentTask(true);
        onSnapshot(doc(db, "room", room_id, "task", id), (taskDoc) => {
          setCurrentTask({ ...(taskDoc.data() as TaskData) });
        });
      } catch (error) {
        showSnackbarError(error);
      } finally {
        showSnackbarError(false);
      }
    },
    [showSnackbarError]
  );

  const createTask = useCallback(
    async ({
      room_id,
      new_task,
    }: {
      room_id: string;
      new_task: {
        title: string;
        assignee_id?: string;
        content?: string;
        deadline?: Timestamp | Date | string;
        attach_files?: FileData[];
        comments?: CommentData[];
        status?: string;
      };
    }) => {
      if (!user?.id) return;
      try {
        setCreatingTask(true);
        const docResponse = await addDoc(
          collection(db, "room", room_id, "task"),
          new_task
        );
        await updateDoc(doc(db, "room", room_id, "task", docResponse.id), {
          id: docResponse.id,
        });
        const newTask = {
          status: "todo",
          id: docResponse.id,
          creator_id: user?.id,
          created_at: Timestamp.now(),
          ...new_task,
        };

        if (newTask.assignee_id) {
          const memberDocs = await getDocs(
            query(
              collection(db, "room", room_id, "member"),
              where("id", "==", newTask.assignee_id)
            )
          );

          await runTransaction(db, async (transaction) => {
            const memberDoc = await transaction.get(
              doc(db, "room", room_id, "member", memberDocs.docs[0].id)
            );
            if (!memberDoc.exists()) {
              throw "Không tồn tại thành viên này";
            }

            transaction.update(
              doc(db, "room", room_id, "member", memberDocs.docs[0].id),
              {
                [newTask.status]: memberDoc.data()[newTask.status] + 1,
              }
            );
          });
        }

        setTasks([newTask as TaskData, ...tasks]);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setCreatingTask(true);
      }
    },

    [showSnackbarError, tasks, user?.id]
  );

  const updateTask = useCallback(
    async ({
      room_id,
      id,
      updateData,
    }: {
      room_id: string;
      id: string;
      updateData: {
        status?: string;
        assignee_id?: string;
        deadline?: Timestamp | Date | string;
        content?: string;
        title?: string;
      };
    }) => {
      try {
        setUpdatingTask(true);

        const taskBeforeDoc = await getDoc(
          doc(db, "room", room_id, "task", id)
        );
        if (taskBeforeDoc.data()?.assignee_id) {
          const memberHoldTaskDocs = await getDocs(
            query(
              collection(db, "room", room_id, "member"),
              where("id", "==", taskBeforeDoc.data()?.assignee_id)
            )
          );
          await runTransaction(db, async (transaction) => {
            transaction.update(
              doc(db, "room", room_id, "member", memberHoldTaskDocs.docs[0].id),
              {
                [taskBeforeDoc.data()?.status]:
                  memberHoldTaskDocs.docs[0].data()[
                    taskBeforeDoc.data()?.status
                  ] - 1,
              }
            );
          });
        }

        await updateDoc(doc(db, "room", room_id, "task", id), {
          last_edit: Timestamp.now(),
          ...updateData,
        });

        const taskAfterDoc = await getDoc(doc(db, "room", room_id, "task", id));
        if (updateData.assignee_id) {
          const memberAssigneeTaskDocs = await getDocs(
            query(
              collection(db, "room", room_id, "member"),
              where("id", "==", updateData.assignee_id)
            )
          );
          await runTransaction(db, async (transaction) => {
            transaction.update(
              doc(
                db,
                "room",
                room_id,
                "member",
                memberAssigneeTaskDocs.docs[0].id
              ),
              {
                [taskAfterDoc.data()?.status]:
                  memberAssigneeTaskDocs.docs[0].data()[
                    taskAfterDoc.data()?.status
                  ] + 1,
              }
            );
          });
        }

        setTasks(
          tasks.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                ...updateData,
              };
            }

            return task;
          })
        );

        setCurrentTask({ ...currentTask, ...updateData });
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setUpdatingTask(false);
      }
    },
    [currentTask, showSnackbarError, tasks]
  );

  const deleteTask = useCallback(
    async ({ room_id, id }: { room_id: string; id: string }) => {
      try {
        setDeletingTask(true);

        setTasks(tasks.filter((task) => task.id !== id));

        const taskDoc = await getDoc(doc(db, "room", room_id, "task", id));
        const memberHoldTaskDocs = await getDocs(
          query(
            collection(db, "room", room_id, "member"),
            where("id", "==", taskDoc.data()?.assignee_id)
          )
        );
        await runTransaction(db, async (transaction) => {
          transaction.update(
            doc(db, "room", room_id, "member", memberHoldTaskDocs.docs[0].id),
            {
              [taskDoc.data()?.status]:
                memberHoldTaskDocs.docs[0].data()[taskDoc.data()?.status] - 1,
            }
          );
        });

        await deleteDoc(doc(db, "room", room_id, "task", id));

        setCurrentTask({} as TaskData);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setDeletingTask(false);
      }
    },
    [showSnackbarError, tasks]
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,

        getTasks,
        loadingTasks,

        currentTask,
        getCurrentTask,
        loadingCurrentTask,

        createTask,
        creatingTask,

        updateTask,
        updatingTask,

        deleteTask,
        deletingTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const store = useContext(TasksContext);
  return store;
};

export default TasksProvider;
