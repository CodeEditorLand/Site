const Noise = {
  // 5× slower than the original 0.0005 - noise evolves over ~8 seconds
  // instead of ~1.5 seconds, making individual states inspectable.
  Speed: typeof __NOISE_SPEED__ !== "undefined" ? __NOISE_SPEED__ : 1e-4,
  // 20 quantization levels (was 8) - larger increments between noise
  // steps mean each committed state is visually distinct and the
  // throttled commit sees meaningful changes, not noise jitter.
  Step: typeof __NOISE_STEP__ !== "undefined" ? __NOISE_STEP__ : 20,
  ChannelSpeed: {
    Phase: 0.18,
    // was 0.5
    Color: 0.07,
    // was 0.2
    Rhythm: 0.6,
    // was 2 - rhythm dots stay readable
    Morph: 0.25,
    // was 0.7
    Border: 0.1,
    // was 0.3
    Glow: 0.28
    // was 0.8
  }
};

export { Noise as default };
//# sourceMappingURL=Noise.DlnMwvqJ.js.map
