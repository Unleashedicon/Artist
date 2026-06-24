const pub = (filename: string) => encodeURI(`/${filename}`)

export const P = {
  // ─── Call screens
  kaisha:  pub('Firefly_Gemini Flash_Portrait of an 18-year-old Black girl smiling warmly, natural curly hair, _wearing a  490171.png'),
  jackson: pub('Firefly_Gemini Flash_Portrait of a 29-year-old Black woman with a stern, concerned expression, _natural ha 142655.png'),

  // ─── MsJackson scene — phone call exchange
  jacksonCall: pub('Firefly_Gemini Flash_Use reference image. Same 29-year-old Black woman, different outfit — _a floral or pa 490171.png'),
  roddoCall:   pub('Firefly_Gemini Flash_Use reference image. Same 18-year-old Black male, now holding a phone _to his ear, ta 490171.png'),

  // ─── Chorus memories
  kSmile:    pub('Firefly_Gemini Flash_use the refference images to generate this An 18-year-old Black girl leaning close to 490171.png'),
  kDemarcus: pub('Firefly_Gemini Flash_use the refference image to generate this An 18-year-old Black girl smiling and laugh 490171.png'),
  kKiss:     pub('use the refference image to generate this An 18-year-old Black girl giving a quick innocent peck on the cheek to an.png'),
  roddo:     pub('Firefly_Gemini Flash_An 18-year-old Black boy sitting alone, looking down with a sad or _disappointed expr 490171.png'),
} as const
