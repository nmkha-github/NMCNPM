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
import { useNavigate } from "react-router-dom";
import ROOM_AVATAR_DEFAULT from "../../modules/room/constants/room-avatar-default";
import RoomData from "../../modules/room/interface/room-data";
import { db } from "../config/firebase-config";
import useAppSnackbar from "../hook/useAppSnackBar";
import { useUser } from "./UserProvider";

interface RoomsContextProps {
  rooms: RoomData[];

  currentRoom: RoomData;
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
    updateData: {
      name?: string;
      avatar?: string;
      description?: string;
      manager_id?: string;
      auto_accepted?: boolean;
      disabled_newsfeed?: boolean;
      locked?: boolean;
      exit_locked?: boolean;
    };
  }) => Promise<void>;
  updatingRoom: boolean;

  joinRoom: (payload: { id: string }) => Promise<void>;
  joiningRoom: boolean;

  deleteRoom: (payload: { id: string }) => Promise<void>;
  deletingRoom: boolean;

  leaveRoom: (payload: { id: string }) => Promise<void>;
  leavingRoom: boolean;
}

const RoomsContext = createContext<RoomsContextProps>({
  rooms: [],

  currentRoom: {
    id: "",
    name: "",
    avatar: "",
    created_at: "",
  },
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

  leaveRoom: async () => {},
  leavingRoom: false,
});

interface RoomsContextProviderProps {
  children: React.ReactNode;
}

const RoomsProvider = ({ children }: RoomsContextProviderProps) => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [roomIdDocs, setRoomIdDocs] = useState<any>();
  const [currentRoom, setCurrentRoom] = useState<RoomData>({
    id: "",
    name: "",
    avatar: "",
    created_at: "",
  });
  const [loadingCurrentRoom, setLoadingCurrentRoom] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMoreRooms, setLoadingMoreRooms] = useState(false);
  const [loadedAllRooms, setLoadedAllRooms] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [updatingRoom, setUpdatingRoom] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState(false);
  const [leavingRoom, setLeavingRoom] = useState(false);

  const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();
  const navigate = useNavigate();
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
          const roomIdDocsResponse = await getDocs(
            query(
              collection(db, "user", user?.id, "room"),
              orderBy("created_at", "desc"),
              limit(_limit)
            )
          );
          setRoomIdDocs([...roomIdDocsResponse.docs]);
          const roomDocsResponse = await getDocs(
            query(
              collection(db, "room"),
              where(
                "id",
                "in",
                roomIdDocsResponse.docs.map((doc) => doc.data().id)
              )
            )
          );
          newRooms = [...roomDocsResponse.docs.map((doc) => doc.data())];
        } else {
          const roomIdDocsResponse = await getDocs(
            query(
              collection(db, "user", user?.id, "room"),
              orderBy("created_at", "desc"),
              startAfter(roomIdDocs[_skip - 1]),
              limit(_limit)
            )
          );
          setRoomIdDocs([...roomIdDocs, ...roomIdDocsResponse.docs]);
          const roomDocsResponse = await getDocs(
            query(
              collection(db, "room"),
              where(
                "id",
                "in",
                roomIdDocsResponse.docs.map((doc) => doc.data().id)
              )
            )
          );
          newRooms = [...roomDocsResponse.docs.map((doc) => doc.data())];
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
    [roomIdDocs, rooms, showSnackbarError, user?.id]
  );

  const getCurrentRoom = useCallback(async (id: string) => {
    if (!user?.id) return;

    try {
      setLoadingCurrentRoom(true);
      const docResponse = await getDoc(doc(db, "room", id));

      if (!docResponse.data()) {
        const docsResponse = await getDocs(
          query(collection(db, "user", user?.id, "room"), where("id", "==", id))
        );
        await deleteDoc(
          doc(db, "user", user?.id, "room", docsResponse.docs[0].id)
        );

        setRooms(rooms.filter((room) => room.id !== id));
        showSnackbarError("Phòng ban đã bị xoá");
        navigate("/room");
        return;
      }

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
      updateData: {
        name?: string;
        avatar?: string;
        description?: string;
        manager_id?: string;
        auto_accepted?: boolean;
        disabled_newsfeed?: boolean;
        locked?: boolean;
        exit_locked?: boolean;
      };
    }) => {
      setUpdatingRoom(true);
      try {
        await updateDoc(doc(db, "room", id), updateData);

        setRooms(
          rooms.map((room) => {
            if (room.id === id) {
              return {
                ...room,
                ...updateData,
              };
            }
            return room;
          })
        );

        setCurrentRoom({ ...currentRoom, ...updateData });
        showSnackbarSuccess("Cập nhật tùy chỉnh phòng ban thành công.");
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setUpdatingRoom(false);
      }
    },
    [rooms, showSnackbarError, currentRoom]
  );

  const joinRoom = useCallback(
    async ({ id }: { id: string }) => {
      if (!user?.id) return;

      setJoiningRoom(true);
      try {
        const docResponse = await getDoc(doc(db, "room", id));
        if (!docResponse.data()) {
          throw "Phòng ban không tồn tại";
        }
        const newRoom = docResponse.data() as RoomData;
        await addDoc(collection(db, "user", user?.id, "room"), {
          id: newRoom.id,
        });
        await addDoc(collection(db, "room", id, "member"), { id: user?.id });

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

  const leaveRoom = useCallback(async ({ id }: { id: string }) => {
    if (!user?.id) return;

    try {
      setLeavingRoom(true);
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
      setLeavingRoom(false);
    }
  }, []);

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

        leaveRoom,
        leavingRoom,
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
