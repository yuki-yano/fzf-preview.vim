import { setRegister as setVimRegister } from "@/connector/register"
import { createSingleLineConsumer } from "@/fzf/process/consumer"

export const setRegister = createSingleLineConsumer(async (data) => {
  if (data.type !== "register") {
    throw new Error(`Unexpected data type: ${data.type}`)
  }

  await setVimRegister(data.text, data.option)
})
