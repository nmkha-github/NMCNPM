import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import ROOM_AVATAR_DEFAULT from "../../modules/room/constants/room-avatar-default";
import RoomData from "../../modules/room/interface/room-data";
import { db } from "../config/firebase-config";
import useAppSnackbar from "../hook/useAppSnackBar";
import { useUser } from "./UserProvider";

interface RoomsContextProps {
  rooms: RoomData[];

  currentRoom?: RoomData;
  getCurrentRoom: (id: string) => Promise<void>;
  loadingCurrentRoom: boolean;

  getRooms: (payload: {
    getLimit?: number;
    getStart?: number;
  }) => Promise<void>;
  loadingRooms: boolean;
  loadingMoreRooms: boolean;
  loadedAllRooms: boolean;

  createRoom: (newRoom: {
    name?: string;
    description?: string;
    avatar?: string;
  }) => Promise<void>;
  creatingRoom: boolean;

  updateRoom: (payload: {
    id: string;
    updateData?: {
      name?: string;
      avatar?: string;
      description?: string;
      manager_id?: number;
      auto_accepted?: boolean;
      disabled_newsfeed?: boolean;
    };
  }) => Promise<void>;
  updatingRoom: boolean;

  joinRoom: (payload: { id: string }) => Promise<void>;
  joiningRoom: boolean;

  deleteRoom: (payload: { id: string }) => Promise<void>;
  deletingRoom: boolean;
}

const RoomsContext = createContext<RoomsContextProps>({
  rooms: [],

  currentRoom: undefined,
  getCurrentRoom: async () => {},
  loadingCurrentRoom: false,

  getRooms: async () => {},
  loadingRooms: false,
  loadingMoreRooms: false,
  loadedAllRooms: false,

  createRoom: async () => {},
  creatingRoom: false,

  updateRoom: async () => {},
  updatingRoom: false,

  joinRoom: async () => {},
  joiningRoom: false,

  deleteRoom: async () => {},
  deletingRoom: false,
});

interface RoomsContextProviderProps {
  children: React.ReactNode;
}

