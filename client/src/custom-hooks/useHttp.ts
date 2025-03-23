import axios from "axios";
import { useCallback,useEffect,useState } from "react";

type HttpMethod='get'|'post'|'put'|'delete';

const serverInstance=axios.create({
    baseURL:'http://localhost:3000'
})

export function useHttp<T>(initialUrl:string,defaultMethod:HttpMethod='get'){
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [data,setData]=useState<T>();

    const request = useCallback(async (url = initialUrl, method = defaultMethod, body?: any) => {
        defaultMethod = method;
        setLoading(true);
        setError('');
        console.log(`📡 שולחת בקשה: ${method.toUpperCase()} ${url}`);
        
        try {
            console.log("defaultMethod",defaultMethod)
            const result = await serverInstance[method]<T>(url, body);
            console.log("✅ קיבלתי תשובה:", result.data);
            setData(result.data as T);
            setLoading(false);
            return result.data;
        } catch (error) {
            setError('error occurs, try again later');
            setLoading(false);
            console.error('❌ שגיאה בעת שליפת נתונים:', error);
        }
    }, [defaultMethod]);
    
    return{loading,error,data,request};
}