import React from 'react';

const fetchIdeas = async() =>{

    const res = await fetch(`${process.env.SERVER_URL}/ideas`) ;
    const data = await res.json() ;
    return data || []
}

const IdeasPage =async () => {
    const ideas = await fetchIdeas() ;
    console.log(ideas)
    return (
        <div>
            This is ideas page
        </div>
    );
};

export default IdeasPage;