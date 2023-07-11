'use client'
import 'regenerator-runtime';
import Image from "next/image";
import {AiOutlineSearch,AiFillCamera} from 'react-icons/ai';
import {BiMicrophone} from 'react-icons/bi';
import {BsFillMicFill} from 'react-icons/bs'
import { useState } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Main: React.FC= ()=> {
    
    const [search, setSearch] = useState<string>("");

        const {
          transcript,
          listening,
          resetTranscript,
          browserSupportsSpeechRecognition
        } = useSpeechRecognition();
      
    const router = useRouter();
    const googleLogo: string = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    
    const onSearchSubmit  = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement,MouseEvent> )=> {
        e.preventDefault()
        router.push(`https://www.google.com/search?q=${search}`)
    } 

    if (!browserSupportsSpeechRecognition) {
        return null ;
      }

    const startListening = ()=> {
        SpeechRecognition.startListening({continuous: true, language:'en-IN'})
    }

    const stopListening = ()=> {
        SpeechRecognition.stopListening();
        setSearch(transcript);
    }

    return(
        <div className="items-center flex flex-col mt-28">
            <Image src={googleLogo} alt="google" height={100} width={270}/>

            <form className="flex border mt-7 px-5 py-2 rounded-full w-2/5 items-center hover:shadow-md" onSubmit={(e)=> onSearchSubmit(e)}>
                <AiOutlineSearch className="text-xl text-slate-400"/>
                <input type='text' placeholder='Search' className="w-full focus:outline-none ml-4" 
                   onChange={(e)=> setSearch(e.target.value)}
                   value={search || transcript}
                />

                {
                    listening ? 
                    <BsFillMicFill className="text-3xl text-slate-400 mr-5" onClick={()=> stopListening()}/> 
                      : 
                    <BiMicrophone className="text-3xl text-slate-400 mr-5" onClick={()=> startListening()}/>
                }
                
                <AiFillCamera className="text-3xl text-slate-400"/>
            </form>
            <div className="mt-7">
                <button className="bg-slate-200 mr-3 py-2 px-4 text-sm rounded hover:border" onClick={(e)=> onSearchSubmit(e)}>
                    Google Search
                </button>
                <button className="bg-slate-200 py-2 px-4 text-sm rounded hover:border" onClick={() => router.push('https://www.google.com/doodles')}>
                    I'm feelig Lucky
                </button>
            </div>
        </div>
    )
}


export default Main