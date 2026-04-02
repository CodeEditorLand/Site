const Noise = {
  Speed: typeof __NOISE_SPEED__ !== "undefined" ? __NOISE_SPEED__ : 5e-4,
  Step: typeof __NOISE_STEP__ !== "undefined" ? __NOISE_STEP__ : 8,
  ChannelSpeed: {
    Phase: 0.5,
    Color: 0.2,
    Rhythm: 2,
    Morph: 0.7,
    Border: 0.3,
    Glow: 0.8
  }
};

export { Noise as default };
