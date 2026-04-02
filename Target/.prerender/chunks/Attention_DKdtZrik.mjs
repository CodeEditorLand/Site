const Attention = (async () => {
  const { createNoise2D: CreateNoise2D } = await import('simplex-noise');
  const LayoutNoise = CreateNoise2D();
  const Scatter = (Index, SpreadX, SpreadY = 0) => {
    const NoiseX = LayoutNoise(Index * 0.5, 0);
    const NoiseY = LayoutNoise(0, Index * 0.5);
    return {
      X: NoiseX * SpreadX,
      Y: NoiseY * SpreadY
    };
  };
  const ScatterRotation = (Index, MaxDegree = 3) => {
    return LayoutNoise(Index * 0.37, Index * 0.91) * MaxDegree;
  };
  const ScatterScale = (Index, Spread = 0.05) => {
    return 1 + LayoutNoise(Index * 0.61, Index * 0.43) * Spread;
  };
  const ScatterDelay = (Index, MaxDelay = 200) => {
    const Raw = LayoutNoise(Index * 0.83, Index * 0.29);
    return Math.abs(Raw) * MaxDelay;
  };
  const ScatterOpacity = (Index, Min = 0.7, Max = 1) => {
    const Raw = LayoutNoise(Index * 0.47, Index * 0.67);
    const Normalized = (Raw + 1) / 2;
    return Min + Normalized * (Max - Min);
  };
  const ApplyToElement = (Element, Index, SpreadX, SpreadY = 0) => {
    const Offset = Scatter(Index, SpreadX, SpreadY);
    const Rotation = ScatterRotation(Index);
    const Scale = ScatterScale(Index);
    const Delay = ScatterDelay(Index);
    const Opacity = ScatterOpacity(Index);
    Element.style.setProperty("--AttentionOffsetX", `${Offset.X}px`);
    Element.style.setProperty("--AttentionOffsetY", `${Offset.Y}px`);
    Element.style.setProperty("--AttentionRotation", `${Rotation}deg`);
    Element.style.setProperty("--AttentionScale", String(Scale));
    Element.style.setProperty("--AttentionDelay", `${Delay}ms`);
    Element.style.setProperty("--AttentionOpacity", String(Opacity));
  };
  const ApplyToSelector = (Selector, SpreadX, SpreadY = 0) => {
    const ElementList = document.querySelectorAll(Selector);
    ElementList.forEach((Element, Index) => {
      ApplyToElement(Element, Index, SpreadX, SpreadY);
    });
  };
  const ObserveAndApply = (Selector, SpreadX, SpreadY = 0, Threshold = 0.1) => {
    const ElementList = document.querySelectorAll(Selector);
    const Observer = new IntersectionObserver(
      (EntryList) => {
        for (const Entry of EntryList) {
          if (Entry.isIntersecting) {
            const Element = Entry.target;
            const Index = Array.from(ElementList).indexOf(Element);
            if (Index >= 0) {
              ApplyToElement(Element, Index, SpreadX, SpreadY);
            }
            Element.classList.add("StaccatoVisible");
            Observer.unobserve(Element);
          }
        }
      },
      { threshold: Threshold }
    );
    ElementList.forEach((Element) => {
      Observer.observe(Element);
    });
    return Observer;
  };
  return {
    Scatter,
    ScatterRotation,
    ScatterScale,
    ScatterDelay,
    ScatterOpacity,
    ApplyToElement,
    ApplyToSelector,
    ObserveAndApply,
    LayoutNoise
  };
})();

export { Attention as default };
