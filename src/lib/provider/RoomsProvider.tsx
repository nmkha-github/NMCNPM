import React, { createContext, useCallback, useContext, useState } from "react";
import RoomData from "../../modules/room/interface/room-data";
import useAppSnackbar from "../hook/useAppSnackBar";

interface RoomsContextProps {
  rooms: RoomData[];

  currentRoom?: RoomData;
  setCurrentRoom: (room: RoomData) => void;

  getRooms: (payload: { limit?: number; skip?: number }) => Promise<void>;
  loadingRooms: boolean;
  loadingMoreRooms: boolean;
  loadedAllRooms: boolean;

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
  setCurrentRoom: () => {},

  getRooms: async () => {},
  loadingRooms: false,
  loadingMoreRooms: false,
  loadedAllRooms: false,

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
  const [currentRoom, setCurrentRoom] = useState<RoomData>();
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMoreRooms, setLoadingMoreRooms] = useState(false);
  const [loadedAllRooms, setLoadedAllRooms] = useState(false);
  const [updatingRoom, setUpdatingRoom] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState(false);

  const { showSnackbarError } = useAppSnackbar();

  const LIMIT_LOAD_ROOMS_PER_TIME = 10;
  const getRooms = useCallback(
    async ({ limit, skip }: { limit?: number; skip?: number }) => {
      const _limit = limit ?? LIMIT_LOAD_ROOMS_PER_TIME;
      const _skip = skip ?? 0;
      if (skip && skip > 0) {
        setLoadingMoreRooms(true);
      } else {
        setLoadingRooms(true);
      }
      try {
        //get api here
        const newRooms = Array(_limit)
          .fill(1)
          .map((_, index) => {
            return {
              id: String(rooms.length + index + 1),
              name: `Phòng ${rooms.length + index + 1}`,
              description: `Description ${rooms.length + index + 1}`,
              avatar: "",
            };
          });

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
        if (skip && skip > 0) {
          setLoadingMoreRooms(false);
        } else {
          setLoadingRooms(false);
        }
      }
    },
    [rooms, showSnackbarError]
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
      setJoiningRoom(true);
      try {
        const newRoom = {
          id: id,
          name: `Phòng ${rooms.length}`,
          description: `Description of ${rooms.length + 1}`,
          avatar:
            "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000",
        };

        setRooms([newRoom, ...rooms]);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setJoiningRoom(false);
      }
    },
    [rooms, showSnackbarError]
  );

  const deleteRoom = useCallback(
    async ({ id }: { id: string }) => {
      setDeletingRoom(true);
      try {
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
        setCurrentRoom,

        getRooms,
        loadingRooms,
        loadingMoreRooms,
        loadedAllRooms,

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
