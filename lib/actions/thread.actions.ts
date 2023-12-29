'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/Thread.model";
import User from "../models/user.model";
import { connectToDB } from "./mongoose";

interface Params {
  text: string,
  author: string,
  communityId: string | null,
  path: string,
}




export async function CreateThread({text, author, communityId, path}: Params) {
    try {
        connectToDB();

    const createdThread = await Thread.create({
        text,
        author,
        community: null
    });

    await User.findByIdAndUpdate(author, {
        $push: {threads: createdThread._id}
    })

    revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error creating thread:  ${console.log(error.message)}`)
    }
}

export async function fetchPosts(pageNumber = 1, pageSize=20) {
    connectToDB();

    //Calculate the number of posts to skip depending on what page

    const skipAmount = (pageNumber-1) * pageSize

    //Fetch the posts that have no parents
    const postsQuery = Thread.find({parentId: {$in: [null, undefined]}})
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({
            path: 'children',
            populate: {
                path: "author",
                model: User,
                select: "_id name parentId image"
            }
        
        })
}