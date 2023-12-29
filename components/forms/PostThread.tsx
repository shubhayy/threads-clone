"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { updateUser } from "@/lib/actions/user.actions";
import { CreateThread } from "@/lib/actions/thread.actions";


interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}




function PostThread({userID} : {userID: string}) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
        thread: '',
        accountId: userID
    },
  });
    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await CreateThread({
            text: values.thread,
            author: userID,
            communityId: null,
            path: pathname,
        })

        router.push("/")
    }
    
    return (
        <Form {...form}>
            <form className='flex flex-col justify-start gap-10 mt-10' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='thread' render={({ field })=> (
                    <FormItem className='flex w-full flex-col gap-3'>
                        <FormLabel className='text-base-semibold text-light-2'>
                            Content
                        </FormLabel>
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1 ">
                            <Textarea rows={15}  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                    />

                    <Button type="submit" className="bg-primary-500">
                        Post Thread
                    </Button>
            </form>
        </Form>
    )
}

export default PostThread