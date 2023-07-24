import React from "react";

interface QueryHandlerProps {
    query: { 
        loading: boolean,
        error: Error | undefined
    };
    children: React.ReactNode | React.ReactNode[];
}

const QueryHandler: React.FC<QueryHandlerProps> = ({ query, children }) => {
    if (query.error)
        return <p>error</p>
    if (query.loading)
        return <p>loading...</p>
    return (
        <>
            {children} 
        </>
    );
}

export default QueryHandler;