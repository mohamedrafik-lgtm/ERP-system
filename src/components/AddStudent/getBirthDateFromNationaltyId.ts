export function getBirthDateFromNationalId(nationalId: string): string | null {
  if (!/^\d{14}$/.test(nationalId)) return null;
  
  const centuryCode = nationalId[0];
  const year = nationalId.slice(1, 3);
  const month = nationalId.slice(3, 5);
  const day = nationalId.slice(5, 7);

  let century = "";
  if (centuryCode === "2") century = "19";
  else if (centuryCode === "3") century = "20";
  else return null;

  return `${century}${year}-${month}-${day}`;
}
