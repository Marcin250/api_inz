const dateConverter = {
  toDateOnly: date => {
    if(!date) throw new Error('You need to pass date object.');
    if(typeof date !== Date) {
      date = new Date(date)
    } else {
      throw new Error('dateConverter.toDateOnly method can receive only date objects.');
    }

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? '0' + day : day}`;
  },
  toStageDate: date => {
    if(!date)
      throw new Error('You need to pass a parameter.');
    if(typeof date !== Date)
      date = new Date(date);

    let milisecondsDiff =  Date.now() - date.getTime(),
      secondsDiff = Math.floor(milisecondsDiff / 1000),
      minutesDiff = Math.floor(secondsDiff / 60),
      hoursDiff = Math.floor(minutesDiff / 60),
      dayDiff = Math.floor(hoursDiff / 24);

    if(secondsDiff < 2) return ` teraz`;
    if(secondsDiff > 1 && secondsDiff < 5) return ` ${secondsDiff} sekundy temu`;
    if(secondsDiff >= 5 && secondsDiff < 60) return ` ${secondsDiff} sekund temu`;

    if(minutesDiff < 2) return ` minutę temu`;
    if(minutesDiff > 1 && minutesDiff < 5) return ` ${minutesDiff} minuty temu`;
    if(minutesDiff >= 5 && minutesDiff < 60) return ` ${minutesDiff} minut temu`;

    if(hoursDiff < 2) return ` godzinę temu`;
    if(hoursDiff > 1 && hoursDiff < 5) return ` ${hoursDiff} godziny temu`;
    if(hoursDiff >= 5 && hoursDiff < 24) return ` ${hoursDiff} godzin temu`;

    if(dayDiff < 2) return ` wczoraj`;
    if(dayDiff >= 2) return ` ${dayDiff} dni temu`;
  }
}

export default dateConverter;
