import React, {useState} from 'react';

interface Props {
    submission_id: number,
    title: string,
    submission: string
};

function Submissions(props: {getSubmissions: () => Promise<void>}) {
    
    const [title, setTitle] = useState("");
    const [submission, setSubmission] = useState("");

    const onSubmit = async () => {
        try {

            const body = { title, submission };
            console.log(body)
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                body: JSON.stringify(body),

                headers: {
                    'Content-Type': 'application/json'
                  },
            });
        console.log(response);
        } catch (error) {
            console.error(error.message);
        }
        setTitle("");
        setSubmission("");
    }

    return (
        <div>
            <input placeholder="Submission title" value = {title} onChange={e => setTitle(e.target.value)}></input>
            <textarea id="textarea" rows={30} cols={100} value = {submission} onChange={e => setSubmission(e.target.value)}/>
            <button className="button" onClick={onSubmit}>submit</button>
     
            
        </div>

    );
}

// function ListSubmissions() {

//     const [list, setList] = useState<Props[]>([]);

//     const getSubmissions = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/');
//             const jsonData = await response.json();
//             setList(jsonData);
//         } catch (error) {
//             console.error(error.message);
//         }
//     }

//     useEffect(() => {
//         getSubmissions();
//     }, []);

//     return (
//         <div>
//             {list.map((avacado) => {
//                 return (<div className="submission" key={avacado.submission_id}>
//                     <h2>{avacado.title}</h2>
//                 </div>
//                 )
//             })}

//         </div>
//     )
// }

export default Submissions