import React, { createContext, useState} from "react";

export const FlatListContext = createContext({})

function FlatListProvider({children}){
    const [ headerHeight, setHeaderHeight ] = useState<number>(60)
    return(
        <FlatListContext.Provider value = {{ headerHeight, setHeaderHeight }}>
            {children}
        </FlatListContext.Provider>
    )
}

export default FlatListProvider