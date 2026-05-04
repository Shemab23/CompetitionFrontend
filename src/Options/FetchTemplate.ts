import type { BodyProps } from "@/types/api"
import type { Methods } from "@/types/general"

export const FetchTemplate = async <T>(endpoint:string,method:Methods = "GET",body?: BodyProps):Promise<T> =>{
    const isFormaData = body instanceof FormData;
    const Headers: HeadersInit = {};

    if (body && !isFormaData) Headers['content-type'] = 'application/json';

    try{
        const responce = await fetch(
                            endpoint,
                            {
                                method,
                                credentials: "include",
                                body:isFormaData?body:JSON.stringify(body),
                                headers:Headers
                            }
                        );

        if (!responce.ok) {
            const err = await responce.json()
            console.error("BACKEND ERROR:", err)
            throw new Error(err.msg || "Request failed")
        }else{
            return responce.json()
        }
    }catch(err){
        return {error:err} as T
    }
}
