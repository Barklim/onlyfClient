import React, { createContext, ReactNode, useContext, useRef } from 'react';

interface ToolbarContextProps {
    stopWordsRef: React.MutableRefObject<any>;
    agencyNameRef: React.MutableRefObject<any>;
    designSwitcherRef: React.MutableRefObject<any>;
    notificationsRef: React.MutableRefObject<any>;
    cookiesRef: React.MutableRefObject<any>;
    visibleRef: React.MutableRefObject<any>;
}

const ToolbarContext = createContext<ToolbarContextProps | undefined>(undefined);

export const ToolbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const stopWordsRef = useRef();
    const agencyNameRef = useRef();
    const designSwitcherRef = useRef();
    const notificationsRef = useRef();
    const cookiesRef = useRef();
    const visibleRef = useRef();

    return (
        <ToolbarContext.Provider
            value={{
                stopWordsRef,
                agencyNameRef,
                designSwitcherRef,
                notificationsRef,
                cookiesRef,
                visibleRef,
            }}
        >
            {children}
        </ToolbarContext.Provider>
    );
};

export const useToolbarRefs = () => {
    const context = useContext(ToolbarContext);
    if (!context) {
        throw new Error("useToolbarRefs must be used within a ToolbarProvider");
    }
    return context;
};