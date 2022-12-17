import UserData from "../interface/user-data";
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
import { db } from "../../../lib/config/firebase-config";
import useAppSnackbar from "../../../lib/hook/useAppSnackBar";

const UserHelper = {
  // getUserById: async(id: string): Promise<UserData> => {
  //   return
  // }
  getUserById:
    async (id:string):Promise<undefined|UserData> => {
      try {
        let result=undefined;  
        const usersResponse = await getDocs(
          query(collection(db, "user"), where("id", "==", id))
        );
        usersResponse.forEach((userResponse) => {
          result=userResponse.data();
        });
        return result;
      } catch (error) {
        throw error;
      }
    },
};

export default UserHelper;
