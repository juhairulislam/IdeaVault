import React from 'react';


const fetchSingleIdeas = async (id) => {


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`);
    const data = await res.json();
    return data || {};


}

const IdeaDetailsPage = async ({ params }) => {

    const { ideasId } = await params;

    console.log(ideasId)

    const ideas = await fetchSingleIdeas(ideasId)

    console.log(ideas)

    return (
        <div>
            This is details page
        </div>
    );
};

export default IdeaDetailsPage;