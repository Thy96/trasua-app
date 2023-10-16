import React from "react";
import { Link } from "react-router-dom";

function Button({
    to,
    href,
    elementdiv,
    disabled = false,
    enabledButton = false,
    children,
    onClick,
    ...passProps
}) {
    let Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };

    if (!enabledButton) {
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith("on") && typeof props[key] === "function") {
                    delete props[key];
                }
            });
        }
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    } else if (elementdiv) {
        props.elementdiv = elementdiv;
        Comp = "div";
    }

    return <Comp {...props}>{children}</Comp>;
}

export default Button;