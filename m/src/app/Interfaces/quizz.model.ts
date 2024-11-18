
export interface Quiz {
    idQuizz:number;
    questions: Question[];
    score?:number;
  }
  
  export interface Question {
    idQuestion: number;
    question: string;
    idQuiz: number;
    reponses: Answer[];
    score?:number;
  }
  
  export interface Answer {
    idReponse: number;
    reponse: string;
    verite: number;
    idQuestion: number;
    cocher?: boolean;

  }