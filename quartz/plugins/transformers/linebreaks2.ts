import { QuartzTransformerPlugin } from "../types"

export const HardLineBreaks2: QuartzTransformerPlugin = () => ({
  name: "HardLineBreaks2",
  textTransform: (_, content: string) => {
    const lines = content.split("\n")
    const result: string[] = []
    let inFencedCode = false
    let newlining = false

    for (const line of lines) {
      const trimmed = line.trim()

      // Toggle fenced code block state (``` or ~~~)
      if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
        inFencedCode = !inFencedCode
        result.push(line)
        continue
      }

      // Inside a code block – preserve lines exactly as they are
      if (inFencedCode) {
        result.push(line)
        continue
      }

      // Outside code blocks: replace empty lines with <br>
      if (line === "" && !newlining) {
        newlining = true
        result.push("\n<br>")
      } else if (line === "") {
        result.push("<br>")
      } else if (line !== "" && newlining) {
        newlining = false
        result.push("\n")
        result.push(line)
      } else {
        result.push(line)
      }
    }

    return result.join("\n")
  },
})