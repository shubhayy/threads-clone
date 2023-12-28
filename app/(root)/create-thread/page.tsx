import { currentUser } from "@clerk/nextjs"
import {redirect} from 'next/navigation'

async function Page() {
    
    const user = await currentUser();

    if(!user) return null
    
    const userInfo = await fetchUser(user.id)


    return 
    <h1 className="head-text">
        Hello
    </h1>
}

export default Page