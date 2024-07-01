import { useEffect, useRef } from "react";
import { ObjectUtils } from "../utils/diffUtils";

/**
 * Helps tracking the props changes made in a react functional component.
 *
 * Prints the name of the properties/states variables causing a render (or re-render).
 * For debugging purposes only.
 *
 * @usage You can simply track the props of the components like this:
 *  useRenderingTrace('MyComponent', props);
 *
 * @usage You can also track additional state like this:
 *  const [someState] = useState(null);
 *  useRenderingTrace('MyComponent', { ...props, someState });
 *
 * @param componentName Name of the component to display
 * @param propsAndStates
 * @param level
 *
 * @see https://stackoverflow.com/a/51082563/2391795
 */
const useRenderingTrace = (componentName: string, propsAndStates: any) => {
  if (window.location.hostname !== "localhost") return;

  const prev = useRef(propsAndStates);

  useEffect(() => {
    const diff = ObjectUtils.diff(prev.current, propsAndStates, true);
    console.debug(`[${componentName}] Diff:`, diff);
    prev.current = propsAndStates;
  });
};

export default useRenderingTrace;
