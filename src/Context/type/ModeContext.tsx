
import React, { useState, useEffect } from "react";
import Context from "./index";

const ModeProvider = (props: any) => {
    const [mode, setMode] = useState<any>('')
    return (
        <Context.Provider
            value={{
                ...props,
                mode,
                setMode


            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default ModeProvider;