const RoomsProvider = ({ children }: RoomsContextProviderProps) => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [roomDocs, setRoomDocs] = useState<any>();
  const [currentRoom, setCurrentRoom] = useState<RoomData>();
  const [loadingCurrentRoom, setLoadingCurrentRoom] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMoreRooms, setLoadingMoreRooms] = useState(false);
  const [loadedAllRooms, setLoadedAllRooms] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [updatingRoom, setUpdatingRoom] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState(false);

  const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();
  const { user } = useUser();

  const LIMIT_LOAD_ROOMS_PER_TIME = 10;
  const getRooms = useCallback(
    async ({
      getLimit,
      getStart,
    }: {
      getLimit?: number;
      getStart?: number;
    }) => {
      if (!user?.id) return;

      const _limit = getLimit ?? LIMIT_LOAD_ROOMS_PER_TIME;
      const _skip = getStart ?? rooms.length;
      if (getStart && getStart > 0) {
        setLoadingMoreRooms(true);
      } else {
        setLoadingRooms(true);
      }
      try {
        let newRooms: any[] = [];

        if (_skip === 0) {
          const docsResponse = await getDocs(
            query(
              collection(db, "user", user?.id, "room"),
              orderBy("created_at", "desc"),
              limit(_limit)
            )
          );
          setRoomDocs([...docsResponse.docs]);
          newRooms = [...docsResponse.docs.map((doc) => doc.data())];
        } else {
          const docsResponse = await getDocs(
            query(
              collection(db, "user", user?.id, "room"),
              orderBy("created_at", "desc"),
              startAfter(roomDocs[_skip - 1]),
              limit(_limit)
            )
          );
          setRoomDocs([...roomDocs, ...docsResponse.docs]);
          newRooms = [...docsResponse.docs.map((doc) => doc.data())];
        }

        if (newRooms.length < _limit) {
          setLoadedAllRooms(true);
        } else {
          setLoadedAllRooms(false);
        }

        if (_skip > 0) {
          setRooms([...newRooms, ...rooms]);
        } else {
          setRooms(newRooms);
        }
      } catch (error) {
        showSnackbarError(error);
      } finally {
        if (getStart && getStart > 0) {
          setLoadingMoreRooms(false);
        } else {
          setLoadingRooms(false);
        }
      }
    },
    [roomDocs, rooms, showSnackbarError, user?.id]
  );

  const getCurrentRoom = useCallback(async (id: string) => {
    try {
      setLoadingCurrentRoom(true);
      const docResponse = await getDoc(doc(db, "room", id));
      setCurrentRoom(docResponse.data() as RoomData);
    } catch (error) {
      showSnackbarError(error);
    } finally {
      setLoadingCurrentRoom(false);
    }
  }, []);

  const createRoom = useCallback(
    async (newRoom: {
      name?: string;
      description?: string;
      avatar?: string;
    }) => {
      if (!user?.id) return;

      setCreatingRoom(true);
      try {
        const time = Timestamp.now();
        const docResponse = await addDoc(collection(db, "room"), {
          ...newRoom,
          created_at: time,
          manager_id: user?.id,
        });
        await updateDoc(doc(db, "room", docResponse.id), {
          id: docResponse.id,
        });
        await addDoc(collection(db, "user", user?.id, "room"), {
          id: docResponse.id,
          name: newRoom.name,
          avatar: newRoom.avatar,
          created_at: time,
        });

        setRooms([newRoom as RoomData, ...rooms]);
        showSnackbarSuccess("Tạo phòng ban thành công");
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setCreatingRoom(false);
      }
    },
    [rooms, showSnackbarError, user?.id]
  );

  const updateRoom = useCallback(
    async ({
      id,
      updateData,
    }: {
      id: string;
      updateData?: {
        name?: string;
        avatar?: string;
        description?: string;
        manager_id?: number;
        auto_accepted?: boolean;
        disabled_newsfeed?: boolean;
      };
    }) => {
      setUpdatingRoom(true);
      try {
        await updateDoc(doc(db, "room", id), updateData);

        rooms.map((room) => {
          if (room.id === id) {
            return {
              ...room,
              ...updateData,
            };
          }

          return room;
        });
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setUpdatingRoom(false);
      }
    },
    [rooms, showSnackbarError]
  );

  const joinRoom = useCallback(
    async ({ id }: { id: string }) => {
      if (!user?.id) return;

      setJoiningRoom(true);
      try {
        const docsResponse = await getDocs(
          query(collection(db, "room"), where("id", "==", id))
        );
        if (!docsResponse.docs.length) {
          throw "Phòng ban không tồn tại";
        }
        const newRoom = docsResponse.docs[0].data() as RoomData;
        await addDoc(collection(db, "user", user?.id, "room"), {
          id: newRoom.id,
          name: newRoom.name,
          avatar: newRoom.avatar,
          created_at: Timestamp.now(),
        });

        setRooms([newRoom, ...rooms]);
        showSnackbarSuccess("Tham gia phòng ban thành công");
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setJoiningRoom(false);
      }
    },
    [rooms]
  );

  const deleteRoom = useCallback(
    async ({ id }: { id: string }) => {
      if (!user?.id) return;

      setDeletingRoom(true);
      try {
        await deleteDoc(doc(db, "room", id));
        const docsResponse = await getDocs(
          query(collection(db, "user", user?.id, "room"), where("id", "==", id))
        );
        await deleteDoc(
          doc(db, "user", user?.id, "room", docsResponse.docs[0].id)
        );

        setRooms(rooms.filter((room) => room.id !== id));
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setDeletingRoom(false);
      }
    },
    [rooms, showSnackbarError]
  );

  return (
    <RoomsContext.Provider
      value={{
        rooms,

        currentRoom,
        getCurrentRoom,
        loadingCurrentRoom,

        getRooms,
        loadingRooms,
        loadingMoreRooms,
        loadedAllRooms,

        createRoom,
        creatingRoom,

        updateRoom,
        updatingRoom,

        joinRoom,
        joiningRoom,

        deleteRoom,
        deletingRoom,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  const store = useContext(RoomsContext);
  return store;
};

export default RoomsProvider;
