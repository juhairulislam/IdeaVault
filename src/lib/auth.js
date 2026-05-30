import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('ideavault');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  
  trustedOrigins: [
    'http://localhost:3000',
    'https://ideavault-fawn.vercel.app',
    'https://ideavault-nda5z2p4w-juhairulislams-projects.vercel.app'
  ],
  
  emailAndPassword: {    
    enabled: true
  }, 
  
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
    }, 
  },
  
  session: {
    cookieCache: {
      enabled: true ,
      strategy: "jwt" ,
      maxAge: 5 * 24 * 60 * 60 
    },

    cookie: {
      secure: true,
      sameSite: "none"
    }
  },
  
  plugins: [
    jwt(), 
  ]
});