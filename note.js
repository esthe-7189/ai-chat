//Array
let names = ["Elon musk",
    "Erick jack",
    "Mira Jang",
    "Ukuki Chang",
    "Anne Jain"]

let ceoList =[
    {name: "Sky Blue", age: 50, ceo: true},
    {name: "Eky Plue", age: 45, ceo: true},
    {name: "Eyeey Yell", age: 50, ceo: false},
    {name: "Sey Yell", age: 30, ceo: false},
]
/*
이름없는 펑션을 forEach()인자안에 넣기
function (item){
    console.log(item);
}

//배열 처리
names.forEach(function (item){
    console.log(item);
});
*/
//ES6 신텍스, forEach는 return없음
names.forEach((item, index)=>{
    console.log(item, index);
});

//map은 return 값 있어야함/추가문자 가능
let data = names.map((item)=>{
    return item + "hohoho";
});
    console.log("map:", data);

// 원하는 data만 불러오기
let data2 = ceoList.map((item)=>{
    return item.name;
});
    console.log("map:", data2);

//map과 유사하나 조건넣기
let data3 = ceoList.filter((item)=>{
    return item.age==50;
});
console.log("filter(list):", data3);

//첫글자로 시작하는 array 모두 반환 
let data4 = names.filter((item)=>{
    return item.startsWith("E");
});
console.log("filter:", data4);

//true/false 반환
let data5 = names.some((item)=>{
    return item.startsWith("P");
});
console.log("some:",data5);

//모두가 조건에 맞으면 true,false 반환
let data6 = names.every((item)=>{
    return item.length>0;
});
console.log("every:", data6);

// filter와 유사하나, 처음 찾은 1개만 반환
let data7 = names.find((item)=>{
    //return item.startsWith("E");
    return item == "Elon musk";
});
console.log("find:", data7);
//
let data8 = names.findIndex((item)=>{
    return item == "Elon musk";
});
console.log("findIndex:", data8);