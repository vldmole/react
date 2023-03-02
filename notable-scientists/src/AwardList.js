export function awardList(awards)
{
    let textList = '(';
    for(let i=0; i<awards.length-1; i++)
        textList += awards[i] + ', ';
    textList += awards[awards.length -1] + ')';

    return textList;
}
