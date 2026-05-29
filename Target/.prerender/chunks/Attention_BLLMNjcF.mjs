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
  const ScatterOpacity = (Index, Min = 0.85, Max = 1) => {
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
  const Lerp = (Start, End, Factor) => Start + (End - Start) * Factor;
  const DefaultConfig = {
    LerpFactor: 0.08,
    ResetOpacity: 1,
    ResetScale: 1,
    ResetRotation: 0,
    HoverOpacity: 1,
    HoverScale: 1.02,
    HoverRotation: 0
  };
  const HoverStateMap = /* @__PURE__ */ new Map();
  let AnimationFrameId = 0;
  const InitHoverState = (Element, Config = {}) => {
    const FinalConfig = { ...DefaultConfig, ...Config };
    const ComputedStyle = window.getComputedStyle(Element);
    const OriginalTransform = ComputedStyle.transform || "none";
    const State = {
      Element,
      OriginalTransform,
      TargetOpacity: FinalConfig.ResetOpacity,
      CurrentOpacity: parseFloat(ComputedStyle.opacity) || 1,
      TargetScale: FinalConfig.ResetScale,
      CurrentScale: 1,
      TargetRotation: FinalConfig.ResetRotation,
      CurrentRotation: 0,
      IsHovered: false,
      IsFocused: false,
      FrameId: 0
    };
    HoverStateMap.set(Element, State);
    return State;
  };
  const AnimateHoverStates = () => {
    let HasActiveAnimations = false;
    HoverStateMap.forEach((State) => {
      if (State.IsHovered || State.IsFocused) {
        HasActiveAnimations = true;
        State.CurrentOpacity = Lerp(
          State.CurrentOpacity,
          State.TargetOpacity,
          DefaultConfig.LerpFactor
        );
        State.CurrentScale = Lerp(
          State.CurrentScale,
          State.TargetScale,
          DefaultConfig.LerpFactor
        );
        State.CurrentRotation = Lerp(
          State.CurrentRotation,
          State.TargetRotation,
          DefaultConfig.LerpFactor
        );
        const Transform = `scale(${State.CurrentScale.toFixed(4)}) rotate(${State.CurrentRotation.toFixed(2)}deg)`;
        State.Element.style.transform = Transform;
        State.Element.style.opacity = String(State.CurrentOpacity);
      }
    });
    if (HasActiveAnimations) {
      AnimationFrameId = requestAnimationFrame(AnimateHoverStates);
    }
  };
  const OnMouseEnter = (Event) => {
    const Element = Event.target;
    if (!Element) return;
    let State = HoverStateMap.get(Element);
    if (!State) {
      State = InitHoverState(Element);
    }
    State.IsHovered = true;
    State.TargetOpacity = DefaultConfig.HoverOpacity;
    State.TargetScale = DefaultConfig.HoverScale;
    State.TargetRotation = DefaultConfig.HoverRotation;
    Element.classList.add("StaccatoHover");
    if (!AnimationFrameId) {
      AnimationFrameId = requestAnimationFrame(AnimateHoverStates);
    }
  };
  const OnMouseLeave = (Event) => {
    const Element = Event.target;
    if (!Element) return;
    const State = HoverStateMap.get(Element);
    if (!State) return;
    State.IsHovered = false;
    State.TargetOpacity = DefaultConfig.ResetOpacity;
    State.TargetScale = DefaultConfig.ResetScale;
    State.TargetRotation = DefaultConfig.ResetRotation;
    Element.classList.remove("StaccatoHover");
  };
  const OnFocus = (Event) => {
    const Element = Event.target;
    if (!Element) return;
    let State = HoverStateMap.get(Element);
    if (!State) {
      State = InitHoverState(Element);
    }
    State.IsFocused = true;
    State.TargetOpacity = DefaultConfig.HoverOpacity;
    State.TargetScale = DefaultConfig.HoverScale;
    State.TargetRotation = DefaultConfig.HoverRotation;
    Element.classList.add("StaccatoFocus");
    if (!AnimationFrameId) {
      AnimationFrameId = requestAnimationFrame(AnimateHoverStates);
    }
  };
  const OnBlur = (Event) => {
    const Element = Event.target;
    if (!Element) return;
    const State = HoverStateMap.get(Element);
    if (!State) return;
    State.IsFocused = false;
    State.TargetOpacity = DefaultConfig.ResetOpacity;
    State.TargetScale = DefaultConfig.ResetScale;
    State.TargetRotation = DefaultConfig.ResetRotation;
    Element.classList.remove("StaccatoFocus");
  };
  const ApplyHoverEffects = (Selector, Config = {}) => {
    const ElementList = document.querySelectorAll(Selector);
    ElementList.forEach((Element) => {
      InitHoverState(Element, Config);
      Element.StaccatoHoverConfig = {
        ...DefaultConfig,
        ...Config
      };
      Element.addEventListener("mouseenter", OnMouseEnter);
      Element.addEventListener("mouseleave", OnMouseLeave);
      Element.addEventListener("focus", OnFocus, true);
      Element.addEventListener("blur", OnBlur, true);
      if (Element.getAttribute("tabindex") === null) {
        Element.setAttribute("tabindex", "0");
      }
    });
  };
  const RemoveHoverEffects = (Selector) => {
    const ElementList = document.querySelectorAll(Selector);
    ElementList.forEach((Element) => {
      Element.removeEventListener("mouseenter", OnMouseEnter);
      Element.removeEventListener("mouseleave", OnMouseLeave);
      Element.removeEventListener("focus", OnFocus, true);
      Element.removeEventListener("blur", OnBlur, true);
      HoverStateMap.delete(Element);
      Element.classList.remove("StaccatoHover", "StaccatoFocus");
    });
  };
  const OrderOnHover = (Selector, ZIndexBase = 10) => {
    const ElementList = document.querySelectorAll(Selector);
    ElementList.forEach((Element, Index) => {
      Element.style.setProperty("--StaccatoOrderIndex", String(Index));
      Element.addEventListener("mouseenter", () => {
        Element.style.zIndex = String(ZIndexBase + ElementList.length);
        Element.style.setProperty("--StaccatoIsOrdered", "1");
      });
      Element.addEventListener("mouseleave", () => {
        setTimeout(() => {
          Element.style.zIndex = String(ZIndexBase);
          Element.style.setProperty("--StaccatoIsOrdered", "0");
        }, 300);
      });
    });
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
    ApplyHoverEffects,
    RemoveHoverEffects,
    OrderOnHover,
    Lerp,
    LayoutNoise
  };
})();

export { Attention as default };
