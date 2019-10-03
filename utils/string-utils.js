export function checkStringIsEmpty(string) {
  if (string != null) {
    return string.length === '';
  }
  return true;
}

export function getLocationDescriptionFormatted(description) {
  const descriptionSplit = description.split(' ');
  const regexOnlyNumbers = /^\d+$/;
  for (let i = 0; i < descriptionSplit.length; i++) {
    const containsOnlyNumber = regexOnlyNumbers.test(
      descriptionSplit[i].replace(',', '')
    );
    if (containsOnlyNumber && descriptionSplit[i].replace(',', '').length >= 3) {
      descriptionSplit[i] = `${descriptionSplit[i].replace(',', '').slice(0, -1).slice(0, -1)}**`;
      return descriptionSplit.join(' ');
    }
  }
  return description;
}

export function getLocationDescriptionPersonalized(description){
    let descriptionArray = description.split(',');
    descriptionArray.pop();
    return descriptionArray.join();
}