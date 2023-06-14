import { createContext } from 'react';

interface MyContextType {
    mode: any;
    setMode: React.Dispatch<React.SetStateAction<any>>;
}

const ModeContext = createContext<MyContextType>({
    mode: false,
    setMode: () => { },

});

export default ModeContext ;