import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const IdeaDetailsPage =async () => {

      const token =   await auth.api.getToken({
      
        headers: await headers() 
    });

    console.log(token)
    

    return (
        <div>
            This is idea details page 
        </div>
    );
};

export default IdeaDetailsPage;