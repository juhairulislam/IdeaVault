import Link from 'next/link';
import React from 'react';



export const metadata = {
  title: "IdeaVault –Add Interactions",
  description: "This is Add Interactions page of IdeaVault",
};

const MyInteractionsPage = () => {
    return (
        <div>
            This is my interactions page
            <Link className='border border-amber-500 m-4' href={'/signup'}>
            signup
            </Link>
        </div>
    );
};

export default MyInteractionsPage;