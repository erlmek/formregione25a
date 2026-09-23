
const arr = ["hej", "dyt", "anders"]

    //Nu vil jeg skrive et udtryk der sorterer ovenstående.
    //Jeg koder det selv i stedet for at bruge indbygget JavaScript sort af array af strings.
    const srt = arr.sort()
    //Hvad sker der i ovenstående srt.sort() ? Det kan se sådan her ud.

    console.log(srt)

    const srt = arr.sort((a,b) => { if (a>b) {return 1} else { return -1 }})

