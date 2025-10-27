  import { Check, TimerResetIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

   const Verify: React.FC = ({verify}: props) => {
     const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
     const [correctAnswer, setCorrectAnswer] = useState<string>('');
     const [isCorrect, setIsCorrect] = useState<boolean>(false);
     const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

     // Generate a random CAPTCHA
     useEffect(() => {
       const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
       setCorrectAnswer(letters.sort(() => Math.random() - 0.5).join(''));
     }, []);

     const handleLetterClick = (letter: string) => {
       setSelectedLetters((prev) => [...prev, letter]);
     };

     return (
       <div className="flex items-center justify-center h-screen">
         {isCorrect ? (
           <div className="text-green-500 font-bold text-xl">
             <Check /> Correct!
           </div>
         ) : (
           <div className="text-red-500 font-bold text-xl">
             <TimerResetIcon /> Incorrect
           </div>
         )}

         <h2 className="mb-4">Select the letters in the order they appear:</h2>

         {letters.map((letter, index) => (
           <button
             key={index}
             onClick={() => handleLetterClick(letter)}
             className="w-10 h-10 m-1 bg-gray-200 rounded cursor-pointer text-center font-bold"
           >
             {letter}
           </button>
         ))}

         <div className="flex items-center mt-8">
           {selectedLetters.map((selected, index) => (
             <span
               key={index}
               className="w-10 h-10 m-1 bg-gray-200 rounded text-center font-bold"
             >
               {selected}
             </span>
           ))}
         </div>

         {selectedLetters.length === letters.length && (
           <button
             className="bg-blue-500 text-white px-4 py-2 rounded"
             onClick={() => {
               setIsCorrect(selectedLetters.join('') === correctAnswer);
             }}
           >
             Submit
           </button>
         )}
       </div>
     );
   };

   export default Verify;