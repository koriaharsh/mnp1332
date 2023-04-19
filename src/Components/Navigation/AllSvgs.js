import A from "material-letter-icons/dist/svg/A.svg";
import B from "material-letter-icons/dist/svg/B.svg";
import C from "material-letter-icons/dist/svg/C.svg";
import D from "material-letter-icons/dist/svg/D.svg";
import E from "material-letter-icons/dist/svg/E.svg";
import F from "material-letter-icons/dist/svg/F.svg";
import G from "material-letter-icons/dist/svg/G.svg";
import H from "material-letter-icons/dist/svg/H.svg";
import I from "material-letter-icons/dist/svg/I.svg";
import J from "material-letter-icons/dist/svg/J.svg";
import K from "material-letter-icons/dist/svg/K.svg";
import L from "material-letter-icons/dist/svg/L.svg";
import M from "material-letter-icons/dist/svg/M.svg";
import N from "material-letter-icons/dist/svg/N.svg";
import O from "material-letter-icons/dist/svg/O.svg";
import P from "material-letter-icons/dist/svg/P.svg";
import Q from "material-letter-icons/dist/svg/Q.svg";
import R from "material-letter-icons/dist/svg/R.svg";
import S from "material-letter-icons/dist/svg/S.svg";
import T from "material-letter-icons/dist/svg/T.svg";
import U from "material-letter-icons/dist/svg/U.svg";
import V from "material-letter-icons/dist/svg/V.svg";
import W from "material-letter-icons/dist/svg/W.svg";
import X from "material-letter-icons/dist/svg/X.svg";
import Y from "material-letter-icons/dist/svg/Y.svg";
import Z from "material-letter-icons/dist/svg/Z.svg";

export const letterSVG = {
  A: A,
  B: B,
  C: C,
  D: D,
  E: E,
  F: F,
  G: G,
  H: H,
  I: I,
  J: J,
  K: K,
  L: L,
  M: M,
  N: N,
  O: O,
  P: P,
  Q: Q,
  R: R,
  S: S,
  T: T,
  U: U,
  V: V,
  W: W,
  X: X,
  Y: Y,
  Z: Z,
};

export const getSVG = (letter) => {
  //   console.log(eval("letterSVG.H"));
  return eval(`letterSVG.${letter}`);
};
