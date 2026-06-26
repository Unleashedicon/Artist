const pub = (filename: string) => encodeURI(`/${filename}`)

export const P = {
  // ─── Song 1 assets (kept for ArtistSelect + IncomingCall)
  kaisha:      pub('Firefly_Gemini Flash_Portrait of an 18-year-old Black girl smiling warmly, natural curly hair, _wearing a  490171.png'),
  jackson:     pub('Firefly_Gemini Flash_Portrait of a 29-year-old Black woman with a stern, concerned expression, _natural ha 142655.png'),
  jacksonCall: pub('Firefly_Gemini Flash_Use reference image. Same 29-year-old Black woman, different outfit — _a floral or pa 490171.png'),
  roddoCall:   pub('Firefly_Gemini Flash_Use reference image. Same 18-year-old Black male, now holding a phone _to his ear, ta 490171.png'),
  kSmile:      pub('Firefly_Gemini Flash_use the refference images to generate this An 18-year-old Black girl leaning close to 490171.png'),
  kDemarcus:   pub('Firefly_Gemini Flash_use the refference image to generate this An 18-year-old Black girl smiling and laugh 490171.png'),
  kKiss:       pub('use the refference image to generate this An 18-year-old Black girl giving a quick innocent peck on the cheek to an.png'),
  roddo:       pub('Firefly_Gemini Flash_An 18-year-old Black boy sitting alone, looking down with a sad or _disappointed expr 490171.png'),

  // ─── Song 2 assets
  roddoConcert: pub('Firefly_Gemini Flash_use the refference to get the face but also give him cool clothes based on this An 18 490171.png'),
  demarcus:     pub('Firefly_Gemini Flash_An 18-year-old Black male, athletic and confident, casual streetwear — hoodie or fitt 490171.png'),
  chloe:        pub('Firefly_Gemini Flash_Portrait of an 18-year-old black girl, stylish and confident, -it girl- energy. Fashi 490171.png'),
  cafeteria:    pub('Firefly_Gemini Flash_An 18-year-old Black male sitting at the center table of a school cafeteria, wearing  490171.png'),
  kissScene:    pub('Firefly_Gemini Flash_POV perspective shot — looking through the eyes of a young Black male in a school hal 490171.png'),
  roddoComfort: pub('Firefly_Gemini Flash_Two 18-year-old Black males in a school hallway. Roddo (use reference image) stands w 490171.png'),
  chanel:       pub('Firefly_Gemini Flash_Luxury Chanel classic flap bag in black with gold CC hardware, placed on a clean surf 490171.png'),
  crowd:        pub('20,00fans concert.jpg'),
} as const
