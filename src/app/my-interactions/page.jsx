import Link from 'next/link';
import React from 'react';

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