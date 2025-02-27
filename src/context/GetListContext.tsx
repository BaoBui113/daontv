"use client";
import { IComment } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface GetListContextType {
  listComment: IComment[];
  setListComments: (listComment: IComment[]) => void;
}

// Create GetListContext
const GetListContext = createContext<GetListContextType | undefined>(undefined);

// Define type for GetListProvider props
interface GetListProviderProps {
  children: ReactNode;
}

// Create provider component
export const GetListProvider: React.FC<GetListProviderProps> = ({
  children,
}) => {
  const [listComment, setListComments] = useState<IComment[]>([]);

  return (
    <GetListContext.Provider
      value={{
        setListComments,
        listComment,
      }}
    >
      {children}
    </GetListContext.Provider>
  );
};

export const useGetList = (): GetListContextType => {
  const context = useContext(GetListContext);
  if (!context) {
    throw new Error("useGetList must be used within an GetListProvider");
  }
  return context;
};
