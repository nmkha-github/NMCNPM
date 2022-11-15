import React, { createContext, useCallback, useContext, useState } from "react";
import useAppSnackbar from "../hook/useAppSnackBar";
import RoomData from "../../modules/home/interface/room-data";

interface RoomsContextProps {
  rooms: RoomData[];

  currentRoom?: RoomData;
  setCurrentRoom: (room: RoomData) => void;

  getRooms: (payload: { limit?: number; skip?: number }) => void;
  loadingRooms: boolean;
  loadingMoreRooms: boolean;

  updateRoom: (payload: { updateRoom: RoomData }) => void;
  updatingRoom: boolean;
}

const RoomsContext = createContext<RoomsContextProps>({
  rooms: [],

  currentRoom: undefined,
  setCurrentRoom: () => {},

  getRooms: () => {},
  loadingRooms: false,
  loadingMoreRooms: false,

  updateRoom: () => {},
  updatingRoom: false,
});

interface TestContextProviderProps {
  children: React.ReactNode;
}

const RoomsProvider = ({ children }: TestContextProviderProps) => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [currentRoom, setCurrentRoom] = useState<RoomData>();
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMoreRooms, setLoadingMoreRooms] = useState(false);
  const [updatingRoom, setUpdatingRoom] = useState(false);

  const { showSnackbarError } = useAppSnackbar();

  const getRooms = useCallback(
    async ({ limit, skip }: { limit?: number; skip?: number }) => {
      setLoadingRooms(true);
      try {
        setRooms([
          ...rooms,
          ...Array(6)
            .fill(1)
            .map((_, index) => {
              return {
                id: String(rooms.length + index + 1),
                name: `Phòng ${rooms.length + index + 1}`,
                description: `Description ${rooms.length + index + 1}`,
              };
            }),
        ]);
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setLoadingRooms(false);
      }
    },
    [rooms, showSnackbarError]
  );

  const updateRoom = useCallback(
    async ({ updateRoom }: { updateRoom: RoomData }) => {
      setUpdatingRoom(true);
      try {
        if (updateRoom.description) {
          rooms.map((room) => {
            if (room.id === updateRoom.id) {
              return {
                ...room,
                description: updateRoom.description,
              };
            }
          });
        }
      } catch (error) {
        showSnackbarError(error);
      } finally {
        setUpdatingRoom(false);
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

        updateRoom,
        updatingRoom,
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
