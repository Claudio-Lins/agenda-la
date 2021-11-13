const agora = new Date()

//dias possíveis
// desconsiderando sábados e domingo
const diasPossiveis = []
for (let i = 0; i < 60; i++) {
  agora.setDate(agora.getDate() + 1)
  const dayOfWeek = agora.getDay()

  if (dayOfWeek != 0 && dayOfWeek != 6) {
    diasPossiveis.push({
      date: agora.toString(),
      dayOfWeek,
    })
  }
}

// Dados uma lista de dias, separa em semanas
let primeiroDia = null
const semana = []

diasPossiveis.forEach(dia => {
    if (primeiroDia == null) {
      primeiroDia = dia
    }
    if(dia.dayOfWeek === 5) {
        semana.push({
            start: primeiroDia,
            end: dia
        })
        primeiroDia = null
    }
})
console.log(semana)
