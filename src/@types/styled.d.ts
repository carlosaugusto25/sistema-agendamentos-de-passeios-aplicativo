import styled from "styled-components";
import theme from "../theme";

declare module "styled-components" {
    type ThemeThype = typeof theme;
    export interface DefaultTheme extends ThemeThype {}
}