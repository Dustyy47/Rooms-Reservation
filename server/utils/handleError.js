export function handleError(res, e) {
  console.log(e);
  res.status(500).json({ message: "Что-то пошло не так, попробуйте позже..." });
}
