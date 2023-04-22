import { getSession } from "@auth0/nextjs-auth0"
import clientPromise from "../lib/mongodb";
import { ethers } from 'ethers';


export const getAppProps = async (ctx) => {
    const userSession = await getSession(ctx.req, ctx.res);
    const wall = ethers.Wallet.createRandom();

    const client = await clientPromise;
    const db = client.db("jmint");
    const user = await db.collection("users").findOne({
        auth0Id: userSession.user.sub
    });

    if(!user){
        return {
            availableTokens: 0,
            mints: []
        }
    }



    const mints = await db.collection("mints").find({
        userId: user._id
    }).sort({
        created: -1,
    }).toArray();

    const wallet = await db.collection("wallets").findOne({
        userId: user._id
    });
    if(!wallet){
    const wal = ethers.Wallet.createRandom();

    // Insérez la clé publique et la clé privée dans la collection 'wallets'
    const result = await db.collection('wallets').insertOne({
      public: wal.address,
      private: wal.privateKey,
      userId: user._id
    });

    const wallet = await db.collection("wallets").findOne({
        userId: user._id
    });

    }
    return {
        walletPuKey: wallet.public,
        walletPrKey: wallet.private,
        availableTokens: user.availableTokens,
        mints: mints.map(({created, _id, userId, ...rest}) => ({
            _id: _id.toString(),
            created: created.toString(),
            ...rest,
        })),
        postId: ctx.params?.postId || null,
    };
};