import { setRegister as setVimRegister } from "@/connector/register"
import { createSingleLineConsumer } from "@/fzf/process/consumer/consumer"

export const setRegister = createSingleLineConsumer(async (convertedLine) => {
  const [options, ...rest] = convertedLine.split(" ")
  const str = rest.join(" ")

  await setVimRegister(str, options)
})
