import coding from "./images/coding.png"
import brainbooster from "./images/brainbooster.png";
import papers from "./images/papers.jpg";
export const categories = [
  {
    id: 1,
    img: coding,
    title: "Coding Questions",
    route: "coding",
  },
  {
    id: 2,
    img: brainbooster,
    title: "MCQ's for OA",
    route: "mcqs",
  },
  {
    id: 3,
    img: papers,
    title: " Top Articles",
    route: "article",
  },
];

export const ques=[
    {
      name:"sum of array elements",
      courseType:"Coding",
      CodingLinks:[
        {
            link:"https://practice.geeksforgeeks.org/problems.sum-of-array-elements2502/1"
        },
      ],
      author:"id of admin adding this question",
      tags:[
        "Array","Sum"
      ]
   },
   {
    name:"Product of array",
    courseType:"Coding",
    CodingLinks:[
      {
          link:"https://practice.geeksforgeeks.org/problems.sum-of-array-elements2502/1"
      },
    ],
    author:"id of admin adding this question",
    tags:[
      "Array","Product"
    ]
 }

];