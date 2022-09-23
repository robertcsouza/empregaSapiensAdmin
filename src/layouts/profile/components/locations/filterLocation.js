function filterLocation(field) {
  const splited = field.toString().split('-');
  return { id: splited[0], content: splited[1] }
}

export default filterLocation;